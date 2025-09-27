import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, catchError, switchMap, startWith } from 'rxjs/operators';
import { Notice } from '../models/notice.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private noticesSubject = new BehaviorSubject<Notice[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public notices$ = this.noticesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    // Iniciar busca automática a cada 5 minutos
    this.startAutoRefresh();
  }

  private startAutoRefresh(): void {
    timer(0, 5 * 60 * 1000) // 0ms inicial, depois a cada 5 minutos
      .pipe(
        switchMap(() => this.fetchNotices())
      )
      .subscribe();
  }

  fetchNotices(): Observable<Notice[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<any>('/rest/api/cnsesi/v1/mensagens', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:123456')
      }
    }).pipe(
      map(data => {
        const mappedNotices = data.items.map((item: any) => ({
          id: `${item.Z0_FILIAL}-${item.Z0_ASSUNTO}-${Date.now()}`,
          filial: item.Z0_FILIAL,
          tipo: item.Z0_TIPO,
          dataInicio: item.Z0_DTINI,
          dataFim: item.Z0_DTFIM,
          recorrencia: item.Z0_RECOR,
          assunto: item.Z0_ASSUNTO,
          titulo: item.Z0_TITULO,
          mensagem: item.Z0_MSG,
          tituloLink: item.Z0_TITLINK || undefined,
          link: item.Z0_LINK || undefined,
          tituloLink2: item.Z0_TILINK2 || undefined,
          link2: item.Z0_LINK2 || undefined,
          tituloLink3: item.Z0_TILINK3 || undefined,
          link3: item.Z0_LINK3 || undefined,
          // Campos derivados para compatibilidade
          title: item.Z0_TITULO,
          content: item.Z0_MSG,
          priority: item.Z0_TIPO === 'P' ? 'Prioridade' : item.Z0_TIPO === 'A' ? 'Aviso' : 'Lembrete',
          category: item.Z0_ASSUNTO,
          date: item.Z0_DTINI,
          author: 'SESI',
        }));

        this.noticesSubject.next(mappedNotices);
        this.loadingSubject.next(false);
        return mappedNotices;
      }),
      catchError(error => {
        this.errorSubject.next('Erro ao carregar avisos da API. Verifique a conexão.');
        this.loadingSubject.next(false);
        console.error('Erro ao buscar avisos:', error);
        return [];
      })
    );
  }

  refetch(): void {
    this.fetchNotices().subscribe();
  }
}
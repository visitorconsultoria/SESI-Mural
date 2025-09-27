import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, RefreshCw, Search, Filter, Megaphone, Loader2 } from 'lucide-angular';
import { NoticeService } from '../../services/notice.service';
import { NoticeCardComponent } from '../notice-card/notice-card.component';
import { Notice } from '../../models/notice.model';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-notice-board',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, NoticeCardComponent],
  template: `
    <div class="bg-gradient-to-br from-card to-card/50 shadow-lg border-0 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6">
        <div class="flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-xl text-2xl font-semibold leading-none tracking-tight">
            <lucide-icon [img]="MegaphoneIcon" class="w-6 h-6 text-primary"></lucide-icon>
            Avisos e Comunicados
            <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 ml-2">
              {{ (filteredNotices$ | async)?.length || 0 }}
            </span>
          </h3>
          <button 
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            (click)="handleRefresh()"
            [disabled]="loading$ | async"
          >
            <lucide-icon 
              [img]="(loading$ | async) ? Loader2Icon : RefreshCwIcon" 
              class="w-4 h-4 mr-2"
              [ngClass]="{'animate-spin': loading$ | async}"
            ></lucide-icon>
            Atualizar
          </button>
        </div>

        <!-- Filtros -->
        <div class="flex flex-col sm:flex-row gap-4 mt-4">
          <div class="relative flex-1">
            <lucide-icon [img]="SearchIcon" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"></lucide-icon>
            <input
              type="text"
              placeholder="Buscar avisos..."
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10"
            />
          </div>
          
          <div class="flex gap-2">
            <div class="relative">
              <select 
                [(ngModel)]="filterPriority"
                (ngModelChange)="onFilterChange()"
                class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[130px] appearance-none"
              >
                <option value="all">Todas</option>
                <option value="Prioridade">Prioridade</option>
                <option value="Aviso">Aviso</option>
                <option value="Lembrete">Lembrete</option>
              </select>
              <lucide-icon [img]="FilterIcon" class="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 mr-2 pointer-events-none"></lucide-icon>
            </div>

            <div class="relative">
              <select 
                [(ngModel)]="filterCategory"
                (ngModelChange)="onFilterChange()"
                class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[130px] appearance-none"
              >
                <option value="all">Todas</option>
                <option *ngFor="let category of categories$ | async" [value]="category">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 pt-0">
        <div *ngIf="(loading$ | async) && (notices$ | async)?.length === 0" class="flex items-center justify-center py-12">
          <lucide-icon [img]="Loader2Icon" class="w-8 h-8 animate-spin text-primary mr-2"></lucide-icon>
          <span>Carregando avisos...</span>
        </div>
        
        <div *ngIf="(error$ | async) && !(loading$ | async)" class="bg-destructive/10 border-destructive/20 rounded-lg border p-6 text-center">
          <p class="text-destructive">{{ error$ | async }}</p>
          <button 
            (click)="handleRefresh()" 
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mx-auto mt-4"
          >
            Tentar Novamente
          </button>
        </div>
        
        <div *ngIf="(filteredNotices$ | async)?.length === 0 && !(loading$ | async) && !(error$ | async)" class="text-center py-12 text-muted-foreground">
          <lucide-icon [img]="MegaphoneIcon" class="w-12 h-12 mx-auto mb-4 opacity-50"></lucide-icon>
          <p>Nenhum aviso encontrado</p>
        </div>
        
        <div *ngIf="(filteredNotices$ | async)?.length! > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <app-notice-card 
            *ngFor="let notice of filteredNotices$ | async; trackBy: trackByNoticeId" 
            [notice]="notice"
          ></app-notice-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary: 220 74% 33%;
      --secondary: 142 65% 45%;
      --secondary-foreground: 0 0% 100%;
      --muted-foreground: 215 20% 60%;
      --border: 215 20% 88%;
      --input: 215 20% 94%;
      --card: 0 0% 100%;
      --background: 0 0% 98%;
      --accent: 215 35% 85%;
      --destructive: 0 75% 55%;
    }

    .bg-primary { background-color: hsl(var(--primary)); }
    .text-primary { color: hsl(var(--primary)); }
    .bg-secondary { background-color: hsl(var(--secondary)); }
    .text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
    .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .border-input { border-color: hsl(var(--input)); }
    .bg-background { background-color: hsl(var(--background)); }
    .bg-accent { background-color: hsl(var(--accent)); }
    .text-destructive { color: hsl(var(--destructive)); }
    .bg-destructive\/10 { background-color: hsl(var(--destructive) / 0.1); }
    .border-destructive\/20 { border-color: hsl(var(--destructive) / 0.2); }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class NoticeBoardComponent implements OnInit {
  searchTerm = '';
  filterPriority = 'all';
  filterCategory = 'all';

  notices$ = this.noticeService.notices$;
  loading$ = this.noticeService.loading$;
  error$ = this.noticeService.error$;

  categories$: Observable<string[]> = this.notices$.pipe(
    map(notices => [...new Set(notices.map(notice => notice.category))])
  );

  filteredNotices$: Observable<Notice[]> = combineLatest([
    this.notices$,
    this.getSearchTerm(),
    this.getFilterPriority(),
    this.getFilterCategory()
  ]).pipe(
    map(([notices, searchTerm, filterPriority, filterCategory]) => {
      return notices.filter(notice => {
        const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             notice.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
        const matchesCategory = filterCategory === 'all' || notice.category === filterCategory;
        
        return matchesSearch && matchesPriority && matchesCategory;
      });
    })
  );

  readonly RefreshCwIcon = RefreshCw;
  readonly Loader2Icon = Loader2;
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly MegaphoneIcon = Megaphone;

  private searchTermSubject = new BehaviorSubject<string>('');
  private filterPrioritySubject = new BehaviorSubject<string>('all');
  private filterCategorySubject = new BehaviorSubject<string>('all');

  constructor(private noticeService: NoticeService) {}

  ngOnInit(): void {}

  private getSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  private getFilterPriority(): Observable<string> {
    return this.filterPrioritySubject.asObservable();
  }

  private getFilterCategory(): Observable<string> {
    return this.filterCategorySubject.asObservable();
  }

  onSearchChange(): void {
    this.searchTermSubject.next(this.searchTerm);
  }

  onFilterChange(): void {
    this.filterPrioritySubject.next(this.filterPriority);
    this.filterCategorySubject.next(this.filterCategory);
  }

  handleRefresh(): void {
    this.noticeService.refetch();
  }

  trackByNoticeId(index: number, notice: Notice): string {
    return notice.id;
  }
}

// Importar BehaviorSubject
import { BehaviorSubject } from 'rxjs';
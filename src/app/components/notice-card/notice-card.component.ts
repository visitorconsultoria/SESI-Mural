import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Clock, AlertCircle, Info, User, Calendar, FileText, Eye } from 'lucide-angular';
import { Notice } from '../../models/notice.model';

@Component({
  selector: 'app-notice-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div 
      class="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] bg-gradient-to-br from-card to-card/50 border-l-4 rounded-lg border shadow-sm"
      [ngClass]="priorityConfig.color"
      (click)="openModal()"
    >
      <div class="flex flex-col space-y-1.5 p-6 pb-3">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-2 flex-1">
            <lucide-icon [img]="priorityConfig.icon" class="w-5 h-5 mt-0.5 flex-shrink-0"></lucide-icon>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-base leading-tight line-clamp-2">
                {{ notice.title }}
              </h3>
            </div>
          </div>
          <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                [ngClass]="priorityConfig.badge">
            {{ notice.priority.toUpperCase() }}
          </span>
        </div>
      </div>

      <div class="p-6 pt-0">
        <p class="text-muted-foreground text-sm line-clamp-3 mb-4">
          {{ notice.content }}
        </p>
        
        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <div class="flex items-center gap-4">
            <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80">
              {{ notice.category }}
            </span>
            <span *ngIf="notice.author">Por: {{ notice.author }}</span>
          </div>
          <div class="flex items-center gap-1">
            <lucide-icon [img]="ClockIcon" class="w-3 h-3"></lucide-icon>
            <span>{{ formatDate(notice.date) }}</span>
          </div>
        </div>
        
        <div class="mt-3 pt-2 border-t border-border/50">
          <p class="text-xs text-muted-foreground italic">
            Clique para ver detalhes completos
          </p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div *ngIf="isModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" (click)="closeModal()">
      <div class="bg-background border rounded-lg shadow-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto" (click)="$event.stopPropagation()">
        <div class="flex flex-col space-y-1.5 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold"
                    [ngClass]="priorityConfig.badge">
                {{ notice.priority.toUpperCase() }}
              </span>
            </div>
            <button (click)="closeModal()" class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <h2 class="text-2xl font-bold text-left leading-tight pr-8">
            {{ notice.title }}
          </h2>
          
          <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-3">
            <div class="flex items-center gap-2">
              <lucide-icon [img]="UserIcon" class="w-4 h-4"></lucide-icon>
              <span class="font-medium">{{ notice.author }}</span>
            </div>
            <div class="flex items-center gap-2">
              <lucide-icon [img]="CalendarIcon" class="w-4 h-4"></lucide-icon>
              <span class="capitalize">Data de Publicação: {{ formatFullDate(notice.date) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {{ notice.category }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="p-6 pt-0">
          <div class="mt-6 space-y-6">
            <div class="bg-muted/30 rounded-lg p-6 border">
              <div class="flex items-center gap-2 mb-4">
                <lucide-icon [img]="FileTextIcon" class="w-5 h-5 text-primary"></lucide-icon>
                <h3 class="font-semibold text-lg">Conteúdo do Aviso</h3>
              </div>
              <div class="prose prose-sm max-w-none">
                <p class="text-foreground leading-relaxed whitespace-pre-wrap text-base">
                  {{ notice.content }}
                </p>
              </div>
            </div>

            <!-- Links relacionados -->
            <div *ngIf="hasLinks()" class="bg-secondary/30 rounded-lg p-6 border">
              <div class="flex items-center gap-2 mb-4">
                <lucide-icon [img]="EyeIcon" class="w-5 h-5 text-primary"></lucide-icon>
                <h3 class="font-semibold text-lg">Links Relacionados</h3>
              </div>
              <div class="space-y-3">
                <a *ngIf="notice.tituloLink && notice.link"
                   [href]="getFullUrl(notice.link)"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center gap-2 p-3 bg-card rounded-lg border hover:bg-accent transition-colors">
                  <lucide-icon [img]="EyeIcon" class="w-4 h-4 text-primary"></lucide-icon>
                  <span class="font-medium">{{ notice.tituloLink }}</span>
                </a>
                <a *ngIf="notice.tituloLink2 && notice.link2"
                   [href]="getFullUrl(notice.link2)"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center gap-2 p-3 bg-card rounded-lg border hover:bg-accent transition-colors">
                  <lucide-icon [img]="EyeIcon" class="w-4 h-4 text-primary"></lucide-icon>
                  <span class="font-medium">{{ notice.tituloLink2 }}</span>
                </a>
                <a *ngIf="notice.tituloLink3 && notice.link3"
                   [href]="getFullUrl(notice.link3)"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center gap-2 p-3 bg-card rounded-lg border hover:bg-accent transition-colors">
                  <lucide-icon [img]="EyeIcon" class="w-4 h-4 text-primary"></lucide-icon>
                  <span class="font-medium">{{ notice.tituloLink3 }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    :host {
      --primary: 220 74% 33%;
      --secondary: 142 65% 45%;
      --secondary-foreground: 0 0% 100%;
      --muted-foreground: 215 20% 60%;
      --border: 215 20% 88%;
      --card: 0 0% 100%;
      --background: 0 0% 98%;
      --foreground: 215 25% 15%;
      --muted: 215 15% 95%;
      --accent: 215 35% 85%;
    }

    .bg-primary { background-color: hsl(var(--primary)); }
    .text-primary { color: hsl(var(--primary)); }
    .bg-secondary { background-color: hsl(var(--secondary)); }
    .text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
    .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .border-border { border-color: hsl(var(--border)); }
    .bg-card { background-color: hsl(var(--card)); }
    .bg-background { background-color: hsl(var(--background)); }
    .text-foreground { color: hsl(var(--foreground)); }
    .bg-muted { background-color: hsl(var(--muted)); }
    .bg-accent { background-color: hsl(var(--accent)); }
    .bg-red-500\\/10 { background-color: hsl(0 84% 60% \/ 0.1); }
    .text-red-700 { color: hsl(0 74% 42%); }
    .border-red-200 { border-color: hsl(0 75% 88%); }
    .bg-red-500\\/15 { background-color: hsl(0 84% 60% \/ 0.15); }
    .hover\\:bg-red-500\\/25:hover { background-color: hsl(0 84% 60% \/ 0.25); }
    .bg-amber-500\\/10 { background-color: hsl(45 93% 47% \/ 0.1); }
    .text-amber-700 { color: hsl(36 77% 49%); }
    .border-amber-200 { border-color: hsl(48 96% 89%); }
    .bg-amber-500\\/15 { background-color: hsl(45 93% 47% \/ 0.15); }
    .hover\\:bg-amber-500\\/25:hover { background-color: hsl(45 93% 47% \/ 0.25); }
    .bg-blue-500\\/10 { background-color: hsl(217 91% 60% \/ 0.1); }
    .text-blue-700 { color: hsl(212 84% 49%); }
    .border-blue-200 { border-color: hsl(214 95% 93%); }
    .bg-blue-500\\/15 { background-color: hsl(217 91% 60% \/ 0.15); }
    .hover\\:bg-blue-500\\/25:hover { background-color: hsl(217 91% 60% \/ 0.25); }
  `]
})
export class NoticeCardComponent {
  @Input() notice!: Notice;
  
  isModalOpen = false;
  
  readonly ClockIcon = Clock;
  readonly UserIcon = User;
  readonly CalendarIcon = Calendar;
  readonly FileTextIcon = FileText;
  readonly EyeIcon = Eye;

  get priorityConfig() {
    const configs = {
      'Prioridade': {
        icon: AlertCircle,
        color: "bg-red-500/10 text-red-700 border-red-200",
        badge: "bg-red-500/15 text-red-700 hover:bg-red-500/25",
      },
      'Aviso': {
        icon: Info,
        color: "bg-amber-500/10 text-amber-700 border-amber-200",
        badge: "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25",
      },
      'Lembrete': {
        icon: Info,
        color: "bg-blue-500/10 text-blue-700 border-blue-200",
        badge: "bg-blue-500/15 text-blue-700 hover:bg-blue-500/25",
      },
    };
    
    return configs[this.notice.priority as keyof typeof configs] || configs['Aviso'];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatFullDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  hasLinks(): boolean {
    return !!(this.notice.tituloLink || this.notice.tituloLink2 || this.notice.tituloLink3);
  }

  getFullUrl(url: string): string {
    return url.startsWith('http') ? url : `https://${url}`;
  }
}
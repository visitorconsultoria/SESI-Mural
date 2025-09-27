import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ExternalLink, Users, BookOpen } from 'lucide-angular';

interface QuickAccessLink {
  title: string;
  description: string;
  url: string;
  icon: any;
  color: string;
}

@Component({
  selector: 'app-quick-access',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-gradient-to-br from-card via-card/95 to-primary/5 shadow-xl border border-primary/10 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6 pb-4">
        <h3 class="flex items-center gap-3 text-xl font-bold text-primary text-2xl font-semibold leading-none tracking-tight">
          <div class="p-2 bg-primary/10 rounded-lg">
            <lucide-icon [img]="ExternalLinkIcon" class="w-5 h-5 text-primary"></lucide-icon>
          </div>
          Acessos Rápidos
        </h3>
        <p class="text-muted-foreground text-sm">
          Acesse rapidamente os principais sistemas e portais
        </p>
      </div>
      <div class="p-6 pt-2">
        <div class="grid grid-cols-1 gap-3">
          <button
            *ngFor="let link of quickAccessLinks"
            class="h-auto p-4 flex items-center gap-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 group relative overflow-hidden inline-flex justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            [ngClass]="link.color"
            (click)="handleLinkClick(link.url)"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="flex items-center gap-4 relative z-10 w-full">
              <div class="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                <lucide-icon [img]="link.icon" class="w-5 h-5"></lucide-icon>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-bold text-base mb-1 group-hover:translate-x-1 transition-transform duration-300">
                  {{ link.title }}
                </div>
                <div class="text-sm opacity-90 leading-tight group-hover:opacity-100 transition-opacity duration-300">
                  {{ link.description }}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary: 220 74% 33%;
      --card: 0 0% 100%;
      --muted-foreground: 215 20% 60%;
      --background: 0 0% 98%;
      --accent: 215 35% 85%;
    }

    .bg-primary { background-color: hsl(var(--primary)); }
    .text-primary { color: hsl(var(--primary)); }
    .bg-primary\/10 { background-color: hsl(var(--primary) / 0.1); }
    .border-primary\/10 { border-color: hsl(var(--primary) / 0.1); }
    .bg-card { background-color: hsl(var(--card)); }
    .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .bg-background { background-color: hsl(var(--background)); }
    .bg-accent { background-color: hsl(var(--accent)); }
  `]
})
export class QuickAccessComponent {
  readonly ExternalLinkIcon = ExternalLink;

  quickAccessLinks: QuickAccessLink[] = [
    {
      title: "Meu RH",
      description: "Portal de Recursos Humanos",
      url: "http://portal_rh.sesi.cn:9000",
      icon: Users,
      color: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    {
      title: "Base de Conhecimento",
      description: "Documentação e Tutoriais",
      url: "https://visitorconsultoria.tomticket.com/kb/",
      icon: BookOpen,
      color: "bg-accent text-accent-foreground hover:bg-accent/90",
    },
  ];

  handleLinkClick(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
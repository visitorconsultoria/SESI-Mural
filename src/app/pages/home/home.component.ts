import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { NoticeBoardComponent } from '../../components/notice-board/notice-board.component';
import { QuickAccessComponent } from '../../components/quick-access/quick-access.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NoticeBoardComponent, QuickAccessComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <app-header></app-header>
      
      <main class="container mx-auto px-6 py-8">
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <!-- Mural de Avisos - Ocupa 3 colunas -->
          <div class="xl:col-span-3">
            <app-notice-board></app-notice-board>
          </div>
          
          <!-- Acessos Rápidos - Ocupa 1 coluna -->
          <div class="xl:col-span-1">
            <app-quick-access></app-quick-access>
          </div>
        </div>
      </main>
      
      <footer class="bg-primary/5 border-t py-6 mt-12">
        <div class="container mx-auto px-6 text-center text-muted-foreground">
          <p class="text-sm">
            © 2024 Conselho Nacional SESI - Mural de Avisos Corporativo
          </p>
          <p class="text-xs mt-1">
            Sistema integrado com ERP Protheus
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      --background: 0 0% 98%;
      --primary: 220 74% 33%;
      --muted: 215 15% 95%;
      --muted-foreground: 215 20% 60%;
      --border: 215 20% 88%;
    }

    .bg-background { background-color: hsl(var(--background)); }
    .bg-primary\/5 { background-color: hsl(var(--primary) / 0.05); }
    .via-muted\/30 { --tw-gradient-via: hsl(var(--muted) / 0.3); }
    .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .border-t { border-top: 1px solid hsl(var(--border)); }
  `]
})
export class HomeComponent {}
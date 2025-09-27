import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Home, AlertTriangle } from 'lucide-angular';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
      <div class="text-center max-w-md mx-auto p-8">
        <div class="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <lucide-icon [img]="AlertTriangleIcon" class="w-12 h-12 text-primary"></lucide-icon>
        </div>
        <h1 class="mb-4 text-4xl font-bold text-primary">404</h1>
        <p class="mb-6 text-xl text-muted-foreground">
          Página não encontrada
        </p>
        <p class="mb-8 text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <a 
          routerLink="/" 
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <lucide-icon [img]="HomeIcon" class="w-4 h-4"></lucide-icon>
          Voltar ao Mural
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --background: 0 0% 98%;
      --primary: 220 74% 33%;
      --primary-foreground: 0 0% 100%;
      --muted: 215 15% 95%;
      --muted-foreground: 215 20% 60%;
    }

    .bg-background { background-color: hsl(var(--background)); }
    .bg-primary { background-color: hsl(var(--primary)); }
    .text-primary { color: hsl(var(--primary)); }
    .text-primary-foreground { color: hsl(var(--primary-foreground)); }
    .bg-primary\/10 { background-color: hsl(var(--primary) / 0.1); }
    .via-muted\/30 { --tw-gradient-via: hsl(var(--muted) / 0.3); }
    .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .hover\\:bg-primary\\/90:hover { background-color: hsl(var(--primary) / 0.9); }
  `]
})
export class NotFoundComponent {
  readonly HomeIcon = Home;
  readonly AlertTriangleIcon = AlertTriangle;
}
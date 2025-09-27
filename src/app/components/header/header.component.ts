import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Clock, Calendar } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-lg">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <img 
                src="assets/logo-sesi.png" 
                alt="SESI - Conselho Nacional" 
                class="h-10 w-auto"
              />
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-wide">
                Mural de Avisos
              </h1>
              <p class="text-primary-foreground/80 text-sm">
                Conselho Nacional SESI
              </p>
            </div>
          </div>

          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <lucide-icon [img]="ClockIcon" class="w-5 h-5"></lucide-icon>
              <span class="text-lg font-mono font-semibold">
                {{ currentTime | date:'HH:mm:ss' }}
              </span>
            </div>
            <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <lucide-icon [img]="CalendarIcon" class="w-5 h-5"></lucide-icon>
              <span class="text-sm font-medium capitalize">
                {{ currentTime | date:'EEEE, dd \'de\' MMMM \'de\' yyyy':'pt-BR' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host {
      --primary: 220 74% 33%;
      --primary-foreground: 0 0% 100%;
    }
    
    .bg-primary {
      background-color: hsl(var(--primary));
    }
    
    .text-primary-foreground {
      color: hsl(var(--primary-foreground));
    }
    
    .text-primary-foreground\/80 {
      color: hsl(var(--primary-foreground) / 0.8);
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime = new Date();
  private timeInterval: any;
  
  readonly ClockIcon = Clock;
  readonly CalendarIcon = Calendar;

  ngOnInit(): void {
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}
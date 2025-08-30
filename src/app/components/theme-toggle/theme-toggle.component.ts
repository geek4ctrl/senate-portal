import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="theme-toggle-btn"
      [class.dark]="currentTheme === 'dark'"
      (click)="toggleTheme()"
      [title]="currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
    >
      <div class="theme-icon-container">
        <i class="theme-icon sun-icon" [class.active]="currentTheme === 'light'">☀️</i>
        <i class="theme-icon moon-icon" [class.active]="currentTheme === 'dark'">🌙</i>
      </div>
      <span class="theme-text">{{ currentTheme === 'dark' ? 'Dark' : 'Light' }}</span>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--theme-button-secondary);
      border: 1px solid var(--theme-border-color);
      border-radius: 12px;
      padding: 10px 18px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--theme-secondary-text);
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      min-height: 44px;
    }
    
    .theme-toggle-btn:hover {
      background: var(--theme-button-primary);
      border-color: var(--theme-button-primary);
      color: var(--theme-secondary-bg);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    }
    
    .theme-toggle-btn:hover .theme-icon {
      transform: scale(1.1) rotate(0deg);
    }
    
    .theme-toggle-btn:hover .theme-icon.active {
      transform: scale(1.15) rotate(0deg);
    }
    
    .theme-icon-container {
      position: relative;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .theme-icon {
      position: absolute;
      font-size: 16px;
      transition: all 0.4s ease;
      opacity: 0;
      transform: scale(0.5) rotate(-90deg);
    }
    
    .theme-icon.active {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
    
    .theme-text {
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-size: 13px;
      line-height: 1;
    }
    
    @media (max-width: 768px) {
      .theme-toggle-btn {
        gap: 10px;
        padding: 8px 14px;
        font-size: 13px;
        min-height: 40px;
      }
      
      .theme-text {
        font-size: 12px;
      }
      
      .theme-icon-container {
        width: 18px;
        height: 18px;
      }
      
      .theme-icon {
        font-size: 15px;
      }
    }
    
    @media (max-width: 480px) {
      .theme-text { 
        display: none; 
      }
      
      .theme-toggle-btn { 
        width: 44px; 
        height: 44px; 
        padding: 12px; 
        border-radius: 50%; 
        gap: 0;
        min-height: auto;
      }
      
      .theme-icon-container {
        width: 20px;
        height: 20px;
      }
      
      .theme-icon {
        font-size: 18px;
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  private destroy$ = new Subject<void>();
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit(): void {
    this.themeService.getCurrentTheme$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  // Background colors
  primaryBg: string;
  secondaryBg: string;
  cardBg: string;
  modalBg: string;
  overlayBg: string;
  
  // Text colors
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  
  // Border and separator colors
  borderColor: string;
  separatorColor: string;
  
  // Interactive elements
  buttonPrimary: string;
  buttonSecondary: string;
  buttonHover: string;
  linkColor: string;
  
  // Status colors
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
  
  // Map specific colors
  mapBg: string;
  legendBg: string;
  
  // Navigation colors
  navBg: string;
  navText: string;
  navHover: string;
  
  // News section colors
  newsBg: string;
  newsCardBg: string;
  
  // Sidebar colors
  sidebarBg: string;
  sidebarText: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<Theme>('light');
  public currentTheme$ = this.currentThemeSubject.asObservable();
  
  private readonly THEME_STORAGE_KEY = 'senate-portal-theme';
  
  private lightTheme: ThemeColors = {
    // Background colors
    primaryBg: '#f8f9fa',
    secondaryBg: '#ffffff',
    cardBg: '#ffffff',
    modalBg: '#ffffff',
    overlayBg: 'rgba(0, 0, 0, 0.75)',
    
    // Text colors
    primaryText: '#2d3748',
    secondaryText: '#4a5568',
    mutedText: '#6c757d',
    
    // Border and separator colors
    borderColor: '#e2e8f0',
    separatorColor: '#e9ecef',
    
    // Interactive elements
    buttonPrimary: '#667eea',
    buttonSecondary: '#f7fafc',
    buttonHover: '#764ba2',
    linkColor: '#3182ce',
    
    // Status colors
    successColor: '#38a169',
    warningColor: '#d69e2e',
    errorColor: '#e53e3e',
    infoColor: '#3182ce',
    
    // Map specific colors
    mapBg: '#f8f9fa',
    legendBg: '#ffffff',
    
    // Navigation colors
    navBg: '#ffffff',
    navText: '#495057',
    navHover: '#667eea',
    
    // News section colors
    newsBg: '#f8f9fa',
    newsCardBg: '#ffffff',
    
    // Sidebar colors
    sidebarBg: '#ffffff',
    sidebarText: '#495057'
  };
  
  private darkTheme: ThemeColors = {
    // Background colors
    primaryBg: '#1a202c',
    secondaryBg: '#2d3748',
    cardBg: '#2d3748',
    modalBg: '#2d3748',
    overlayBg: 'rgba(0, 0, 0, 0.85)',
    
    // Text colors
    primaryText: '#f7fafc',
    secondaryText: '#e2e8f0',
    mutedText: '#a0aec0',
    
    // Border and separator colors
    borderColor: '#4a5568',
    separatorColor: '#4a5568',
    
    // Interactive elements
    buttonPrimary: '#667eea',
    buttonSecondary: '#4a5568',
    buttonHover: '#764ba2',
    linkColor: '#90cdf4',
    
    // Status colors
    successColor: '#68d391',
    warningColor: '#f6e05e',
    errorColor: '#fc8181',
    infoColor: '#90cdf4',
    
    // Map specific colors
    mapBg: '#1a202c',
    legendBg: '#2d3748',
    
    // Navigation colors
    navBg: '#2d3748',
    navText: '#e2e8f0',
    navHover: '#667eea',
    
    // News section colors
    newsBg: '#1a202c',
    newsCardBg: '#2d3748',
    
    // Sidebar colors
    sidebarBg: '#2d3748',
    sidebarText: '#e2e8f0'
  };
  
  constructor() {
    this.initializeTheme();
  }
  
  private initializeTheme(): void {
    // Load theme from localStorage or default to light theme
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.setTheme(savedTheme);
    } else {
      // Always default to light theme instead of system preference
      this.setTheme('light');
    }
    
    // Listen for system theme changes (but only apply if no saved preference)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.THEME_STORAGE_KEY)) {
        // Still default to light even when system changes, unless user has set a preference
        this.setTheme('light');
      }
    });
  }
  
  setTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }
  
  toggleTheme(): void {
    const currentTheme = this.currentThemeSubject.value;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }
  
  getCurrentTheme$(): Observable<Theme> {
    return this.currentTheme$;
  }
  
  getThemeColors(theme?: Theme): ThemeColors {
    const targetTheme = theme || this.getCurrentTheme();
    return targetTheme === 'dark' ? this.darkTheme : this.lightTheme;
  }
  
  private applyTheme(theme: Theme): void {
    const colors = this.getThemeColors(theme);
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--theme-primary-bg', colors.primaryBg);
    root.style.setProperty('--theme-secondary-bg', colors.secondaryBg);
    root.style.setProperty('--theme-card-bg', colors.cardBg);
    root.style.setProperty('--theme-modal-bg', colors.modalBg);
    root.style.setProperty('--theme-overlay-bg', colors.overlayBg);
    
    root.style.setProperty('--theme-primary-text', colors.primaryText);
    root.style.setProperty('--theme-secondary-text', colors.secondaryText);
    root.style.setProperty('--theme-muted-text', colors.mutedText);
    
    root.style.setProperty('--theme-border-color', colors.borderColor);
    root.style.setProperty('--theme-separator-color', colors.separatorColor);
    
    root.style.setProperty('--theme-button-primary', colors.buttonPrimary);
    root.style.setProperty('--theme-button-secondary', colors.buttonSecondary);
    root.style.setProperty('--theme-button-hover', colors.buttonHover);
    root.style.setProperty('--theme-link-color', colors.linkColor);
    
    root.style.setProperty('--theme-success-color', colors.successColor);
    root.style.setProperty('--theme-warning-color', colors.warningColor);
    root.style.setProperty('--theme-error-color', colors.errorColor);
    root.style.setProperty('--theme-info-color', colors.infoColor);
    
    root.style.setProperty('--theme-map-bg', colors.mapBg);
    root.style.setProperty('--theme-legend-bg', colors.legendBg);
    
    root.style.setProperty('--theme-nav-bg', colors.navBg);
    root.style.setProperty('--theme-nav-text', colors.navText);
    root.style.setProperty('--theme-nav-hover', colors.navHover);
    
    root.style.setProperty('--theme-news-bg', colors.newsBg);
    root.style.setProperty('--theme-news-card-bg', colors.newsCardBg);
    
    root.style.setProperty('--theme-sidebar-bg', colors.sidebarBg);
    root.style.setProperty('--theme-sidebar-text', colors.sidebarText);
    
    // Apply theme class to body
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }
  
  isDarkMode(): boolean {
    return this.getCurrentTheme() === 'dark';
  }
  
  isLightMode(): boolean {
    return this.getCurrentTheme() === 'light';
  }
}
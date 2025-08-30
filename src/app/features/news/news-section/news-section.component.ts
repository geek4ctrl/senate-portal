import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// Services
import { NewsService, NewsArticle, NewsResponse } from '../../../services/news.service';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit, OnDestroy {
  
  // News data
  articles: NewsArticle[] = [];
  filteredArticles: NewsArticle[] = [];
  selectedCategory = 'all';
  categories = this.newsService.getCategories();
  
  // Loading and error states
  isLoading = false;
  error: string | null = null;
  
  // Search functionality
  searchQuery = '';
  
  // Selected article for modal view
  selectedArticle: NewsArticle | null = null;
  showModal = false;
  
  // Subscriptions
  private subscriptions: Subscription[] = [];
  
  constructor(
    private newsService: NewsService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadNews();
    this.enableScrolling();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.disableScrolling();
  }

  /**
   * Enable proper scrolling behavior for the news section
   */
  private enableScrolling(): void {
    // Ensure body can scroll when news section is active
    document.body.style.overflowY = 'auto';
    (document.body.style as any).webkitOverflowScrolling = 'touch';
  }

  /**
   * Clean up scrolling behavior when component is destroyed
   */
  private disableScrolling(): void {
    // Reset body overflow when component is destroyed
    document.body.style.overflowY = '';
    (document.body.style as any).webkitOverflowScrolling = '';
  }

  /**
   * Load news articles from the service
   */
  loadNews(): void {
    this.isLoading = true;
    this.error = null;

    const newsSubscription = this.newsService.getLatestNews(this.selectedCategory, 20)
      .subscribe({
        next: (response: NewsResponse) => {
          this.articles = response.articles;
          this.applyFilters();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading news:', error);
          this.error = this.translate('news.error');
          this.isLoading = false;
        }
      });

    this.subscriptions.push(newsSubscription);
  }

  /**
   * Handle category filter change
   */
  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadNews();
  }

  /**
   * Handle search input
   */
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      
      const searchSubscription = this.newsService.searchNews(this.searchQuery, 20)
        .subscribe({
          next: (response: NewsResponse) => {
            this.articles = response.articles;
            this.applyFilters();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error searching news:', error);
            this.error = this.translate('news.error');
            this.isLoading = false;
          }
        });

      this.subscriptions.push(searchSubscription);
    } else {
      this.loadNews();
    }
  }

  /**
   * Clear search and reload news
   */
  clearSearch(): void {
    this.searchQuery = '';
    this.loadNews();
  }

  /**
   * Apply filters to the articles
   */
  private applyFilters(): void {
    this.filteredArticles = [...this.articles];
  }

  /**
   * Refresh news data
   */
  refreshNews(): void {
    const refreshSubscription = this.newsService.refreshNews()
      .subscribe({
        next: () => {
          this.loadNews();
        },
        error: (error) => {
          console.error('Error refreshing news:', error);
          this.error = this.translate('news.error');
        }
      });

    this.subscriptions.push(refreshSubscription);
  }

  /**
   * Open article in modal
   */
  openArticle(article: NewsArticle): void {
    this.selectedArticle = article;
    this.showModal = true;
    // Prevent background scrolling but preserve news section scrolling
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close article modal
   */
  closeModal(): void {
    this.selectedArticle = null;
    this.showModal = false;
    // Restore scrolling
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
    (document.body.style as any).webkitOverflowScrolling = 'touch';
  }

  /**
   * Open external article link
   */
  openExternalLink(article: NewsArticle): void {
    if (article.url) {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Get time ago string for article
   */
  getTimeAgo(article: NewsArticle): string {
    return this.newsService.getTimeAgo(article.publishedAt);
  }

  /**
   * Format publication date
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat(this.getCurrentLanguageCode(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  /**
   * Get current language code for date formatting
   */
  private getCurrentLanguageCode(): string {
    const lang = this.translationService.getCurrentLanguage();
    switch (lang) {
      case 'fr': return 'fr-FR';
      case 'ln': return 'fr-CD'; // Use French format for Lingala
      case 'sw': return 'sw-CD'; // Swahili
      case 'lu': return 'fr-CD'; // Use French format for Tshiluba
      case 'kg': return 'fr-CD'; // Use French format for Kikongo
      default: return 'en-US';
    }
  }

  /**
   * Get category display name
   */
  getCategoryLabel(category: string): string {
    const categoryItem = this.categories.find(cat => cat.value === category);
    return categoryItem ? this.translate(categoryItem.label) : category;
  }

  /**
   * Handle keyboard navigation in modal
   */
  onModalKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByArticleId(index: number, article: NewsArticle): string {
    return article.id;
  }

  /**
   * Track by function for categories
   */
  trackByCategoryValue(index: number, category: any): string {
    return category.value;
  }

  /**
   * Get translation helper
   */
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  /**
   * Check if article has image
   */
  hasImage(article: NewsArticle): boolean {
    return !!(article.imageUrl && article.imageUrl.trim());
  }

  /**
   * Handle image load error
   */
  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  /**
   * Get truncated summary for article cards
   */
  getTruncatedSummary(summary: string, maxLength: number = 150): string {
    if (summary.length <= maxLength) {
      return summary;
    }
    return summary.substring(0, maxLength).trim() + '...';
  }

  /**
   * Get article excerpt for search results
   */
  getArticleExcerpt(article: NewsArticle): string {
    if (this.searchQuery && this.searchQuery.trim()) {
      // Try to find the search term in the content and show context
      const query = this.searchQuery.toLowerCase();
      const content = article.content.toLowerCase();
      const index = content.indexOf(query);
      
      if (index !== -1) {
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + 100);
        let excerpt = article.content.substring(start, end);
        
        if (start > 0) excerpt = '...' + excerpt;
        if (end < content.length) excerpt = excerpt + '...';
        
        return excerpt;
      }
    }
    
    return this.getTruncatedSummary(article.summary);
  }
}
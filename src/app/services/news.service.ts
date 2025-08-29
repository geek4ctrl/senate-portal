import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  publishedAt: Date;
  imageUrl?: string;
  category: 'politics' | 'economy' | 'security' | 'society';
  url?: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  total: number;
  hasMore: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // Mock news data for DRC - In a real application, this would come from an API
  private mockNewsData: NewsArticle[] = [
    {
      id: '1',
      title: 'Senate Approves New Infrastructure Development Bill',
      summary: 'The DRC Senate has unanimously approved a comprehensive infrastructure development bill aimed at improving roads, bridges, and public facilities across all provinces.',
      content: 'In a landmark decision today, the Democratic Republic of Congo Senate voted unanimously to approve the Infrastructure Development Act of 2024. This comprehensive legislation allocates substantial funding for the construction and maintenance of critical infrastructure across all 26 provinces of the country. The bill includes provisions for road construction, bridge repairs, hospital upgrades, and school modernization projects. Senate President emphasized the importance of this legislation in driving economic growth and improving the quality of life for all Congolese citizens. The bill will now be sent to the National Assembly for final approval before becoming law.',
      author: 'Jean-Baptiste Mukendi',
      source: 'Radio Okapi',
      publishedAt: new Date('2024-08-28T10:30:00Z'),
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop',
      category: 'politics',
      url: 'https://radiookapi.net'
    },
    {
      id: '2',
      title: 'Economic Growth Reaches 5.2% in Second Quarter',
      summary: 'The DRC economy shows strong performance with 5.2% growth in Q2 2024, driven by mining exports and agricultural production.',
      content: 'The Democratic Republic of Congo posted impressive economic growth of 5.2% in the second quarter of 2024, according to the latest figures from the Central Bank of Congo. This growth was primarily driven by increased mining exports, particularly copper and cobalt, as well as strong performance in the agricultural sector. The mining sector contributed 3.1% to the overall growth, while agriculture added 1.4%. The services sector also showed resilience with a 0.7% contribution. Finance Minister highlighted that this growth trajectory positions the DRC well for achieving the annual target of 6.5% GDP growth. The government continues to focus on diversifying the economy and improving infrastructure to sustain this positive momentum.',
      author: 'Marie Kalombo',
      source: '7sur7.cd',
      publishedAt: new Date('2024-08-27T14:15:00Z'),
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop',
      category: 'economy'
    },
    {
      id: '3',
      title: 'MONUSCO Transition Plan Receives Senate Support',
      summary: 'The Senate endorses the gradual transition plan for MONUSCO forces while emphasizing the need for strengthened national security capabilities.',
      content: 'The DRC Senate has formally endorsed the government\'s plan for the gradual transition of MONUSCO peacekeeping forces while strengthening national security capabilities. During a special session, senators from all provinces expressed support for the phased approach that prioritizes the training and equipment of the Congolese Armed Forces (FARDC). The transition plan includes provisions for maintaining stability in eastern provinces while gradually reducing international peacekeeping presence. Senate Defense Committee Chairman stressed the importance of ensuring that local security forces are adequately prepared to handle security challenges independently. The plan also includes measures for supporting displaced populations and promoting community reconciliation in conflict-affected areas.',
      author: 'François Kabila',
      source: 'ActualitéCD',
      publishedAt: new Date('2024-08-26T09:45:00Z'),
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      category: 'security'
    },
    {
      id: '4',
      title: 'New Healthcare Initiative Launched for Rural Areas',
      summary: 'Government announces comprehensive healthcare program targeting rural communities with mobile clinics and telemedicine services.',
      content: 'The Ministry of Health, in collaboration with international partners, has launched an ambitious healthcare initiative specifically designed to serve rural and remote communities across the DRC. The program includes the deployment of 50 mobile medical units equipped with essential medical equipment and staffed by qualified healthcare professionals. Additionally, a telemedicine network will connect rural health centers with major hospitals in Kinshasa, Lubumbashi, and other urban centers, enabling remote consultations and medical expertise sharing. The initiative aims to reduce maternal and infant mortality rates, improve vaccination coverage, and provide better access to essential medicines. Health Minister announced that the program will prioritize provinces with the greatest healthcare needs, including those in conflict-affected areas.',
      author: 'Dr. Esperance Mujinga',
      source: 'Le Potentiel',
      publishedAt: new Date('2024-08-25T16:20:00Z'),
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      category: 'society'
    },
    {
      id: '5',
      title: 'Provincial Senators Discuss Resource Allocation Framework',
      summary: 'Senate committees from all provinces convene to establish fair and transparent mechanisms for natural resource revenue distribution.',
      content: 'Representatives from all 26 provinces gathered in the Senate to discuss the implementation of a new framework for natural resource revenue allocation. The framework aims to ensure that provinces contributing to mining and petroleum production receive fair compensation while supporting development in less resource-rich areas. The discussions focused on transparency mechanisms, environmental protection measures, and community development funds. Senators emphasized the importance of ensuring that local communities benefit directly from natural resource extraction in their territories. The proposed framework includes provisions for education, healthcare, and infrastructure development in mining areas, as well as environmental restoration funds.',
      author: 'Pascal Mukanya',
      source: 'Congo Press',
      publishedAt: new Date('2024-08-24T11:30:00Z'),
      imageUrl: 'https://images.unsplash.com/photo-1541166213826-b0ad3b91ae22?w=400&h=250&fit=crop',
      category: 'politics'
    },
    {
      id: '6',
      title: 'Digital Innovation Hub Opens in Kinshasa',
      summary: 'New technology center aims to foster innovation and entrepreneurship among Congolese youth, creating opportunities in the digital economy.',
      content: 'A state-of-the-art Digital Innovation Hub officially opened its doors in Kinshasa, marking a significant milestone in the DRC\'s digital transformation journey. The facility, supported by both government and private sector partnerships, provides young entrepreneurs and students with access to modern technology, training programs, and mentorship opportunities. The hub features coding bootcamps, digital marketing workshops, and business incubation services. Minister of Digital Affairs highlighted the government\'s commitment to positioning the DRC as a leader in digital innovation in Central Africa. The facility aims to create 1,000 new jobs in the technology sector over the next three years and support the development of local tech startups.',
      author: 'Gloire Tumba',
      source: 'Digital Congo',
      publishedAt: new Date('2024-08-23T13:45:00Z'),
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
      category: 'society'
    },
    {
      id: '7',
      title: 'Mining Sector Reforms Show Positive Results',
      summary: 'Government reforms in the mining sector lead to increased transparency, better working conditions, and higher government revenues.',
      content: 'Recent reforms in the DRC\'s mining sector are yielding positive results, with significant improvements in transparency, worker safety, and government revenue collection. The new mining code, implemented over the past year, has introduced stricter environmental standards, better labor protections, and enhanced revenue-sharing mechanisms. Mining companies are now required to publish detailed production and financial reports, leading to greater accountability. The reforms have also established worker safety standards that align with international best practices. Government officials report a 25% increase in mining-related tax revenues, which are being reinvested in education, healthcare, and infrastructure development.',
      author: 'Robert Mwanangongo',
      source: 'Mining Weekly DRC',
      publishedAt: new Date('2024-08-22T08:15:00Z'),
      imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&fit=crop',
      category: 'economy'
    },
    {
      id: '8',
      title: 'Education Ministry Expands Scholarship Program',
      summary: 'New scholarship initiative will provide 5,000 students from rural areas with opportunities to pursue higher education in major universities.',
      content: 'The Ministry of Education has announced a significant expansion of its scholarship program, offering 5,000 new scholarships to students from rural and underserved communities. The program aims to promote educational equity and ensure that talented students from all backgrounds have access to quality higher education. Scholarships will cover tuition, accommodation, and living expenses for students pursuing degrees in science, technology, engineering, mathematics, agriculture, and healthcare. The program also includes mentorship components and internship opportunities with government agencies and private companies. Education Minister emphasized that this investment in human capital is essential for the country\'s long-term development and competitiveness.',
      author: 'Claudine Mbiya',
      source: 'Education Today',
      publishedAt: new Date('2024-08-21T15:00:00Z'),
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
      category: 'society'
    }
  ];

  constructor() { }

  /**
   * Fetch latest news articles
   * @param category Optional category filter
   * @param limit Number of articles to return
   * @returns Observable of news response
   */
  getLatestNews(category?: string, limit: number = 10): Observable<NewsResponse> {
    // Simulate API delay
    return of(this.mockNewsData).pipe(
      delay(800),
      map(articles => {
        let filteredArticles = articles;
        
        // Filter by category if specified
        if (category && category !== 'all') {
          filteredArticles = articles.filter(article => article.category === category);
        }
        
        // Sort by publication date (newest first)
        filteredArticles = filteredArticles.sort(
          (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
        );
        
        // Limit results
        const limitedArticles = filteredArticles.slice(0, limit);
        
        return {
          articles: limitedArticles,
          total: filteredArticles.length,
          hasMore: filteredArticles.length > limit
        };
      })
    );
  }

  /**
   * Get a specific news article by ID
   * @param id Article ID
   * @returns Observable of news article or null
   */
  getNewsById(id: string): Observable<NewsArticle | null> {
    return of(this.mockNewsData).pipe(
      delay(300),
      map(articles => articles.find(article => article.id === id) || null)
    );
  }

  /**
   * Refresh news data (simulate API call)
   * @returns Observable of success status
   */
  refreshNews(): Observable<boolean> {
    // In a real application, this would call the API to fetch fresh data
    return of(true).pipe(delay(1000));
  }

  /**
   * Get available news categories
   * @returns Array of category options
   */
  getCategories(): Array<{value: string, label: string}> {
    return [
      { value: 'all', label: 'news.categories.all' },
      { value: 'politics', label: 'news.categories.politics' },
      { value: 'economy', label: 'news.categories.economy' },
      { value: 'security', label: 'news.categories.security' },
      { value: 'society', label: 'news.categories.society' }
    ];
  }

  /**
   * Calculate time ago string for article publication date
   * @param publishedAt Publication date
   * @returns Time ago string key for translation
   */
  getTimeAgo(publishedAt: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - publishedAt.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return 'news.timeAgo.justNow';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} news.timeAgo.minutes`;
    } else if (diffInHours < 24) {
      return `${diffInHours} news.timeAgo.hours`;
    } else {
      return `${diffInDays} news.timeAgo.days`;
    }
  }

  /**
   * Search news articles by keyword
   * @param query Search query
   * @param limit Number of results to return
   * @returns Observable of matching articles
   */
  searchNews(query: string, limit: number = 10): Observable<NewsResponse> {
    if (!query.trim()) {
      return this.getLatestNews('all', limit);
    }

    return of(this.mockNewsData).pipe(
      delay(500),
      map(articles => {
        const searchQuery = query.toLowerCase().trim();
        const filteredArticles = articles.filter(article =>
          article.title.toLowerCase().includes(searchQuery) ||
          article.summary.toLowerCase().includes(searchQuery) ||
          article.content.toLowerCase().includes(searchQuery)
        );

        // Sort by relevance (simple implementation based on title match)
        filteredArticles.sort((a, b) => {
          const aScore = a.title.toLowerCase().includes(searchQuery) ? 2 : 1;
          const bScore = b.title.toLowerCase().includes(searchQuery) ? 2 : 1;
          return bScore - aScore;
        });

        const limitedArticles = filteredArticles.slice(0, limit);

        return {
          articles: limitedArticles,
          total: filteredArticles.length,
          hasMore: filteredArticles.length > limit
        };
      })
    );
  }
}
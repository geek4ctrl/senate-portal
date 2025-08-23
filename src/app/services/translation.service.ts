import { Injectable } from '@angular/core';

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  en: Translation;
  fr: Translation;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = 'en';
  
  private translations: Translations = {
    en: {
      // Language switcher
      'language.select': 'Language',
      
      // Chart titles
      'chart.title': 'Democratic Republic of Congo - Senate Map',
      'chart.subtitle': 'Provincial distribution of Senate members and locations',
      
      // Loading states
      'loading.mapData': 'Loading map data...',
      'loading.initializing': 'Initializing map...',
      
      // Modal content
      'modal.senateInfo': 'Senate Information',
      'modal.province': 'Province',
      'modal.totalSenators': 'Total Senators',
      'modal.senatorsFromRegion': 'Senators from this region',
      'modal.noSenators': 'No detailed senator information available for this region.',
      'modal.close': 'Close',
      'modal.independent': 'Independent',
      
      // Map legend
      'map.drcProvinces': 'DRC Provinces',
      'map.senateLocations': 'Senate Locations',
      
      // Tooltip
      'tooltip.senators': 'Senators'
    },
    fr: {
      // Language switcher
      'language.select': 'Langue',
      
      // Chart titles
      'chart.title': 'République Démocratique du Congo - Carte du Sénat',
      'chart.subtitle': 'Répartition provinciale des membres du Sénat et des emplacements',
      
      // Loading states
      'loading.mapData': 'Chargement des données cartographiques...',
      'loading.initializing': 'Initialisation de la carte...',
      
      // Modal content
      'modal.senateInfo': 'Informations du Sénat',
      'modal.province': 'Province',
      'modal.totalSenators': 'Total des Sénateurs',
      'modal.senatorsFromRegion': 'Sénateurs de cette région',
      'modal.noSenators': 'Aucune information détaillée sur les sénateurs disponible pour cette région.',
      'modal.close': 'Fermer',
      'modal.independent': 'Indépendant',
      
      // Map legend
      'map.drcProvinces': 'Provinces de la RDC',
      'map.senateLocations': 'Emplacements du Sénat',
      
      // Tooltip
      'tooltip.senators': 'Sénateurs'
    }
  };

  setLanguage(language: 'en' | 'fr'): void {
    this.currentLanguage = language;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  translate(key: string): string {
    return this.translations[this.currentLanguage as keyof Translations][key] || key;
  }

  getAvailableLanguages(): Array<{code: string, name: string}> {
    return [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' }
    ];
  }
}

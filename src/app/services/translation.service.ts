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
      // Navigation
      'nav.navigation': 'Navigation',
      'nav.map': 'Map',
      'nav.analytics': 'Analytics',
      'nav.constitution': 'Constitution',

      // Language switcher
      'language.select': 'Language',

      // Sidebar
      'sidebar.senators': 'Senators',
      'sidebar.filterPlaceholder': 'Filter Senators',
      'sidebar.senatorsFound': 'senators found',
      'sidebar.noResults': 'No senators found matching your search.',

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
      'tooltip.senators': 'Senators',

      // Profile card
      'profile.distance': 'Distance',
      'profile.rating': 'Rating',
      'profile.today': 'TODAY',

      // Constitution section
      'constitution.title': 'Constitution of the Democratic Republic of Congo',
      'constitution.subtitle': 'Senate: Composition and Powers',
      
      // Constitution composition
      'constitution.composition.title': 'Senate Composition',
      'constitution.composition.article98': 'Article 98',
      'constitution.composition.content98': 'The Senate is composed of senators elected for a term of five years renewable.',
      'constitution.composition.article99': 'Article 99',
      'constitution.composition.content99': 'Each province elects four senators. The city of Kinshasa elects eight senators.',
      'constitution.composition.article100': 'Article 100',
      'constitution.composition.content100': 'The senators are elected by the provincial assemblies and the council of the city of Kinshasa by indirect universal suffrage.',
      
      // Constitution powers
      'constitution.powers.title': 'Senate Powers',
      'constitution.powers.article101': 'Article 101',
      'constitution.powers.content101': 'The Senate exercises legislative power concurrently with the National Assembly.',
      'constitution.powers.article102': 'Article 102',
      'constitution.powers.content102': 'The Senate has specific powers including the trial of the President of the Republic in case of high treason.',
      
      // Constitution organization
      'constitution.organization.title': 'Senate Organization',
      'constitution.organization.article103': 'Article 103',
      'constitution.organization.content103': 'The Senate elects its President and other members of its Bureau at the beginning of the legislature.',
      'constitution.organization.article104': 'Article 104',
      'constitution.organization.content104': 'The Senate establishes its internal regulations which determine its organization and functioning.',
      
      // Constitution statistics
      'constitution.statistics.title': 'Current Senate Statistics',
      'constitution.statistics.totalSenators': 'Total Senators',
      'constitution.statistics.provinces': 'Provinces',
      'constitution.statistics.termYears': 'Term Years',
      'constitution.statistics.femalePercentage': 'Female %'
    },
    fr: {
      // Navigation
      'nav.navigation': 'Navigation',
      'nav.map': 'Carte',
      'nav.analytics': 'Analytiques',
      'nav.constitution': 'Constitution',

      // Language switcher
      'language.select': 'Langue',

      // Sidebar
      'sidebar.senators': 'Sénateurs',
      'sidebar.filterPlaceholder': 'Filtrer les Sénateurs',
      'sidebar.senatorsFound': 'sénateurs trouvés',
      'sidebar.noResults': 'Aucun sénateur trouvé correspondant à votre recherche.',

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
      'tooltip.senators': 'Sénateurs',

      // Profile card
      'profile.distance': 'Distance',
      'profile.rating': 'Évaluation',
      'profile.today': "AUJOURD'HUI",

      // Constitution section
      'constitution.title': 'Constitution de la République Démocratique du Congo',
      'constitution.subtitle': 'Sénat: Composition et Pouvoirs',
      
      // Constitution composition
      'constitution.composition.title': 'Composition du Sénat',
      'constitution.composition.article98': 'Article 98',
      'constitution.composition.content98': 'Le Sénat est composé de sénateurs élus pour un mandat de cinq ans renouvelable.',
      'constitution.composition.article99': 'Article 99',
      'constitution.composition.content99': 'Chaque province élit quatre sénateurs. La ville de Kinshasa élit huit sénateurs.',
      'constitution.composition.article100': 'Article 100',
      'constitution.composition.content100': 'Les sénateurs sont élus par les assemblées provinciales et le conseil de la ville de Kinshasa au suffrage universel indirect.',
      
      // Constitution powers
      'constitution.powers.title': 'Pouvoirs du Sénat',
      'constitution.powers.article101': 'Article 101',
      'constitution.powers.content101': 'Le Sénat exerce le pouvoir législatif concurremment avec l\'Assemblée nationale.',
      'constitution.powers.article102': 'Article 102',
      'constitution.powers.content102': 'Le Sénat a des pouvoirs spécifiques incluant le jugement du Président de la République en cas de haute trahison.',
      
      // Constitution organization
      'constitution.organization.title': 'Organisation du Sénat',
      'constitution.organization.article103': 'Article 103',
      'constitution.organization.content103': 'Le Sénat élit son Président et les autres membres de son Bureau au début de la législature.',
      'constitution.organization.article104': 'Article 104',
      'constitution.organization.content104': 'Le Sénat établit son règlement intérieur qui détermine son organisation et son fonctionnement.',
      
      // Constitution statistics
      'constitution.statistics.title': 'Statistiques Actuelles du Sénat',
      'constitution.statistics.totalSenators': 'Total Sénateurs',
      'constitution.statistics.provinces': 'Provinces',
      'constitution.statistics.termYears': 'Années du Mandat',
      'constitution.statistics.femalePercentage': 'Femmes %'
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

import { Injectable } from '@angular/core';

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  en: Translation;
  fr: Translation;
  ln: Translation; // Lingala
  sw: Translation; // Swahili
  lu: Translation; // Tshiluba
  kg: Translation; // Kikongo
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
      'map.senatorsPerProvince': 'Senators per Province',

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
      'map.senatorsPerProvince': 'Sénateurs par Province',

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
    },
    ln: {
      // Navigation
      'nav.navigation': 'Navigation',
      'nav.map': 'Karte',
      'nav.analytics': 'Makanisi',
      'nav.constitution': 'Mobeko',

      // Language switcher
      'language.select': 'Lokota',

      // Sidebar
      'sidebar.senators': 'Ba Senateur',
      'sidebar.filterPlaceholder': 'Luka Ba Senateur',
      'sidebar.senatorsFound': 'ba senateur ezwami',
      'sidebar.noResults': 'Senateur moko te ezwami na boluki na yo.',

      // Chart titles
      'chart.title': 'République Démocratique ya Congo - Karte ya Sénat',
      'chart.subtitle': 'Bokabwani ya ba membre ya Sénat na bisika',

      // Loading states
      'loading.mapData': 'Ezali ko charger ba données ya karte...',
      'loading.initializing': 'Ezali ko bandela karte...',

      // Modal content
      'modal.senateInfo': 'Ba sango ya Sénat',
      'modal.province': 'Etuka',
      'modal.totalSenators': 'Motango ya Ba Senateur',
      'modal.senatorsFromRegion': 'Ba Senateur ya etuka oyo',
      'modal.noSenators': 'Sango ya ba senateur ezali te mpo na etuka oyo.',
      'modal.close': 'Kanga',
      'modal.independent': 'Independant',

      // Map legend
      'map.drcProvinces': 'Ba Etuka ya RDC',
      'map.senateLocations': 'Bisika ya Sénat',
      'map.senatorsPerProvince': 'Ba Senateur na Etuka',

      // Tooltip
      'tooltip.senators': 'Ba Senateur',

      // Profile card
      'profile.distance': 'Mokano',
      'profile.rating': 'Kopesa motuya',
      'profile.today': 'LELO',

      // Constitution section
      'constitution.title': 'Mobeko ya République Démocratique ya Congo',
      'constitution.subtitle': 'Sénat: Bosangani mpe Nguya',
      
      // Constitution composition
      'constitution.composition.title': 'Bosangani ya Sénat',
      'constitution.composition.article98': 'Article 98',
      'constitution.composition.content98': 'Sénat esangani na ba senateur oyo baponami mpo na mibu mitano oyo ekoki kozongisama.',
      'constitution.composition.article99': 'Article 99',
      'constitution.composition.content99': 'Etuka moko na moko eponi ba senateur minei. Engumba ya Kinshasa eponi ba senateur mwambe.',
      'constitution.composition.article100': 'Article 100',
      'constitution.composition.content100': 'Ba senateur baponami na ba assemblée ya bituka mpe conseil ya engumba ya Kinshasa na nzela ya vote ya bato banso.',
      
      // Constitution powers
      'constitution.powers.title': 'Nguya ya Sénat',
      'constitution.powers.article101': 'Article 101',
      'constitution.powers.content101': 'Sénat esaleli nguya ya kopesa mibeko elongo na Assemblée nationale.',
      'constitution.powers.article102': 'Article 102',
      'constitution.powers.content102': 'Sénat ezali na nguya ya libanda lokola kosamba Mokambi ya République soki asali botomboki.',
      
      // Constitution organization
      'constitution.organization.title': 'Mobongisi ya Sénat',
      'constitution.organization.article103': 'Article 103',
      'constitution.organization.content103': 'Sénat eponi Mokambi na ye mpe ba membre mosusu ya Bureau na ye na ebandeli ya législature.',
      'constitution.organization.article104': 'Article 104',
      'constitution.organization.content104': 'Sénat epesi mibeko ya kati oyo etalisi mobongisi mpe mosala na yango.',
      
      // Constitution statistics
      'constitution.statistics.title': 'Ba Statistique ya Sénat ya Lelo',
      'constitution.statistics.totalSenators': 'Motango ya Ba Senateur',
      'constitution.statistics.provinces': 'Ba Etuka',
      'constitution.statistics.termYears': 'Mibu ya Mandat',
      'constitution.statistics.femalePercentage': 'Basi %'
    },
    sw: {
      // Navigation
      'nav.navigation': 'Urambazaji',
      'nav.map': 'Ramani',
      'nav.analytics': 'Uchambuzi',
      'nav.constitution': 'Katiba',

      // Language switcher
      'language.select': 'Lugha',

      // Sidebar
      'sidebar.senators': 'Maseneta',
      'sidebar.filterPlaceholder': 'Tafuta Maseneta',
      'sidebar.senatorsFound': 'maseneta wamepatikana',
      'sidebar.noResults': 'Hakuna seneta aliyepatikana kulingana na utafutaji wako.',

      // Chart titles
      'chart.title': 'Jamhuri ya Kidemokrasia ya Kongo - Ramani ya Seneti',
      'chart.subtitle': 'Mgawanyo wa mikoa wa wanachama wa Seneti na maeneo',

      // Loading states
      'loading.mapData': 'Inapakia data ya ramani...',
      'loading.initializing': 'Inaanzisha ramani...',

      // Modal content
      'modal.senateInfo': 'Habari za Seneti',
      'modal.province': 'Mkoa',
      'modal.totalSenators': 'Jumla ya Maseneta',
      'modal.senatorsFromRegion': 'Maseneta kutoka mkoa huu',
      'modal.noSenators': 'Hakuna habari za kina za maseneta zinazopatikana kwa mkoa huu.',
      'modal.close': 'Funga',
      'modal.independent': 'Huru',

      // Map legend
      'map.drcProvinces': 'Mikoa ya DRC',
      'map.senateLocations': 'Maeneo ya Seneti',
      'map.senatorsPerProvince': 'Maseneta kwa Mkoa',

      // Tooltip
      'tooltip.senators': 'Maseneta',

      // Profile card
      'profile.distance': 'Umbali',
      'profile.rating': 'Ukadiriaji',
      'profile.today': 'LEO',

      // Constitution section
      'constitution.title': 'Katiba ya Jamhuri ya Kidemokrasia ya Kongo',
      'constitution.subtitle': 'Seneti: Muundo na Mamlaka',
      
      // Constitution composition
      'constitution.composition.title': 'Muundo wa Seneti',
      'constitution.composition.article98': 'Ibara ya 98',
      'constitution.composition.content98': 'Seneti inajumuisha maseneta waliochaguliwa kwa muda wa miaka mitano inayoweza kufufuliwa.',
      'constitution.composition.article99': 'Ibara ya 99',
      'constitution.composition.content99': 'Kila mkoa unachagua maseneta wanne. Jiji la Kinshasa linachagua maseneta wanane.',
      'constitution.composition.article100': 'Ibara ya 100',
      'constitution.composition.content100': 'Maseneta wanachaguliwa na mabunge ya kimkoa na baraza la jiji la Kinshasa kwa uchaguzi wa kijumla wa papo hapo.',
      
      // Constitution powers
      'constitution.powers.title': 'Mamlaka ya Seneti',
      'constitution.powers.article101': 'Ibara ya 101',
      'constitution.powers.content101': 'Seneti inatumia mamlaka ya kisheria pamoja na Bunge la Kitaifa.',
      'constitution.powers.article102': 'Ibara ya 102',
      'constitution.powers.content102': 'Seneti ina mamlaka maalum ikiwa ni pamoja na kumhukumu Rais wa Jamhuri katika kesi ya uhaini mkuu.',
      
      // Constitution organization
      'constitution.organization.title': 'Utaratibu wa Seneti',
      'constitution.organization.article103': 'Ibara ya 103',
      'constitution.organization.content103': 'Seneti inachagua Rais wake na wanachama wengine wa Ofisi yake mwanzoni mwa bunge.',
      'constitution.organization.article104': 'Ibara ya 104',
      'constitution.organization.content104': 'Seneti inaweka kanuni zake za ndani zinazobainisha utaratibu na utendaji wake.',
      
      // Constitution statistics
      'constitution.statistics.title': 'Takwimu za Seneti za Sasa',
      'constitution.statistics.totalSenators': 'Jumla ya Maseneta',
      'constitution.statistics.provinces': 'Mikoa',
      'constitution.statistics.termYears': 'Miaka ya Muda',
      'constitution.statistics.femalePercentage': 'Wanawake %'
    },
    lu: {
      // Navigation
      'nav.navigation': 'Butambui',
      'nav.map': 'Karte',
      'nav.analytics': 'Butungulushi',
      'nav.constitution': 'Mubengele',

      // Language switcher
      'language.select': 'Luloba',

      // Sidebar
      'sidebar.senators': 'Bantu ba Senateur',
      'sidebar.filterPlaceholder': 'Loza Bantu ba Senateur',
      'sidebar.senatorsFound': 'bantu ba senateur basangile',
      'sidebar.noResults': 'Kantu ka senateur kasangile wa ku bulozebuo.',

      // Chart titles
      'chart.title': 'Republiki Democratiki wa Kongo - Karte wa Senat',
      'chart.subtitle': 'Butabidishe bua bantu ba Senat ne bisebe',

      // Loading states
      'loading.mapData': 'Ulatamba dibilo dia karte...',
      'loading.initializing': 'Utamba karte...',

      // Modal content
      'modal.senateInfo': 'Mfumu wa Senat',
      'modal.province': 'Tshimbila',
      'modal.totalSenators': 'Bantu ba Senateur boonso',
      'modal.senatorsFromRegion': 'Bantu ba Senateur ba tshimbila tshi',
      'modal.noSenators': 'Mfumu wa bantu ba senateur kayitshi wa tshimbila tshi.',
      'modal.close': 'Bamba',
      'modal.independent': 'Ulubanza',

      // Map legend
      'map.drcProvinces': 'Bitshimbila bia RDC',
      'map.senateLocations': 'Bialu bia Senat',
      'map.senatorsPerProvince': 'Bantu ba Senateur ne Tshimbila',

      // Tooltip
      'tooltip.senators': 'Bantu ba Senateur',

      // Profile card
      'profile.distance': 'Bulele',
      'profile.rating': 'Bukaya',
      'profile.today': 'LELU',

      // Constitution section
      'constitution.title': 'Mubengele wa Republiki Democratiki wa Kongo',
      'constitution.subtitle': 'Senat: Butambishe ne Bukumu',
      
      // Constitution composition
      'constitution.composition.title': 'Butambishe bua Senat',
      'constitution.composition.article98': 'Lukanda 98',
      'constitution.composition.content98': 'Senat uletambile ne bantu ba senateur basolole wa myaka mitanu ikazongama.',
      'constitution.composition.article99': 'Lukanda 99',
      'constitution.composition.content99': 'Tshimbila tshimu tshimu tshisola bantu ba senateur bana. Dimbanza dia Kinshasa disola bantu ba senateur munana.',
      'constitution.composition.article100': 'Lukanda 100',
      'constitution.composition.content100': 'Bantu ba senateur basolole ne makundanji a bitshimbila ne lukundi lua dimbanza dia Kinshasa ne musolo ua bantu boonso.',
      
      // Constitution powers
      'constitution.powers.title': 'Bukumu bua Senat',
      'constitution.powers.article101': 'Lukanda 101',
      'constitution.powers.content101': 'Senat usebela bukumu bua mubengele ne Kunkundanji ia Tshitshilele.',
      'constitution.powers.article102': 'Lukanda 102',
      'constitution.powers.content102': 'Senat une bukumu buabanze bu kwanga Mukalenga ua Republiki tshishinyi shashile bukaci.',
      
      // Constitution organization
      'constitution.organization.title': 'Butambishe bua Senat',
      'constitution.organization.article103': 'Lukanda 103',
      'constitution.organization.content103': 'Senat usola Mukalenga uaye ne bantu banji ba mbilo yaye ku kutamba kua mbilo.',
      'constitution.organization.article104': 'Lukanda 104',
      'constitution.organization.content104': 'Senat uishila mubengele uaye ua mukati uusebulushia butambishe ne musalu uaye.',
      
      // Constitution statistics
      'constitution.statistics.title': 'Dikandikanie dia Senat dia Lelu',
      'constitution.statistics.totalSenators': 'Bantu ba Senateur Boonso',
      'constitution.statistics.provinces': 'Bitshimbila',
      'constitution.statistics.termYears': 'Myaka ya Mbilo',
      'constitution.statistics.femalePercentage': 'Bana bakaji %'
    },
    kg: {
      // Navigation
      'nav.navigation': 'Kuvanga',
      'nav.map': 'Kata',
      'nav.analytics': 'Kusoluka',
      'nav.constitution': 'Kimbangelo',

      // Language switcher
      'language.select': 'Kidimbu',

      // Sidebar
      'sidebar.senators': 'Bantu ba Senateur',
      'sidebar.filterPlaceholder': 'Tomba Bantu ba Senateur',
      'sidebar.senatorsFound': 'bantu ba senateur bakuzolele',
      'sidebar.noResults': 'Muntu mosi ko senateur uzolele ko na nzela eno.',

      // Chart titles
      'chart.title': 'Republiki Demokratiki ya Kongo - Kata ya Senat',
      'chart.subtitle': 'Kuvangu kua bantu ba Senat ye bisimbu',

      // Loading states
      'loading.mapData': 'Kulanda madisa ma kata...',
      'loading.initializing': 'Kubanda kata...',

      // Modal content
      'modal.senateInfo': 'Madisa ma Senat',
      'modal.province': 'Intinu',
      'modal.totalSenators': 'Nti nti bantu ba Senateur',
      'modal.senatorsFromRegion': 'Bantu ba Senateur ba intinu yayi',
      'modal.noSenators': 'Madisa ma nkanda ma bantu ba senateur mankaka ko ye intinu yayi.',
      'modal.close': 'Funga',
      'modal.independent': 'Ukikanga',

      // Map legend
      'map.drcProvinces': 'Tintinu ya RDC',
      'map.senateLocations': 'Bisimbu bia Senat',
      'map.senatorsPerProvince': 'Bantu ba Senateur ku Intinu',

      // Tooltip
      'tooltip.senators': 'Bantu ba Senateur',

      // Profile card
      'profile.distance': 'Umpata',
      'profile.rating': 'Kutaila',
      'profile.today': 'LELU',

      // Constitution section
      'constitution.title': 'Kimbangelo kia Republiki Demokratiki ya Kongo',
      'constitution.subtitle': 'Senat: Kusimbila ye Nkwa',
      
      // Constitution composition
      'constitution.composition.title': 'Kusimbila kua Senat',
      'constitution.composition.article98': 'Nsamu 98',
      'constitution.composition.content98': 'Senat uwa na bantu ba senateur bansala ye myaka mitanu mkumbu kavutuka.',
      'constitution.composition.article99': 'Nsamu 99',
      'constitution.composition.content99': 'Intinu yoso yonso insobolo bantu ba senateur yana. Mbaza ya Kinshasa insobolo bantu ba senateur nana.',
      'constitution.composition.article100': 'Nsamu 100',
      'constitution.composition.content100': 'Bantu ba senateur bansalanga ye kunkutinu tintinu ye kunkutinu kia mbaza ya Kinshasa ye nzila ya bote bantu.',
      
      // Constitution powers
      'constitution.powers.title': 'Nkwa ya Senat',
      'constitution.powers.article101': 'Nsamu 101',
      'constitution.powers.content101': 'Senat usebedisa nkwa ya bimbangelo pambu ye Kunkutinu Kia Nsi.',
      'constitution.powers.article102': 'Nsamu 102',
      'constitution.powers.content102': 'Senat una nkwa ya mbazi buzitu kubonga Nfumu ya Republiki soki ukidi.',
      
      // Constitution organization
      'constitution.organization.title': 'Kusimbila kua Senat',
      'constitution.organization.article103': 'Nsamu 103',
      'constitution.organization.content103': 'Senat unsobolo Nfumu wawu ye bantu ba nkutu ku bandika ya musalu.',
      'constitution.organization.article104': 'Nsamu 104',
      'constitution.organization.content104': 'Senat uvana bimbangelo biawu bia kati bintubilanga kusimbila ye musalu wawu.',
      
      // Constitution statistics
      'constitution.statistics.title': 'Mazayu ma Senat ma Lelu',
      'constitution.statistics.totalSenators': 'Bantu ba Senateur Bantuwonsonso',
      'constitution.statistics.provinces': 'Tintinu',
      'constitution.statistics.termYears': 'Myaka ya Musalu',
      'constitution.statistics.femalePercentage': 'Bakento %'
    },
  };

  setLanguage(language: 'en' | 'fr' | 'ln' | 'sw' | 'lu' | 'kg'): void {
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
      { code: 'fr', name: 'Français' },
      { code: 'ln', name: 'Lingala' },
      { code: 'sw', name: 'Kiswahili' },
      { code: 'lu', name: 'Tshiluba' },
      { code: 'kg', name: 'Kikongo' }
    ];
  }
}

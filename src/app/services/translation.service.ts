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
  private currentLanguage = 'fr'; // Changed default to French

  private translations: Translations = {
    en: {
      // Navigation
      'nav.navigation': 'Navigation',
      'nav.map': 'Map',
      'nav.analytics': 'Analytics',
      'nav.constitution': 'Constitution',
      'nav.news': 'News',
      'nav.explore': 'Explore',
      'nav.chat': 'Chat',
      'nav.profile': 'Profile',
      'nav.discover': 'Discover',
      // Language switcher
      'language.select': 'Language',

      // Sidebar
      'sidebar.senators': 'Senators',
      'sidebar.filterPlaceholder': 'Filter',
      'sidebar.senatorsFound': 'senators found',
      'sidebar.noResults': 'No senators found matching your search.',
      'sidebar.sortBy': 'Sort by',
      'sidebar.sortName': 'Name',
      'sidebar.sortProvince': 'Province',
      'sidebar.sortParty': 'Party',
      'sidebar.sortAsc': 'A-Z',
      'sidebar.sortDesc': 'Z-A',

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
      'map.senateConnections': 'Senate Connections',
      'map.senatorsPerProvince': 'Senators per Province',

      // Map header banner
      'map.banner.title': 'Senate Map RDC',
      'map.banner.subtitle': 'Explore where senators of the Democratic Republic of Congo come from. Click a province to view its representatives.',
      'map.banner.lastUpdated': 'Last updated',
      'map.banner.source': 'Source',
      'map.banner.officialGazette': 'Official Gazette',

      // Map description
      'map.description.voiceMatters': 'Every province has a voice in the Senate, and every voice matters.',
      'map.description.interactiveGuide': 'This interactive map allows you to discover who represents your province in the higher chamber of Parliament. By hovering over a province, you can immediately see the senators elected from that region. Clicking on a province reveals more details about each senator, their political affiliation, and the role they play in shaping national decisions.',
      'map.description.platformGoal': 'The goal of this platform is to bring the Senate closer to the people. It helps you understand how representation is distributed across the Democratic Republic of the Congo, and highlights the connection between local communities and the national institutions that speak on their behalf. By making this information accessible, we encourage citizens to stay informed, to hold their representatives accountable, and to actively engage in the democratic life of our country.',

      // Feedback section
      'feedback.title': 'Your Voice Matters',
      'feedback.subtitle': 'Help us understand how citizens feel about their representation',
      'feedback.question': 'Do you think your province is well represented in the Senate?',
      'feedback.participate': 'Participate in Poll',
      'feedback.resultsPreview': 'Community Feedback:',
      'feedback.wellRepresented': 'Well Represented',
      'feedback.poorly': 'Needs Improvement',
      'feedback.unsure': 'Unsure',
      'feedback.pollTitle': 'Senate Representation Poll',
      'feedback.pollDescription': 'Your anonymous feedback helps us understand public opinion about senate representation across the Democratic Republic of Congo.',
      'feedback.selectProvince': 'Select your province:',
      'feedback.chooseProvince': 'Choose your province...',
      'feedback.yes': 'Yes, well represented',
      'feedback.no': 'No, needs improvement',
      'feedback.currentResults': 'Current results for',
      'feedback.totalVotes': 'Total votes',
      'feedback.submit': 'Submit Vote',
      'feedback.thankYou': 'Thank you for your feedback!',
      'feedback.successMessage': 'Your voice has been recorded and will help improve democratic representation.',

      // Tooltip
      'tooltip.senators': 'Senators',

      // Profile card
      'profile.distance': 'Distance',
      'profile.rating': 'Rating',
      'profile.today': 'TODAY',

      // About section
      'about.description': 'This platform was created to make information about the DRC Senate more accessible, transparent, and engaging for citizens, journalists, and researchers. Our goal is to strengthen accountability and civic participation.',
      'about.cta': 'About This Project',

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
      'constitution.statistics.femalePercentage': 'Female %',

      // News section
      'news.title': 'Latest News from DRC',
      'news.subtitle': 'Stay updated with the latest developments in the Democratic Republic of Congo',
      'news.loading': 'Loading latest news...',
      'news.error': 'Unable to load news at this time. Please try again later.',
      'news.readMore': 'Read More',
      'news.source': 'Source',
      'news.publishedOn': 'Published on',
      'news.noNews': 'No news available at the moment.',
      'news.refresh': 'Refresh News',
      'news.categories.all': 'All News',
      'news.categories.politics': 'Politics',
      'news.categories.economy': 'Economy',
      'news.categories.security': 'Security',
      'news.categories.society': 'Society',
      'news.timeAgo.minutes': 'minutes ago',
      'news.timeAgo.hours': 'hours ago',
      'news.timeAgo.days': 'days ago',
      'news.timeAgo.justNow': 'Just now',

      // Analytics section
      'analytics.title': 'Analytics Dashboard',
      'analytics.subtitle': 'Statistical insights and data visualization for Senate representation',
      'analytics.comingSoon': 'Coming Soon',
      'analytics.comingSoonDescription': 'Advanced analytics and data visualization features are currently in development. Stay tuned for comprehensive insights into Senate representation patterns, demographic analysis, and interactive charts.',
      'analytics.plannedFeatures': 'Planned Analytics Features',
      'analytics.plannedFeaturesDescription': 'Our analytics dashboard is under development and will feature comprehensive data visualization tools to help you better understand Senate representation patterns.',
      'analytics.feature.geographic': 'Geographic Distribution',
      'analytics.feature.demographics': 'Demographic Analysis',
      'analytics.feature.composition': 'Senate Composition',
      'analytics.feature.trends': 'Historical Trends'
    },
    fr: {
      // Navigation
      'nav.navigation': 'Navigation',
      'nav.map': 'Carte',
      'nav.analytics': 'Analytiques',
      'nav.constitution': 'Constitution',
      'nav.news': 'Actualités',
      'nav.explore': 'Explorer',
      'nav.chat': 'Discuter',
      'nav.profile': 'Profil',
      'nav.discover': 'Découvrir',
      // Language switcher
      'language.select': 'Langue',

      // Sidebar
      'sidebar.senators': 'Sénateurs',
      'sidebar.filterPlaceholder': 'Filtrer les Sénateurs',
      'sidebar.senatorsFound': 'sénateurs trouvés',
      'sidebar.noResults': 'Aucun sénateur trouvé correspondant à votre recherche.',
      'sidebar.sortBy': 'Trier par',
      'sidebar.sortName': 'Nom',
      'sidebar.sortProvince': 'Province',
      'sidebar.sortParty': 'Parti',
      'sidebar.sortAsc': 'A-Z',
      'sidebar.sortDesc': 'Z-A',

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
      'map.senateConnections': 'Connexions du Sénat',
      'map.senatorsPerProvince': 'Sénateurs par Province',

      // Map header banner
      'map.banner.title': 'Carte du Sénat RDC',
      'map.banner.subtitle': 'Explorez d\'où viennent les sénateurs de la République Démocratique du Congo. Cliquez sur une province pour voir ses représentants.',
      'map.banner.lastUpdated': 'Dernière mise à jour',
      'map.banner.source': 'Source',
      'map.banner.officialGazette': 'Journal Officiel',

      // Map description
      'map.description.voiceMatters': 'Chaque province a une voix au Sénat, et chaque voix compte.',
      'map.description.interactiveGuide': 'Cette carte interactive vous permet de découvrir qui représente votre province dans la chambre haute du Parlement. En survolant une province, vous pouvez immédiatement voir les sénateurs élus de cette région. En cliquant sur une province, vous obtenez plus de détails sur chaque sénateur, son affiliation politique et le rôle qu\'il joue dans les décisions nationales.',
      'map.description.platformGoal': 'L\'objectif de cette plateforme est de rapprocher le Sénat du peuple. Elle vous aide à comprendre comment la représentation est distribuée à travers la République Démocratique du Congo, et met en évidence le lien entre les communautés locales et les institutions nationales qui parlent en leur nom. En rendant ces informations accessibles, nous encourageons les citoyens à rester informés, à tenir leurs représentants responsables, et à s\'engager activement dans la vie démocratique de notre pays.',

      // Feedback section
      'feedback.title': 'Votre Voix Compte',
      'feedback.subtitle': 'Aidez-nous à comprendre comment les citoyens perçoivent leur représentation',
      'feedback.question': 'Pensez-vous que votre province est bien représentée au Sénat ?',
      'feedback.participate': 'Participer au Sondage',
      'feedback.resultsPreview': 'Retour de la Communauté :',
      'feedback.wellRepresented': 'Bien Représentée',
      'feedback.poorly': 'À Améliorer',
      'feedback.unsure': 'Pas Sûr',
      'feedback.pollTitle': 'Sondage sur la Représentation au Sénat',
      'feedback.pollDescription': 'Vos commentaires anonymes nous aident à comprendre l\'opinion publique sur la représentation sénatoriale à travers la République Démocratique du Congo.',
      'feedback.selectProvince': 'Sélectionnez votre province :',
      'feedback.chooseProvince': 'Choisissez votre province...',
      'feedback.yes': 'Oui, bien représentée',
      'feedback.no': 'Non, à améliorer',
      'feedback.currentResults': 'Résultats actuels pour',
      'feedback.totalVotes': 'Total des votes',
      'feedback.submit': 'Soumettre le Vote',
      'feedback.thankYou': 'Merci pour vos commentaires !',
      'feedback.successMessage': 'Votre voix a été enregistrée et aidera à améliorer la représentation démocratique.',

      // Tooltip
      'tooltip.senators': 'Sénateurs',

      // Profile card
      'profile.distance': 'Distance',
      'profile.rating': 'Évaluation',
      'profile.today': "AUJOURD'HUI",

      // About section
      'about.description': 'Cette plateforme a été créée pour rendre les informations sur le Sénat de la RDC plus accessibles, transparentes et engageantes pour les citoyens, journalistes et chercheurs. Notre objectif est de renforcer la responsabilité et la participation civique.',
      'about.cta': 'À Propos de Ce Projet',

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
      'constitution.statistics.femalePercentage': 'Femmes %',

      // News section
      'news.title': 'Dernières Actualités de la RDC',
      'news.subtitle': 'Restez informé des derniers développements en République Démocratique du Congo',
      'news.loading': 'Chargement des dernières actualités...',
      'news.error': 'Impossible de charger les actualités pour le moment. Veuillez réessayer plus tard.',
      'news.readMore': 'Lire Plus',
      'news.source': 'Source',
      'news.publishedOn': 'Publié le',
      'news.noNews': 'Aucune actualité disponible pour le moment.',
      'news.refresh': 'Actualiser les Nouvelles',
      'news.categories.all': 'Toutes les Actualités',
      'news.categories.politics': 'Politique',
      'news.categories.economy': 'Économie',
      'news.categories.security': 'Sécurité',
      'news.categories.society': 'Société',
      'news.timeAgo.minutes': 'il y a minutes',
      'news.timeAgo.hours': 'il y a heures',
      'news.timeAgo.days': 'il y a jours',
      'news.timeAgo.justNow': 'À l\'instant',

      // Analytics section
      'analytics.title': 'Tableau de Bord Analytique',
      'analytics.subtitle': 'Aperçus statistiques et visualisation des données pour la représentation du Sénat',
      'analytics.comingSoon': 'Bientôt Disponible',
      'analytics.comingSoonDescription': 'Les fonctionnalités avancées d\'analyse et de visualisation des données sont actuellement en développement. Restez à l\'écoute pour des aperçus complets sur les tendances de représentation du Sénat, l\'analyse démographique et les graphiques interactifs.',
      'analytics.plannedFeatures': 'Fonctionnalités Prévue',
      'analytics.plannedFeaturesDescription': 'Notre tableau de bord analytique est en cours de développement et comportera des outils complets de visualisation des données pour vous aider à mieux comprendre les tendances de représentation du Sénat.',
      'analytics.feature.geographic': 'Distribution Géographique',
      'analytics.feature.demographics': 'Analyse Démographique',
      'analytics.feature.composition': 'Composition du Sénat',
      'analytics.feature.trends': 'Tendances Historiques'
    },
    ln: {
      // Navigation
      'nav.navigation': 'Navigation',
      'nav.map': 'Karte',
      'nav.analytics': 'Makanisi',
      'nav.constitution': 'Mobeko',
      'nav.news': 'Nsango',
      'nav.explore': 'Kotala',
      'nav.chat': 'Kosolola',
      'nav.profile': 'Profil',
      'nav.discover': 'Kubuka',
      // Language switcher
      'language.select': 'Lokota',

      // Sidebar
      'sidebar.senators': 'Ba Senateur',
      'sidebar.filterPlaceholder': 'Luka Ba Senateur',
      'sidebar.senatorsFound': 'ba senateur ezwami',
      'sidebar.noResults': 'Senateur moko te ezwami na boluki na yo.',
      'sidebar.sortBy': 'Bongisa na',
      'sidebar.sortName': 'Nkombo',
      'sidebar.sortProvince': 'Etuka',
      'sidebar.sortParty': 'Parti',
      'sidebar.sortAsc': 'A-Z',
      'sidebar.sortDesc': 'Z-A',

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
      'map.senateConnections': 'Bokutani ya Sénat',
      'map.senatorsPerProvince': 'Ba Senateur na Etuka',

      // Map header banner
      'map.banner.title': 'Karte ya Sénat RDC',
      'map.banner.subtitle': 'Tala bisika ya bawuti ya ba senateur ya République Démocratique ya Congo. Finá etuka moko mpo omona ba représentant na yango.',
      'map.banner.lastUpdated': 'Mise à jour ya suka',
      'map.banner.source': 'Esika ya nsango',
      'map.banner.officialGazette': 'Journal Officiel',

      // Map description
      'map.description.voiceMatters': 'Etuka nyonso ezali na mongongo na Sénat, mpe mongongo nyonso ezali na ntina.',
      'map.description.interactiveGuide': 'Karte oyo ya interaction ekopesa yo nzela ya koyeba nani azali ko représenter etuka na yo na chambre ya likolo ya Parlement. Soki otié cursor na likolo ya etuka moko, okoki komona mbala moko ba sénateurs oyo baponami na région wana. Soki ofiní etuka moko, okozwa ba détails mingi na ntina ya sénateur moko na moko, parti politique na ye, mpe mosala oyo asalaka na ba décisions ya ekolo.',
      'map.description.platformGoal': 'Mokano ya plateforme oyo ezali ya kopusana Sénat na bato. Ekosalisa yo kososola ndenge représentation ekabwani na République Démocratique ya Congo mobimba, mpe ekolakisa boyokani kati ya ba communautés ya mboka mpe ba institutions ya ekolo oyo elobelaka na kombo na bango. Na kosala ba informations oyo ezala accessible, tozali kolendisa ba citoyens bázala na ba informations, bamema ba représentants na bango na responsabilité, mpe basangana na bomoi ya démocratie ya ekolo na biso.',

      // Feedback section
      'feedback.title': 'Mongongo Na Yo Ezali Na Ntina',
      'feedback.subtitle': 'Salisa biso tososola ndenge bato bamoni représentation na bango',
      'feedback.question': 'Okanisi ete etuka na yo ezali malamu na représentation na Sénat?',
      'feedback.participate': 'Sangana na Botuni',
      'feedback.resultsPreview': 'Makanisi ya Lisanga:',
      'feedback.wellRepresented': 'Malamu na Représentation',
      'feedback.poorly': 'Esengeli Kobongisa',
      'feedback.unsure': 'Nayebi Te',
      'feedback.pollTitle': 'Botuni ya Représentation na Sénat',
      'feedback.pollDescription': 'Makanisi na yo oyo emonani te ekosalisa biso tososola makanisi ya bato na ntina ya représentation ya sénat na République Démocratique ya Congo mobimba.',
      'feedback.selectProvince': 'Pona etuka na yo:',
      'feedback.chooseProvince': 'Pona etuka na yo...',
      'feedback.yes': 'Iyo, malamu na représentation',
      'feedback.no': 'Te, esengeli kobongisa',
      'feedback.currentResults': 'Ba résultats ya lelo mpo na',
      'feedback.totalVotes': 'Motango ya ba vote',
      'feedback.submit': 'Tinda Vote',
      'feedback.thankYou': 'Merci mpo na makanisi na yo!',
      'feedback.successMessage': 'Mongongo na yo ekomemi mpe ekosalisa mpo na kobongisa représentation ya démocratie.',

       // Tooltip
       'tooltip.senators': 'Ba Senateur',

      // Profile card
      'profile.distance': 'Mokano',
      'profile.rating': 'Kopesa motuya',
      'profile.today': 'LELO',

      // About section
      'about.description': 'Biso tosalaki plateforme oyo mpo na kosala ete basango ya Sénat ya RDC ekoma pe koyeba na polele, mpe ekobenda bato, ba journaliste pe ba chercheur. Mokano na biso ezali ya kolendisa bopesi nzela pe bosangani ya bato na makambo ya ekolo.',
      'about.cta': 'Makambo ya Mosala Oyo',

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
      'constitution.statistics.femalePercentage': 'Basi %',

      // News section
      'news.title': 'Ba Nsango ya Suka ya RDC',
      'news.subtitle': 'Zala na sango ya makambu ya sika ya République Démocratique ya Congo',
      'news.loading': 'Ezali ko charger ba nsango ya suka...',
      'news.error': 'Tokoki kozwa nsango te na ntango oyo. Meka lisusu sima.',
      'news.readMore': 'Tanga Mingi',
      'news.source': 'Esika ya nsango',
      'news.publishedOn': 'Ebimaki na',
      'news.noNews': 'Nsango moko te ezali na ntango oyo.',
      'news.refresh': 'Sika Ba Nsango',
      'news.categories.all': 'Nsango Nyonso',
      'news.categories.politics': 'Politiki',
      'news.categories.economy': 'Nkita',
      'news.categories.security': 'Bokengi',
      'news.categories.society': 'Lisanga',
      'news.timeAgo.minutes': 'minutes eleki',
      'news.timeAgo.hours': 'bangonga eleki',
      'news.timeAgo.days': 'mikolo eleki',
      'news.timeAgo.justNow': 'Sikoyo',

      // Analytics section
      'analytics.title': 'Etando ya Makanisi',
      'analytics.subtitle': 'Makanisi ya statistiques mpe botali ya ba donné mpo na représentation ya Sénat',
      'analytics.comingSoon': 'Ekoya Kala Mingi Te',
      'analytics.comingSoonDescription': 'Misala ya kosalela makanisi ya ba donné mpe botali ezali na kati ya bosalemi. Zala na boyokani mpo na koyeba makambo ya représentation ya Sénat, makanisi ya démographie mpe ba graphique ya interaction.',
      'analytics.plannedFeatures': 'Makanisi oyo Ezali Kokoma',
      'analytics.plannedFeaturesDescription': 'Etando na makanisi ezali na ngala mpe ekozala na boutil ya kosala ba graphique mpona kosalisa yo koyeba malamu bizaleli ya Sénat.',
      'analytics.feature.geographic': 'Bisika ya Geographique',
      'analytics.feature.demographics': 'Analyses ya Demographie',
      'analytics.feature.composition': 'Bokomisa ya Sénat',
      'analytics.feature.trends': 'Mizala ya Kala'
    },
    sw: {
      // Navigation
      'nav.navigation': 'Urambazaji',
      'nav.map': 'Ramani',
      'nav.analytics': 'Uchambuzi',
      'nav.constitution': 'Katiba',
      'nav.news': 'Habari',
      'nav.explore': 'Chunguza',
      'nav.chat': 'Ongea',
      'nav.profile': 'Wasifu',
      'nav.discover': 'Kuchunguza',
      // Language switcher
      'language.select': 'Lugha',

      // Sidebar
      'sidebar.senators': 'Maseneta',
      'sidebar.filterPlaceholder': 'Tafuta Maseneta',
      'sidebar.senatorsFound': 'maseneta wamepatikana',
      'sidebar.noResults': 'Hakuna seneta aliyepatikana kulingana na utafutaji wako.',
      'sidebar.sortBy': 'Panga kwa',
      'sidebar.sortName': 'Jina',
      'sidebar.sortProvince': 'Mkoa',
      'sidebar.sortParty': 'Chama',
      'sidebar.sortAsc': 'A-Z',
      'sidebar.sortDesc': 'Z-A',

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
      'map.senateConnections': 'Miunganiko ya Seneti',
      'map.senatorsPerProvince': 'Maseneta kwa Mkoa',

      // Map header banner
      'map.banner.title': 'Ramani ya Seneti RDC',
      'map.banner.subtitle': 'Chunguza mahali ambapo maseneta wa Jamhuri ya Kidemokrasia ya Kongo wanatoka. Bonyeza jimbo ili kuona wawakilishi wake.',
      'map.banner.lastUpdated': 'Ilisasishwa mwisho',
      'map.banner.source': 'Chanzo',
      'map.banner.officialGazette': 'Gazeti Rasmi',

      // Map description
      'map.description.voiceMatters': 'Kila jimbo lina sauti katika Seneti, na kila sauti ni muhimu.',
      'map.description.interactiveGuide': 'Ramani hii ya maingiliano inakuruhusu kugundua ni nani anayewakilisha jimbo lako katika chumba cha juu cha Bunge. Kwa kuweka kipanya juu ya jimbo, unaweza kuona mara moja maseneta waliochaguliwa kutoka eneo hilo. Kubonyeza jimbo kunaonyesha maelezo zaidi kuhusu kila seneta, ushirikiano wake wa kisiasa, na jukumu analolicheza katika maamuzi ya kitaifa.',
      'map.description.platformGoal': 'Lengo la jukwaa hili ni kuikaribisha Seneti kwa watu. Inakusaidia kuelewa jinsi uwakilishi umegawanywa katika Jamhuri ya Kidemokrasia ya Kongo, na inaangazia uhusiano kati ya jamii za mitaa na taasisi za kitaifa zinazozungumza kwa niaba yao. Kwa kufanya habari hii ipatikane, tunahimiza raia kubaki na habari, kuwashika wawakilishi wao wajibu, na kushiriki kikamilifu katika maisha ya kidemokrasia ya nchi yetu.',

      // Feedback section
      'feedback.title': 'Sauti Yako Ni Muhimu',
      'feedback.subtitle': 'Tusaidie kuelewa jinsi raia wanavyoona uwakilishi wao',
      'feedback.question': 'Je, unafikiri jimbo lako linawakilishwa vizuri katika Seneti?',
      'feedback.participate': 'Shiriki katika Uchunguzi',
      'feedback.resultsPreview': 'Maoni ya Jamii:',
      'feedback.wellRepresented': 'Imewakilishwa Vizuri',
      'feedback.poorly': 'Inahitaji Kuboresha',
      'feedback.unsure': 'Sijui',
      'feedback.pollTitle': 'Uchunguzi wa Uwakilishi wa Seneti',
      'feedback.pollDescription': 'Maoni yako ya faragha yanasaidia kuelewa maoni ya umma kuhusu uwakilishi wa seneti katika Jamhuri ya Kidemokrasia ya Kongo.',
      'feedback.selectProvince': 'Chagua jimbo lako:',
      'feedback.chooseProvince': 'Chagua jimbo lako...',
      'feedback.yes': 'Ndio, imewakilishwa vizuri',
      'feedback.no': 'Hapana, inahitaji kuboresha',
      'feedback.currentResults': 'Matokeo ya sasa kwa',
      'feedback.totalVotes': 'Jumla ya kura',
      'feedback.submit': 'Wasilisha Kura',
      'feedback.thankYou': 'Asante kwa maoni yako!',
      'feedback.successMessage': 'Sauti yako imerekodiwa na itasaidia kuboresha uwakilishi wa kidemokrasia.',

      // Tooltip
      'tooltip.senators': 'Maseneta',

      // Profile card
      'profile.distance': 'Umbali',
      'profile.rating': 'Ukadiriaji',
      'profile.today': 'LEO',

      // About section
      'about.description': 'Jukwaa hili liliundwa ili kufanya habari kuhusu Seneti ya DRC iwe inaweza kufikika zaidi, uwazi, na kuvutia kwa raia, waandishi wa habari, na watafiti. Lengo letu ni kuimarisha uwajibikaji na ushiriki wa kiraia.',
      'about.cta': 'Kuhusu Mradi Huu',

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
      'constitution.statistics.femalePercentage': 'Wanawake %',

      // News section
      'news.title': 'Habari za Hivi Karibuni kutoka DRC',
      'news.subtitle': 'Fuata maendeleo ya hivi karibuni katika Jamhuri ya Kidemokrasia ya Kongo',
      'news.loading': 'Inapakia habari za hivi karibuni...',
      'news.error': 'Haiwezi kupakia habari kwa sasa. Tafadhali jaribu tena baadaye.',
      'news.readMore': 'Soma Zaidi',
      'news.source': 'Chanzo',
      'news.publishedOn': 'Imechapishwa mnamo',
      'news.noNews': 'Hakuna habari zinazopatikana kwa sasa.',
      'news.refresh': 'Ongeza Habari',
      'news.categories.all': 'Habari Zote',
      'news.categories.politics': 'Siasa',
      'news.categories.economy': 'Uchumi',
      'news.categories.security': 'Usalama',
      'news.categories.society': 'Jamii',
      'news.timeAgo.minutes': 'dakika zilizopita',
      'news.timeAgo.hours': 'masaa yaliyopita',
      'news.timeAgo.days': 'siku zilizopita',
      'news.timeAgo.justNow': 'Sasa hivi',

      // Analytics section
      'analytics.title': 'Dashibodi ya Uchambuzi',
      'analytics.subtitle': 'Ufahamu wa kihesabati na uonyeshaji wa data wa uwakilishi wa Seneti',
      'analytics.comingSoon': 'Inakuja Hivi Karibuni',
      'analytics.comingSoonDescription': 'Vipengele vya juu vya uchambuzi na uonyeshaji wa data viko katika maendeleo. Endelea kutufuatilia kwa ufahamu wa kina kuhusu mifano ya uwakilishi wa Seneti, uchambuzi wa demografia, na chati za mwingiliano.',
      'analytics.plannedFeatures': 'Vipengele Vilivyopangwa',
      'analytics.plannedFeaturesDescription': 'Dashibodi yetu ya uchambuzi iko katika maendeleo na itakuwa na zana za uonyeshaji wa data kwa kusaidia kuelewa vizuri mifano ya uwakilishi wa Seneti.',
      'analytics.feature.geographic': 'Usambazaji wa Kijiografia',
      'analytics.feature.demographics': 'Uchambuzi wa Demografia',
      'analytics.feature.composition': 'Uundaji wa Seneti',
      'analytics.feature.trends': 'Mwelekeo wa Kihistoria'
    },
    lu: {
      // Navigation
      'nav.navigation': 'Butambui',
      'nav.map': 'Karte',
      'nav.analytics': 'Butungulushi',
      'nav.constitution': 'Mubengele',
      'nav.news': 'Makosa',
      'nav.explore': 'Tala',
      'nav.chat': 'Kulungakanya',
      'nav.profile': 'Bualu',
      'nav.discover': 'Tala',
      // Language switcher
      'language.select': 'Luloba',

      // Sidebar
      'sidebar.senators': 'Bantu ba Senateur',
      'sidebar.filterPlaceholder': 'Loza Bantu ba Senateur',
      'sidebar.senatorsFound': 'bantu ba senateur basangile',
      'sidebar.noResults': 'Kantu ka senateur kasangile wa ku bulozebuo.',
      'sidebar.sortBy': 'Butondi kuya na',
      'sidebar.sortName': 'Dina',
      'sidebar.sortProvince': 'Tshimbila',
      'sidebar.sortParty': 'Mukanda',
      'sidebar.sortAsc': 'A-Z',
      'sidebar.sortDesc': 'Z-A',

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
      'map.senateConnections': 'Bukutanji bua Senat',
      'map.senatorsPerProvince': 'Bantu ba Senateur ne Tshimbila',

      // Map header banner
      'map.banner.title': 'Karte wa Senat RDC',
      'map.banner.subtitle': 'Mona kudipu bantu ba senateur ba Republiki Democratiki wa Kongo bakutuka. Kanya tshimbila umone bantu bayi badi bakulengela.',
      'map.banner.lastUpdated': 'Kusasisha kwa maisha',
      'map.banner.source': 'Kisebeleshe',
      'map.banner.officialGazette': 'Bulebule bwa Mfumu',

      // Map description
      'map.description.voiceMatters': 'Tshimbila tshimu tshimu tshine dibanza mu Senat, ne dibanza dimu dimu dine bukaya.',
      'map.description.interactiveGuide': 'Karte uyu wa kusangana ukupela nzela ya kumanya nani ukurepresenter tshimbila yaku mu nzo ya likolo ya Parlement. Soki utia cursor pa likolo ya tshimbila, ukumona mbala moya bantu ba sénateurs baponiami mu région ina. Soki ukanya tshimbila, ukozwa ba détails bingi pa ntina ya sénateur moya moya, parti politique yabo, ne musalu baukosala mu ba décisions ya lukalu.',
      'map.description.platformGoal': 'Mukanu wa plateforme uyu udi wa kupusana Senat ne bantu. Ukusalidisha kumanya ndenge représentation ikabwani mu Republiki Democratiki wa Kongo yonso, ne ukulakisha boyokani kati ya ba communautés ya mboka ne ba institutions ya lukalu bikulobela mu nkombo yabo. Mu kosala ba informations uyu bizala accessible, tukukolendisha ba citoyens bazala na ba informations, bamema ba représentants babo na responsabilité, ne basangana na bomoi ya démocratie ya lukalu wetu.',

      // Feedback section
      'feedback.title': 'Dibanza Diobe Dine Bukaya',
      'feedback.subtitle': 'Tusalishe tushikile ndenge bantu bamona représentation yabo',
      'feedback.question': 'Unakanisha dina tshimbila yobe irepresenter bua mu Senat?',
      'feedback.participate': 'Sangana ne Tubotuna',
      'feedback.resultsPreview': 'Makanishi ya Bantu:',
      'feedback.wellRepresented': 'Irepresenter Bua',
      'feedback.poorly': 'Ifwaya Kubongisha',
      'feedback.unsure': 'Nshimanya Katu',
      'feedback.pollTitle': 'Tubotuna wa Représentation wa Senat',
      'feedback.pollDescription': 'Makanishi yobe asona buya ukusalidisha tushikile makanishi ya bantu pa ntina ya représentation ya senat mu Republiki Democratiki wa Kongo yonso.',
      'feedback.selectProvince': 'Pona tshimbila yobe:',
      'feedback.chooseProvince': 'Pona tshimbila yobe...',
      'feedback.yes': 'Iyo, irepresenter bua',
      'feedback.no': 'Katu, ifwaya kubongisha',
      'feedback.currentResults': 'Ba résultats ya lelu bu',
      'feedback.totalVotes': 'Motango wa ba vote',
      'feedback.submit': 'Tuma Vote',
      'feedback.thankYou': 'Tusakidila ku makanishi yobe!',
      'feedback.successMessage': 'Dibanza diobe dikomiwedi ne dikusalidisha kubongisha représentation ya démocratie.',

       // Tooltip
       'tooltip.senators': 'Bantu ba Senateur',

      // Profile card
      'profile.distance': 'Bulele',
      'profile.rating': 'Bukaya',
      'profile.today': 'LELU',

      // About section
      'about.description': 'Tukusambenyu uyu tusambile kwamba makenga ma Senateur wa DRC makale kwavanga bantu, bantu ba bulebule ne bantu ba kulonga. Mukanu wetu udi kwesha bumfumu ne kusangana kwa bantu mu makambo ya lukalu.',
      'about.cta': 'Makambo ya Musebele Uyu',

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
      'constitution.statistics.femalePercentage': 'Bana bakaji %',

      // News section
      'news.title': 'Makosa ma Shambu ma RDC',
      'news.subtitle': 'Mona makosa ma shambu ma Republiki Democratiki wa Kongo',
      'news.loading': 'Ulatamba makosa ma shambu...',
      'news.error': 'Katukuila kupata makosa lelu. Kanyi bushiku.',
      'news.readMore': 'Tanga Kamupi',
      'news.source': 'Kisebeleshe',
      'news.publishedOn': 'Kasebelele ku',
      'news.noNews': 'Makosa mankaka ko ma shambu.',
      'news.refresh': 'Sansanua Makosa',
      'news.categories.all': 'Makosa Monso',
      'news.categories.politics': 'Bukuluampata',
      'news.categories.economy': 'Buchinshi',
      'news.categories.security': 'Bululungu',
      'news.categories.society': 'Bukole',
      'news.timeAgo.minutes': 'miniti yisenga',
      'news.timeAgo.hours': 'masaa asenga',
      'news.timeAgo.days': 'maloba asenga',
      'news.timeAgo.justNow': 'Lelu kashesa',

      // Analytics section
      'analytics.title': 'Butungulushi bua Dikanda',
      'analytics.subtitle': 'Ufahamu wa kihesabati ne koyekola kati ya data mpo na koyekola kati ya bato ba Senat',
      'analytics.comingSoon': 'Ebandeli Kala Mingi Te',
      'analytics.comingSoonDescription': 'Vipengele vya juu vya uchambuzi na uonyeshaji wa data viko katika maendeleo. Endelea kutufuatilia kwa ufahamu wa kina kuhusu mifano ya uwakilishi wa Seneti, uchambuzi wa demografia, na chati za mwingiliano.',
      'analytics.plannedFeatures': 'Mikanda eye Ebandeli',
      'analytics.plannedFeaturesDescription': 'Butungulushi bua dikanda bunoza kala mpe ekozala na bokonzi milai mpona kosalisa yo koyeba malamu bizaleli ya Sénat.',
      'analytics.feature.geographic': 'Bisika ya Geographie',
      'analytics.feature.demographics': 'Analyses ya Demographie',
      'analytics.feature.composition': 'Bokomisa ya Sénat',
      'analytics.feature.trends': 'Mizala ya Kala'
    },
    kg: {
      // Navigation
      'nav.navigation': 'Kuvanga',
      'nav.map': 'Kata',
      'nav.analytics': 'Kusoluka',
      'nav.constitution': 'Kimbangelo',
      'nav.news': 'Madisa',
      'nav.explore': 'Tala',
      'nav.chat': 'Tuba',
      'nav.profile': 'Lukanu',
      'nav.discover': 'Tala',
      // Language switcher
      'language.select': 'Kidimbu',

      // Sidebar
      'sidebar.senators': 'Bantu ba Senateur',
      'sidebar.filterPlaceholder': 'Tomba Bantu ba Senateur',
      'sidebar.senatorsFound': 'bantu ba senateur bakuzolele',
      'sidebar.noResults': 'Muntu mosi ko senateur uzolele ko na nzela eno.',
      'sidebar.sortBy': 'Songa ye',
      'sidebar.sortName': 'Nkumbu',
      'sidebar.sortProvince': 'Intinu',
      'sidebar.sortParty': 'Kinkutu',
      'sidebar.sortAsc': 'A-Z',
      'sidebar.sortDesc': 'Z-A',

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
      'map.senateConnections': 'Bukutani bua Senat',
      'map.senatorsPerProvince': 'Bantu ba Senateur ku Intinu',

      // Map header banner
      'map.banner.title': 'Kata ya Senat RDC',
      'map.banner.subtitle': 'Tala kufikila bantu ba senateur ba Republiki Demokratiki ya Kongo bakuyuta. Kanya intinu umona bantu bayi badi bakuyekula.',
      'map.banner.lastUpdated': 'Kusikisa kwa ntoma',
      'map.banner.source': 'Ntoto ya madisa',
      'map.banner.officialGazette': 'Buku ya Mfumu',

      // Map description
      'map.description.voiceMatters': 'Intinu yonso yina dibanza mu Senat, ye dibanza dyonso dina nkwa.',
      'map.description.interactiveGuide': 'Kata yayi ya kusangana ikuvana nzela ya koyeba nani azali korepresenter intinu yaku mu nzo ya likolo ya Parlement. Soki otia cursor na likolo ya intinu, okoki komona mbala moko ba senateur baponiami na région ina. Soki okanda intinu, okozwa ba détails mingi na ntina ya senateur moko na moko, parti politique na ye, mpe mosala asalaka na ba décisions ya nsi.',
      'map.description.platformGoal': 'Mukanu wa plateforme yayi udi wa kopusana Senat na batu. Ukosalisa yo kososola ndenge représentation ikabwani na Republiki Demokratiki ya Kongo yonso, mpe ukolakisa boyokani kati ya ba communautés ya mboka mpe ba institutions ya nsi oyo ilobelaka na nkumbu yabo. Na kosala ba informations yayi izala accessible, tozali kolendisa ba citoyens bazala na ba informations, bamema ba représentants na bango na responsabilité, mpe basangana na bomoi ya démocratie ya nsi na biso.',

      // Tooltip
      'tooltip.senators': 'Bantu ba Senateur',

      // Profile card
      'profile.distance': 'Umpata',
      'profile.rating': 'Kutaila',
      'profile.today': 'LELU',

      // Feedback section
      'feedback.title': 'Makinua maku mazali lokwa?',
      'feedback.question': 'Okanisi intinu yaku inalakisami malamu?',
      'feedback.button': 'Pesa makinua',
      'feedback.modalTitle': 'Omenga intinu mpe pesa makinua',
      'feedback.selectProvince': 'Menga intinu',
      'feedback.chooseProvince': 'Menga intinu...',
      'feedback.response': 'Makinua maku:',
      'feedback.yes': 'Iyo, inalakisami malamu',
      'feedback.no': 'Te, ezali na mikakatano',
      'feedback.neutral': 'Nazali na ndai te',
      'feedback.submitButton': 'Tinda makinua',
      'feedback.cancelButton': 'Longola',
      'feedback.thankYou': 'Asante mingi mpo na makinua maku!',
      'feedback.results': 'Mayano ma makinua:',
      'feedback.positiveVotes': 'Maponi ma malamu',
      'feedback.negativeVotes': 'Maponi ma mabe',
      'feedback.neutralVotes': 'Maponi ya kati',
      'feedback.alreadyVoted': 'Oponi kala mpo na intinu yayi',

      // About section
      'about.description': 'Tukuvangu uyu tuvangile kwamba makambo ma Senateur wa RDC makale kwavanga bantu, bantu ba nkanda ne bantu ba kulonda. Mukanu wetu udi kwikisa bumfumu ne kusangana kwa bantu mu makambo ya lukalu.',
      'about.cta': 'Makambo ya Nkenda Uyu',

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
      'constitution.statistics.femalePercentage': 'Bakento %',

      // News section
      'news.title': 'Madisa ma Yambu ma RDC',
      'news.subtitle': 'Mona madisa ma yambu ma Republiki Demokratiki ya Kongo',
      'news.loading': 'Kulanda madisa ma yambu...',
      'news.error': 'Kukoki ko kuwana madisa lelu. Meka kavutu.',
      'news.readMore': 'Tanga Mingi',
      'news.source': 'Ntoto ya madisa',
      'news.publishedOn': 'Matanga ku',
      'news.noNews': 'Madisa mankaka ko ma yambu.',
      'news.refresh': 'Vutuka Madisa',
      'news.categories.all': 'Madisa Monso',
      'news.categories.politics': 'Kimfumu',
      'news.categories.economy': 'Kinene',
      'news.categories.security': 'Kikeba',
      'news.categories.society': 'Kikanda',
      'news.timeAgo.minutes': 'miniti yavutuka',
      'news.timeAgo.hours': 'mawa mavutuka',
      'news.timeAgo.days': 'malumbu mavutuka',
      'news.timeAgo.justNow': 'Lelu yayuma',

      // Analytics section
      'analytics.title': 'Dikanda dia Kusoluka',
      'analytics.subtitle': 'Ufahamu wa kihesabati ne koyekola kati ya data mpo na koyekola kati ya bato ba Senat',
      'analytics.comingSoon': 'Ebandeli Kala Mingi Te',
      'analytics.comingSoonDescription': 'Vipengele vya juu vya uchambuzi na uonyeshaji wa data viko katika maendeleo. Endelea kutufuatilia kwa ufahamu wa kina kuhusu mifano ya uwakilishi wa Seneti, uchambuzi wa demografia, na chati za mwingiliano.',
      'analytics.plannedFeatures': 'Mikanda eye Ebandeli',
      'analytics.plannedFeaturesDescription': 'Dikanda dia kusoluka dia bunoza kala mpe ekozala na bokonzi milai mpona kosalisa yo koyeba malamu bizaleli ya Sénat.',
      'analytics.feature.geographic': 'Bisika ya Geographie',
      'analytics.feature.demographics': 'Analyses ya Demographie',
      'analytics.feature.composition': 'Bokomisa ya Sénat',
      'analytics.feature.trends': 'Mizala ya Kala'
    }
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

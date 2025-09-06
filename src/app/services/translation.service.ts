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
      'nav.participateInPoll': 'Participate in Poll',
      'nav.poll': 'Poll',
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

      // Constitution procedures
      'constitution.procedures.title': 'Parliamentary Procedures',
      'constitution.procedures.article105': 'Article 105',
      'constitution.procedures.content105': 'The sessions of the Senate are public. However, the Senate may sit in camera at the request of the President of the Republic, the Prime Minister, or one-tenth of its members.',
      'constitution.procedures.article106': 'Article 106',
      'constitution.procedures.content106': 'The Senate can only deliberate when at least half of its members are present. Its decisions are taken by simple majority of the votes cast.',
      'constitution.procedures.article107': 'Article 107',
      'constitution.procedures.content107': 'In case of a tie, the President of the Senate has the casting vote.',

      // Constitution legislative process
      'constitution.legislative.title': 'Legislative Process',
      'constitution.legislative.article108': 'Article 108',
      'constitution.legislative.content108': 'Bills and proposed laws are submitted to either the National Assembly or the Senate.',
      'constitution.legislative.article109': 'Article 109',
      'constitution.legislative.content109': 'Every bill or proposed law is successively examined by the two chambers of Parliament.',
      'constitution.legislative.article110': 'Article 110',
      'constitution.legislative.content110': 'A law is definitively adopted when it has been voted in identical terms by the National Assembly and the Senate.',

      // Constitution specific powers
      'constitution.specificPowers.title': 'Senate Specific Powers',
      'constitution.specificPowers.article111': 'Article 111',
      'constitution.specificPowers.content111': 'The Senate has exclusive jurisdiction to try the President of the Republic for high treason and members of the Government for crimes committed in the exercise of their functions.',
      'constitution.specificPowers.article112': 'Article 112',
      'constitution.specificPowers.content112': 'The Senate gives its opinion on appointments to high positions in the administration, diplomatic missions, and public enterprises as provided by law.',
      'constitution.specificPowers.article113': 'Article 113',
      'constitution.specificPowers.content113': 'The Senate ensures the representation of territorial entities and defends their interests.',

      // Constitution immunity
      'constitution.immunity.title': 'Parliamentary Immunity',
      'constitution.immunity.article114': 'Article 114',
      'constitution.immunity.content114': 'No senator may be prosecuted, sought, arrested, detained or tried for opinions or votes expressed by him in the exercise of his functions.',
      'constitution.immunity.article115': 'Article 115',
      'constitution.immunity.content115': 'Outside parliamentary sessions, no senator may be arrested except in the case of flagrant offence or pursuant to a final judicial decision.',
      'constitution.immunity.article116': 'Article 116',
      'constitution.immunity.content116': 'During parliamentary sessions, no senator may be arrested or prosecuted without the prior authorization of the Senate.',

      // Constitution navigation
      'constitution.nav.senateArticles': 'Senate Articles',
      'constitution.nav.fullConstitution': 'Full Constitution (1-229)',
      'constitution.search.placeholder': 'Search articles...',
      'constitution.search.articlesFound': 'articles found',
      'constitution.article': 'Article',
      'constitution.chapter': 'Chapter',
      'constitution.fullText.note': 'This is the complete text of the Constitution of the Democratic Republic of Congo, adopted in 2011.',

      // Constitution chapters
      'constitution.chapters.generalProvisions': 'General Provisions',
      'constitution.chapters.rightsAndDuties': 'Rights and Duties of the Person and the Citizen',
      'constitution.chapters.stateOrganization': 'Organization and Functioning of the State',
      'constitution.chapters.executivePower': 'Executive Power',
      'constitution.chapters.nationalAssembly': 'The National Assembly',
      'constitution.chapters.parliamentGovernment': 'Relations between Parliament and Government',
      'constitution.chapters.senate': 'The Senate',
      'constitution.chapters.provinces': 'Provinces',
      'constitution.chapters.judicialPower': 'Judicial Power',
      'constitution.chapters.constitutionalCourt': 'The Constitutional Court',
      'constitution.chapters.independentInstitutions': 'Independent National Institutions',
      'constitution.chapters.revision': 'Revision of the Constitution',
      'constitution.chapters.finalProvisions': 'Final and Transitional Provisions',

      // Constitution articles (key articles)
      'constitution.articles.article1': 'The Democratic Republic of Congo is a sovereign, independent, united and indivisible, social, democratic and secular State.',
      'constitution.articles.article2': 'The Democratic Republic of Congo is composed of the city of Kinshasa and twenty-five provinces endowed with juridical personality.',
      'constitution.articles.article3': 'The provinces and the city of Kinshasa are the decentralized territorial entities of the Republic.',
      'constitution.articles.article4': 'The national sovereignty belongs to the people. All power emanates from the people who exercise it directly by referendum or through their representatives elected by universal suffrage.',
      'constitution.articles.article5': 'The political regime of the Democratic Republic of Congo is that of a democratic republic based on the rule of law.',
      'constitution.articles.article6': 'The national languages of Congo are Kikongo, Lingala, Swahili and Tshiluba. The official language is French.',
      'constitution.articles.article7': 'The national emblem is the flag composed of a blue background crossed diagonally by a red strip bordered by two yellow strips.',
      'constitution.articles.article8': 'The arms of the Democratic Republic of Congo consist of a leopard\'s head in gold, flanked on the left by an elephant\'s tusk and on the right by a spear.',
      'constitution.articles.article9': 'The person is sacred. The State has the obligation to respect and protect it.',
      'constitution.articles.article10': 'Every individual has the right to life, physical integrity and free development of his personality while respecting the law, public order, the rights of others and public morality.',
      'constitution.articles.article11': 'All human beings are born free and equal in dignity and rights.',
      'constitution.articles.article12': 'All Congolese are equal before the law and have the right to equal protection from the law.',
      'constitution.articles.article13': 'No Congolese may, in matters of education and access to public functions or to any other matter, be the object of discriminatory measures.',
      'constitution.articles.article14': 'The public authorities ensure the elimination of all forms of discrimination against women and ensure the protection and promotion of their rights.',
      'constitution.articles.article15': 'The public authorities ensure the elimination of sexual violence used as a weapon of war and any other form of sexual violence.',
      'constitution.articles.article16': 'Marriage is the union of one man and one woman legitimized by law. It shall be based on the free consent of the spouses.',
      'constitution.articles.article17': 'The family is the basic unit of the human community. It shall be protected by the State.',
      'constitution.articles.article18': 'Children are the subject of special measures of protection. They have the right to special assistance.',
      'constitution.articles.article19': 'The State ensures the child with protection against all forms of violence, physical or mental injury, abandonment or neglect, ill-treatment or exploitation.',
      'constitution.articles.article20': 'Every citizen has the right to Congolese nationality. No Congolese may be deprived of his nationality.',
      'constitution.articles.article21': 'Any person has the right to leave the territory of the Republic and to return.',
      'constitution.articles.article22': 'Everyone has the right to freedom of opinion, conscience, religion, worship and belief.',
      'constitution.articles.article23': 'Everyone has the right to freedom of expression. This right implies freedom to express one\'s opinions or beliefs, individually or collectively, orally, in writing, through the image or by any other means of communication.',
      'constitution.articles.article24': 'Everyone has the right to information and to freedom of the press. This right implies freedom of the press, freedom to information and the right to information.',
      'constitution.articles.article25': 'Everyone has the right to freedom of peaceful assembly and demonstration.',
      'constitution.articles.article26': 'Everyone has the right to freedom of association. No one may be compelled to belong to an association.',
      'constitution.articles.article27': 'Every Congolese has the right to establish political parties and to join the political party of his choice.',
      'constitution.articles.article28': 'Every citizen has the right to initiate proceedings before the competent jurisdictions against acts which violate his fundamental rights.',
      'constitution.articles.article29': 'Everyone has the right to a fair trial which comprises: the right to be tried within reasonable time by a competent, independent and impartial court.',
      'constitution.articles.article30': 'Everyone accused of an offense is presumed innocent until his guilt is established by a final judgment.',
      'constitution.articles.article31': 'No one may be condemned for actions or omissions which, at the time they were committed, did not constitute an offense under national or international law.',
      'constitution.articles.article32': 'No one may be arbitrarily arrested or detained. Any person arrested must be immediately informed of the charges against him.',
      'constitution.articles.article33': 'Any person deprived of his liberty has the right to be treated with humanity and with respect for the inherent dignity of the human person.',
      'constitution.articles.article34': 'Everyone has the right to the inviolability of domicile. The domicile is inviolable.',
      'constitution.articles.article35': 'Everyone has the right to the secrecy of correspondence and of communications.',
      'constitution.articles.article36': 'Everyone has the right to work and to free choice of employment.',
      'constitution.articles.article37': 'Everyone has the right to rest and leisure.',
      'constitution.articles.article38': 'Everyone has the right to health care.',
      'constitution.articles.article39': 'Everyone has the right to food security.',
      'constitution.articles.article40': 'Everyone has the right to housing.',
      'constitution.articles.article41': 'Everyone has the right to water.',
      'constitution.articles.article42': 'Everyone has the right to education.',
      'constitution.articles.article43': 'Primary education is compulsory and free in public institutions.',
      'constitution.articles.article44': 'Everyone has the right to enjoy the arts and to participate freely in the cultural life of the community.',
      'constitution.articles.article45': 'Everyone has the right to a healthy environment favorable to his development.',
      'constitution.articles.article46': 'Everyone has the right to property.',
      'constitution.articles.article47': 'No one may be deprived of his property except for public utility and against fair and prior compensation.',
      'constitution.articles.article48': 'The right of inheritance is guaranteed.',
      'constitution.articles.article49': 'Every Congolese has the right to move and settle freely on the national territory.',
      'constitution.articles.article50': 'Every Congolese has the right and the duty to defend the country.',
      'constitution.articles.article60': 'Every person has duties towards the family, society, the State and the international community.',
      'constitution.articles.article61': 'Every Congolese has the duty to respect and consider his fellow beings without discrimination.',
      'constitution.articles.article62': 'Every Congolese has the duty to respect the Constitution, the laws and regulations of the Republic.',
      'constitution.articles.article63': 'Every Congolese has the duty to pay taxes and contributions in conformity with the law.',
      'constitution.articles.article64': 'Every Congolese has the duty to contribute to the safeguarding of public peace and national security.',
      'constitution.articles.article65': 'The State exercises its sovereignty on the national territory, in the airspace and in the territorial waters.',
      'constitution.articles.article66': 'The powers of the State are exercised by the President of the Republic, the Parliament, the Government and the Courts and Tribunals.',
      'constitution.articles.article67': 'The separation of the legislative, executive and judicial powers is assured.',
      'constitution.articles.article68': 'French is the official language of the Democratic Republic of Congo.',
      'constitution.articles.article69': 'The President of the Republic is the Head of State. He embodies the national unity.',
      'constitution.articles.article70': 'The President of the Republic is elected by universal suffrage for a term of five years renewable only once.',
      'constitution.articles.article71': 'No person may exercise more than two presidential terms.',
      'constitution.articles.article72': 'To be eligible for the office of President of the Republic, one must: be of Congolese origin, be at least 30 years of age.',
      'constitution.articles.article73': 'The President of the Republic is elected by an absolute majority of the validly cast votes.',
      'constitution.articles.article74': 'The President of the Republic takes office within fifteen days of the proclamation of the results of the presidential election.',
      'constitution.articles.article75': 'The President of the Republic is the guarantor of national independence, territorial integrity, and respect for treaties and accords.',
      'constitution.articles.article76': 'The President of the Republic ensures the proper functioning of public institutions and the continuity of the State.',
      'constitution.articles.article77': 'The President of the Republic is the Supreme Chief of the Armed Forces.',
      'constitution.articles.article78': 'The President of the Republic appoints the Prime Minister from the parliamentary majority.',
      'constitution.articles.article79': 'The President of the Republic dismisses the Prime Minister either on the latter\'s initiative or because of a motion of no confidence.',
      'constitution.articles.article80': 'The President of the Republic appoints and dismisses the other members of the Government upon proposal of the Prime Minister.',
      'constitution.articles.article81': 'The President of the Republic presides over the Council of Ministers.',
      'constitution.articles.article82': 'The President of the Republic signs decrees.',
      'constitution.articles.article83': 'The President of the Republic has the right of pardon.',
      'constitution.articles.article84': 'The President of the Republic accredits ambassadors and extraordinary envoys to foreign powers.',
      'constitution.articles.article85': 'The President of the Republic receives the letters of credence and recall of foreign diplomats.',
      'constitution.articles.article86': 'The President of the Republic negotiates and ratifies treaties.',
      'constitution.articles.article87': 'The President of the Republic may dissolve the National Assembly.',
      'constitution.articles.article88': 'The President of the Republic addresses messages to the nation.',
      'constitution.articles.article89': 'The President of the Republic may request Parliament to reexamine a law.',
      'constitution.articles.article90': 'The President of the Republic may, after consulting the Prime Minister and the Presidents of the two Chambers of Parliament, decide to submit any bill to referendum.',
      'constitution.articles.article91': 'When the institutions of the Republic, the independence of the nation or the integrity of the national territory is threatened, the President of the Republic may proclaim a state of emergency or a state of siege.',
      'constitution.articles.article92': 'The President of the Republic assumes his functions upon taking the oath before the Constitutional Court.',
      'constitution.articles.article93': 'The President of the Republic enjoys immunity from prosecution during his term of office.',
      'constitution.articles.article94': 'The President of the Republic can only be prosecuted for high treason before the Senate.',
      'constitution.articles.article95': 'In case of vacancy of the Presidency, the President of the Senate exercises the interim presidency.',
      'constitution.articles.article96': 'The Government is composed of the Prime Minister, the Deputy Prime Ministers, Ministers and Vice-Ministers.',
      'constitution.articles.article97': 'The Prime Minister is the head of government. He directs the action of the Government.',
      'constitution.articles.article117': 'Parliament exercises legislative power.',
      'constitution.articles.article118': 'The initiative for laws belongs concurrently to the Government and to each member of Parliament.',
      'constitution.articles.article119': 'Laws are voted by Parliament.',
      'constitution.articles.article120': 'The organic laws are those which the Constitution submits to this procedure.',
      'constitution.articles.article121': 'The National Assembly is composed of deputies elected by direct universal suffrage.',
      'constitution.articles.article122': 'The deputies are elected for a term of five years renewable.',
      'constitution.articles.article123': 'The National Assembly elects its President and other members of its Bureau.',
      'constitution.articles.article124': 'The National Assembly establishes its internal regulations.',
      'constitution.articles.article125': 'No deputy may be prosecuted for opinions or votes expressed in the exercise of his functions.',
      'constitution.articles.article130': 'The Government presents its program to the National Assembly.',
      'constitution.articles.article135': 'The budget law determines for each fiscal year the nature, amount and allocation of State resources and expenses.',
      'constitution.articles.article140': 'The National Assembly and Senate may form a commission of inquiry on any matter of public interest.',
      'constitution.articles.article145': 'The members of Parliament may address written questions to the Government.',
      'constitution.articles.article150': 'The Government may engage its responsibility before the National Assembly on its general policy.',
      'constitution.articles.article151': 'The provinces are the decentralized territorial entities endowed with juridical personality.',
      'constitution.articles.article152': 'The provinces exercise the competences reserved to them by the Constitution.',
      'constitution.articles.article153': 'The provinces have competence in all matters not reserved exclusively to the central authority.',
      'constitution.articles.article154': 'The provincial institutions are: the Provincial Assembly and the Provincial Government.',
      'constitution.articles.article155': 'The Provincial Assembly is composed of deputies elected by direct universal suffrage.',
      'constitution.articles.article156': 'The Provincial Assembly elects the Governor and Vice-Governor of the province.',
      'constitution.articles.article157': 'The Governor is the head of the provincial executive.',
      'constitution.articles.article158': 'The Governor is responsible before the Provincial Assembly.',
      'constitution.articles.article159': 'The provincial revenues come from taxes, fees and other contributions provided for by provincial law.',
      'constitution.articles.article160': 'The provinces receive transfers from the national budget.',
      'constitution.articles.article165': 'The territorial entities are endowed with juridical personality and are managed by local councils.',
      'constitution.articles.article170': 'The decentralized territorial entities have financial autonomy.',
      'constitution.articles.article175': 'The creation of provinces is decided by law.',
      'constitution.articles.article180': 'The boundaries of provinces can only be modified by organic law.',
      'constitution.articles.article181': 'The judicial power is independent of the legislative and executive powers.',
      'constitution.articles.article182': 'The judicial power is conferred on the courts and tribunals.',
      'constitution.articles.article183': 'Justice is rendered in the name of the Congolese people.',
      'constitution.articles.article184': 'The judges are independent in the exercise of their jurisdictional functions.',
      'constitution.articles.article185': 'The judges are subject only to the authority of the law.',
      'constitution.articles.article186': 'The judicial power includes the judiciary courts and tribunals, the administrative courts and tribunals, and the Constitutional Court.',
      'constitution.articles.article187': 'The Court of Cassation is the supreme court in judicial matters.',
      'constitution.articles.article188': 'The Council of State is the supreme court in administrative matters.',
      'constitution.articles.article189': 'The Superior Council of the Judiciary ensures the management of the judicial power.',
      'constitution.articles.article190': 'The Superior Council of the Judiciary is presided over by the President of the Republic.',
      'constitution.articles.article191': 'The Prosecutor General near the Court of Cassation represents the Public Ministry before this court.',
      'constitution.articles.article192': 'The President and Vice-President of the Court of Cassation are appointed by the President of the Republic.',
      'constitution.articles.article193': 'The judges of peace are elected by the local councils.',
      'constitution.articles.article194': 'The military tribunals are competent only in military matters.',
      'constitution.articles.article195': 'The Court of Audit controls the management of State finances.',
      'constitution.articles.article196': 'An organic law determines the organization and functioning of the courts and tribunals.',
      'constitution.articles.article197': 'The status of magistrates is governed by an organic law.',
      'constitution.articles.article198': 'The magistrates of the Public Ministry are placed under the authority of the Minister of Justice.',
      'constitution.articles.article199': 'The judicial decisions are executory.',
      'constitution.articles.article200': 'The Constitutional Court is composed of nine members, including the President and Vice-President.',
      'constitution.articles.article201': 'The Constitutional Court is the supreme jurisdictional organ in constitutional matters.',
      'constitution.articles.article202': 'The Constitutional Court judges the constitutionality of laws and acts having the force of law.',
      'constitution.articles.article203': 'The Constitutional Court is competent to hear appeals against decisions of the Independent National Electoral Commission.',
      'constitution.articles.article204': 'The members of the Constitutional Court are appointed for a term of nine years non-renewable.',
      'constitution.articles.article205': 'The Constitutional Court ensures the regularity of presidential and legislative elections.',
      'constitution.articles.article206': 'The Constitutional Court may be referred to by the President of the Republic, the Prime Minister, the President of the National Assembly, the President of the Senate, one-tenth of members of the National Assembly or the Senate.',
      'constitution.articles.article207': 'The decisions of the Constitutional Court are not subject to any appeal.',
      'constitution.articles.article208': 'The decisions of the Constitutional Court are binding on public authorities, all administrative and judicial authorities.',
      'constitution.articles.article209': 'An organic law determines the organization and functioning of the Constitutional Court.',
      'constitution.articles.article210': 'The Superior Council of Audiovisual and Communication ensures freedom and protection of the press.',
      'constitution.articles.article211': 'The Independent National Electoral Commission organizes and manages electoral processes.',
      'constitution.articles.article212': 'The National Human Rights Commission promotes and protects human rights.',
      'constitution.articles.article213': 'The Truth and Reconciliation Commission contributes to national reconciliation.',
      'constitution.articles.article214': 'The Ethics and Fight against Corruption Commission prevents and combats corruption.',
      'constitution.articles.article215': 'The National Commission of the Reform of the Law participates in the reform of Congolese law.',
      'constitution.articles.article216': 'The National Observatory of Gender Parity monitors the application of gender parity.',
      'constitution.articles.article217': 'The National Observatory of Human Rights monitors the human rights situation.',
      'constitution.articles.article218': 'These institutions support democracy and good governance.',
      'constitution.articles.article219': 'The members of these institutions enjoy functional immunity.',
      'constitution.articles.article220': 'An organic law determines the organization, composition and functioning of these institutions.',
      'constitution.articles.article221': 'The Constitution may be revised.',
      'constitution.articles.article222': 'The initiative for constitutional revision belongs concurrently to the President of the Republic and to Parliament.',
      'constitution.articles.article223': 'No procedure of revision may be undertaken or pursued during the state of emergency or state of siege.',
      'constitution.articles.article224': 'The republican form of the State, the principle of universal suffrage, the representative form of government and the number and limits of presidential terms may not be subject to any constitutional revision.',
      'constitution.articles.article225': 'The Constitution may not be revised when it is prejudicial to the integrity of the territory.',
      'constitution.articles.article226': 'If the Constitutional Court, referred to the matter by the President of the Republic or by one third of the deputies or senators, has declared that a constitutional revision project or proposal contains a provision which is contrary to the present article, such project or proposal may not be pursued.',
      'constitution.articles.article227': 'Any constitutional revision adopted contrary to the present article shall be null and void.',
      'constitution.articles.article228': 'All provisions contrary to the present Constitution are hereby repealed.',
      'constitution.articles.article229': 'This Constitution enters into force on the date of its promulgation. It repeals the Fundamental Law of the Transitional Period.',

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
      'nav.participateInPoll': 'Participer au Sondage',
      'nav.poll': 'Sondage',
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

      // Constitution navigation
      'constitution.nav.senateArticles': 'Articles du Sénat',
      'constitution.nav.fullConstitution': 'Constitution Complète (1-229)',
      'constitution.search.placeholder': 'Rechercher des articles...',
      'constitution.search.articlesFound': 'articles trouvés',
      'constitution.article': 'Article',
      'constitution.chapter': 'Chapitre',
      'constitution.fullText.note': 'Voici le texte complet de la Constitution de la République Démocratique du Congo, adoptée en 2011.',

      // Constitution chapters
      'constitution.chapters.generalProvisions': 'Dispositions Générales',
      'constitution.chapters.rightsAndDuties': 'Droits et Devoirs de la Personne et du Citoyen',
      'constitution.chapters.stateOrganization': 'Organisation et Fonctionnement de l\'État',
      'constitution.chapters.executivePower': 'Pouvoir Exécutif',
      'constitution.chapters.nationalAssembly': 'L\'Assemblée Nationale',
      'constitution.chapters.parliamentGovernment': 'Relations entre le Parlement et le Gouvernement',
      'constitution.chapters.senate': 'Le Sénat',
      'constitution.chapters.provinces': 'Provinces',
      'constitution.chapters.judicialPower': 'Pouvoir Judiciaire',
      'constitution.chapters.constitutionalCourt': 'La Cour Constitutionnelle',
      'constitution.chapters.independentInstitutions': 'Institutions Nationales Indépendantes',
      'constitution.chapters.revision': 'Révision de la Constitution',
      'constitution.chapters.finalProvisions': 'Dispositions Finales et Transitoires',

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

      // Constitution procedures
      'constitution.procedures.title': 'Procédures Parlementaires',
      'constitution.procedures.article105': 'Article 105',
      'constitution.procedures.content105': 'Les séances du Sénat sont publiques. Cependant, le Sénat peut siéger à huis clos à la demande du Président de la République, du Premier ministre ou du dixième de ses membres.',
      'constitution.procedures.article106': 'Article 106',
      'constitution.procedures.content106': 'Le Sénat ne peut délibérer que lorsque la moitié au moins de ses membres sont présents. Ses décisions sont prises à la majorité simple des suffrages exprimés.',
      'constitution.procedures.article107': 'Article 107',
      'constitution.procedures.content107': 'En cas de partage, la voix du Président du Sénat est prépondérante.',

      // Constitution legislative process
      'constitution.legislative.title': 'Processus Législatif',
      'constitution.legislative.article108': 'Article 108',
      'constitution.legislative.content108': 'Les projets et propositions de lois sont soumis soit à l\'Assemblée nationale, soit au Sénat.',
      'constitution.legislative.article109': 'Article 109',
      'constitution.legislative.content109': 'Tout projet ou proposition de loi est successivement examiné par les deux chambres du Parlement.',
      'constitution.legislative.article110': 'Article 110',
      'constitution.legislative.content110': 'Une loi est définitivement adoptée lorsqu\'elle a été votée dans les mêmes termes par l\'Assemblée nationale et le Sénat.',

      // Constitution specific powers
      'constitution.specificPowers.title': 'Pouvoirs Spécifiques du Sénat',
      'constitution.specificPowers.article111': 'Article 111',
      'constitution.specificPowers.content111': 'Le Sénat a compétence exclusive pour juger le Président de la République pour haute trahison et les membres du Gouvernement pour crimes commis dans l\'exercice de leurs fonctions.',
      'constitution.specificPowers.article112': 'Article 112',
      'constitution.specificPowers.content112': 'Le Sénat donne son avis sur les nominations aux hautes fonctions de l\'administration, missions diplomatiques et entreprises publiques selon les modalités prévues par la loi.',
      'constitution.specificPowers.article113': 'Article 113',
      'constitution.specificPowers.content113': 'Le Sénat assure la représentation des entités territoriales et défend leurs intérêts.',

      // Constitution immunity
      'constitution.immunity.title': 'Immunité Parlementaire',
      'constitution.immunity.article114': 'Article 114',
      'constitution.immunity.content114': 'Aucun sénateur ne peut être poursuivi, recherché, arrêté, détenu ou jugé pour les opinions ou votes émis par lui dans l\'exercice de ses fonctions.',
      'constitution.immunity.article115': 'Article 115',
      'constitution.immunity.content115': 'En dehors des sessions parlementaires, aucun sénateur ne peut être arrêté sauf en cas de flagrant délit ou en vertu d\'une décision judiciaire définitive.',
      'constitution.immunity.article116': 'Article 116',
      'constitution.immunity.content116': 'Pendant les sessions parlementaires, aucun sénateur ne peut être arrêté ou poursuivi sans l\'autorisation préalable du Sénat.',

      // Constitution statistics
      'constitution.statistics.title': 'Statistiques Actuelles du Sénat',
      'constitution.statistics.totalSenators': 'Total Sénateurs',
      'constitution.statistics.provinces': 'Provinces',
      'constitution.statistics.termYears': 'Années du Mandat',
      'constitution.statistics.femalePercentage': 'Femmes %',

      // Constitution articles (tous les articles)
      'constitution.articles.article1': 'La République Démocratique du Congo est un État souverain, indépendant, uni et indivisible, social, démocratique et laïc.',
      'constitution.articles.article2': 'La République Démocratique du Congo est composée de la ville de Kinshasa et de vingt-cinq provinces dotées de la personnalité juridique.',
      'constitution.articles.article3': 'Les provinces et la ville de Kinshasa sont les entités territoriales décentralisées de la République.',
      'constitution.articles.article4': 'La souveraineté nationale appartient au peuple. Tout pouvoir émane du peuple qui l\'exerce directement par voie de référendum ou par ses représentants élus au suffrage universel.',
      'constitution.articles.article5': 'Le régime politique de la République Démocratique du Congo est celui d\'une république démocratique basée sur l\'État de droit.',
      'constitution.articles.article6': 'Les langues nationales du Congo sont le kikongo, le lingala, le swahili et le tshiluba. La langue officielle est le français.',
      'constitution.articles.article7': 'L\'emblème national est le drapeau composé d\'un fond bleu traversé en diagonale par une bande rouge bordée de deux bandes jaunes.',
      'constitution.articles.article8': 'Les armes de la République Démocratique du Congo sont constituées d\'une tête de léopard en or, flanquée à gauche d\'une défense d\'éléphant et à droite d\'une lance.',
      'constitution.articles.article9': 'La personne est sacrée. L\'État a l\'obligation de la respecter et de la protéger.',
      'constitution.articles.article10': 'Tout individu a droit à la vie, à l\'intégrité physique et au libre développement de sa personnalité dans le respect de la loi, de l\'ordre public, du droit d\'autrui et des bonnes mœurs.',
      'constitution.articles.article11': 'Tous les êtres humains naissent libres et égaux en dignité et en droits.',
      'constitution.articles.article12': 'Tous les Congolais sont égaux devant la loi et ont droit à une égale protection de la loi.',
      'constitution.articles.article13': 'Aucun Congolais ne peut, en matière d\'éducation et d\'accès aux fonctions publiques ou à toute autre matière, faire l\'objet de mesures discriminatoires.',
      'constitution.articles.article14': 'Les pouvoirs publics veillent à l\'élimination de toute forme de discrimination à l\'égard de la femme et assurent la protection et la promotion de ses droits.',
      'constitution.articles.article15': 'Les pouvoirs publics veillent à l\'élimination de la violence sexuelle utilisée comme arme de guerre et de toute autre forme de violence sexuelle.',
      'constitution.articles.article16': 'Le mariage est l\'union d\'un homme et d\'une femme légitimée par la loi. Il se fonde sur le libre consentement des époux.',
      'constitution.articles.article17': 'La famille est la cellule de base de la communauté humaine. Elle sera protégée par l\'État.',
      'constitution.articles.article18': 'Les enfants font l\'objet de mesures spéciales de protection. Ils ont droit à une assistance particulière.',
      'constitution.articles.article19': 'L\'État assure à l\'enfant la protection contre toutes les formes de violence, d\'atteinte ou de brutalité physique ou mentale, d\'abandon ou de négligence, de mauvais traitements ou d\'exploitation.',
      'constitution.articles.article20': 'Tout citoyen a droit à la nationalité congolaise. Nul Congolais ne peut être privé de sa nationalité.',
      'constitution.articles.article21': 'Toute personne a le droit de quitter le territoire de la République et d\'y revenir.',
      'constitution.articles.article22': 'Toute personne a droit à la liberté d\'opinion, de conscience, de religion, de culte et de croyance.',
      'constitution.articles.article23': 'Toute personne a droit à la liberté d\'expression. Ce droit implique la liberté d\'exprimer ses opinions ou ses convictions, notamment par la parole, l\'écrit et l\'image.',
      'constitution.articles.article24': 'Toute personne a droit à l\'information et à la liberté de presse. Ce droit implique la liberté de la presse, la liberté d\'information et le droit à l\'information.',
      'constitution.articles.article25': 'Toute personne a droit à la liberté de réunion et de manifestation pacifiques.',
      'constitution.articles.article26': 'Toute personne a droit à la liberté d\'association. Nul ne peut être contraint d\'adhérer à une association.',
      'constitution.articles.article27': 'Tout Congolais a le droit de fonder des partis politiques et d\'adhérer au parti politique de son choix.',
      'constitution.articles.article28': 'Tout citoyen a le droit de saisir les juridictions compétentes contre les actes qui violent ses droits fondamentaux.',
      'constitution.articles.article29': 'Toute personne a droit à un procès équitable qui comprend : le droit d\'être jugée dans un délai raisonnable par une juridiction compétente, indépendante et impartiale.',
      'constitution.articles.article30': 'Toute personne accusée d\'une infraction est présumée innocente jusqu\'à ce que sa culpabilité soit établie par un jugement définitif.',
      'constitution.articles.article31': 'Nul ne peut être condamné pour des actions ou omissions qui, au moment où elles ont été commises, ne constituaient pas une infraction d\'après le droit national ou international.',
      'constitution.articles.article32': 'Nul ne peut être arbitrairement arrêté ou détenu. Toute personne arrêtée doit être immédiatement informée des charges retenues contre elle.',
      'constitution.articles.article33': 'Toute personne privée de sa liberté a le droit d\'être traitée avec humanité et avec le respect de la dignité inhérente à la personne humaine.',
      'constitution.articles.article34': 'Toute personne a droit à l\'inviolabilité du domicile. Le domicile est inviolable.',
      'constitution.articles.article35': 'Toute personne a droit au secret de la correspondance et des communications.',
      'constitution.articles.article36': 'Toute personne a droit au travail et au libre choix de l\'emploi.',
      'constitution.articles.article37': 'Toute personne a droit au repos et aux loisirs.',
      'constitution.articles.article38': 'Toute personne a droit aux soins de santé.',
      'constitution.articles.article39': 'Toute personne a droit à la sécurité alimentaire.',
      'constitution.articles.article40': 'Toute personne a droit au logement.',
      'constitution.articles.article41': 'Toute personne a droit à l\'eau.',
      'constitution.articles.article42': 'Toute personne a droit à l\'éducation.',
      'constitution.articles.article43': 'L\'enseignement primaire est obligatoire et gratuit dans les établissements publics.',
      'constitution.articles.article44': 'Toute personne a le droit de jouir des arts et de participer librement à la vie culturelle de la communauté.',
      'constitution.articles.article45': 'Toute personne a droit à un environnement sain et propice à son épanouissement.',
      'constitution.articles.article46': 'Toute personne a droit à la propriété.',
      'constitution.articles.article47': 'Nul ne peut être privé de sa propriété que pour cause d\'utilité publique et moyennant une juste et préalable indemnité.',
      'constitution.articles.article48': 'Le droit d\'héritage est garanti.',
      'constitution.articles.article49': 'Tout Congolais a le droit de circuler et de s\'établir librement sur le territoire national.',
      'constitution.articles.article50': 'Tout Congolais a le droit et le devoir de défendre la patrie.',
      'constitution.articles.article60': 'Toute personne a des devoirs envers la famille, la société, l\'État et la communauté internationale.',
      'constitution.articles.article61': 'Tout Congolais a le devoir de respecter et de considérer ses semblables sans discrimination.',
      'constitution.articles.article62': 'Tout Congolais a le devoir de respecter la Constitution, les lois et règlements de la République.',
      'constitution.articles.article63': 'Tout Congolais a le devoir de payer les impôts et contributions conformément à la loi.',
      'constitution.articles.article64': 'Tout Congolais a le devoir de contribuer à la sauvegarde de la paix publique et de la sécurité nationale.',
      'constitution.articles.article65': 'L\'État exerce sa souveraineté sur le territoire national, dans l\'espace aérien et dans les eaux territoriales.',
      'constitution.articles.article66': 'Les pouvoirs de l\'État sont exercés par le Président de la République, le Parlement, le Gouvernement et les Cours et Tribunaux.',
      'constitution.articles.article67': 'La séparation des pouvoirs législatif, exécutif et judiciaire est assurée.',
      'constitution.articles.article68': 'Le français est la langue officielle de la République Démocratique du Congo.',
      'constitution.articles.article69': 'Le Président de la République est le Chef de l\'État. Il incarne l\'unité nationale.',
      'constitution.articles.article70': 'Le Président de la République est élu au suffrage universel pour un mandat de cinq ans renouvelable une seule fois.',
      'constitution.articles.article71': 'Nul ne peut exercer plus de deux mandats présidentiels.',
      'constitution.articles.article72': 'Pour être éligible à la charge de Président de la République, il faut : être de nationalité congolaise d\'origine, être âgé de trente ans au moins.',
      'constitution.articles.article73': 'Le Président de la République est élu à la majorité absolue des suffrages valablement exprimés.',
      'constitution.articles.article74': 'Le Président de la République entre en fonction dans les quinze jours de la proclamation des résultats de l\'élection présidentielle.',
      'constitution.articles.article75': 'Le Président de la République est le garant de l\'indépendance nationale, de l\'intégrité du territoire, du respect des traités et accords.',
      'constitution.articles.article76': 'Le Président de la République veille au bon fonctionnement des institutions publiques et à la continuité de l\'État.',
      'constitution.articles.article77': 'Le Président de la République est le Chef suprême des Forces armées.',
      'constitution.articles.article78': 'Le Président de la République nomme le Premier ministre au sein de la majorité parlementaire.',
      'constitution.articles.article79': 'Le Président de la République met fin aux fonctions du Premier ministre soit sur initiative de celui-ci, soit à la suite d\'une motion de censure.',
      'constitution.articles.article80': 'Le Président de la République nomme et met fin aux fonctions des autres membres du Gouvernement sur proposition du Premier ministre.',
      'constitution.articles.article81': 'Le Président de la République préside le Conseil des Ministres.',
      'constitution.articles.article82': 'Le Président de la République signe les décrets.',
      'constitution.articles.article83': 'Le Président de la République a le droit de grâce.',
      'constitution.articles.article84': 'Le Président de la République accrédite les ambassadeurs et envoyés extraordinaires auprès des puissances étrangères.',
      'constitution.articles.article85': 'Le Président de la République reçoit les lettres de créance et de rappel des diplomates étrangers.',
      'constitution.articles.article86': 'Le Président de la République négocie et ratifie les traités.',
      'constitution.articles.article87': 'Le Président de la République peut dissoudre l\'Assemblée nationale.',
      'constitution.articles.article88': 'Le Président de la République adresse des messages à la nation.',
      'constitution.articles.article89': 'Le Président de la République peut demander au Parlement de réexaminer une loi.',
      'constitution.articles.article90': 'Le Président de la République peut, après consultation du Premier ministre et des Présidents des deux Chambres du Parlement, décider de soumettre tout projet de loi au référendum.',
      'constitution.articles.article91': 'Lorsque les institutions de la République, l\'indépendance de la nation ou l\'intégrité du territoire national sont menacées, le Président de la République peut proclamer l\'état d\'urgence ou l\'état de siège.',
      'constitution.articles.article92': 'Le Président de la République assume ses fonctions après prestation de serment devant la Cour constitutionnelle.',
      'constitution.articles.article93': 'Le Président de la République jouit de l\'immunité de poursuite pendant la durée de son mandat.',
      'constitution.articles.article94': 'Le Président de la République ne peut être poursuivi que pour haute trahison devant le Sénat.',
      'constitution.articles.article95': 'En cas de vacance de la Présidence, le Président du Sénat exerce l\'intérim présidentiel.',
      'constitution.articles.article96': 'Le Gouvernement est composé du Premier ministre, des Vice-premiers ministres, des Ministres et des Vice-ministres.',
      'constitution.articles.article97': 'Le Premier ministre est le chef du gouvernement. Il dirige l\'action du Gouvernement.',
      'constitution.articles.article117': 'Le Parlement exerce le pouvoir législatif.',
      'constitution.articles.article118': 'L\'initiative des lois appartient concurremment au Gouvernement et à chaque membre du Parlement.',
      'constitution.articles.article119': 'Les lois sont votées par le Parlement.',
      'constitution.articles.article120': 'Les lois organiques sont celles que la Constitution soumet à cette procédure.',
      'constitution.articles.article121': 'L\'Assemblée nationale est composée de députés élus au suffrage universel direct.',
      'constitution.articles.article122': 'Les députés sont élus pour un mandat de cinq ans renouvelable.',
      'constitution.articles.article123': 'L\'Assemblée nationale élit son Président et les autres membres de son Bureau.',
      'constitution.articles.article124': 'L\'Assemblée nationale établit son règlement intérieur.',
      'constitution.articles.article125': 'Aucun député ne peut être poursuivi pour les opinions ou votes émis par lui dans l\'exercice de ses fonctions.',
      'constitution.articles.article130': 'Le Gouvernement présente son programme devant l\'Assemblée nationale.',
      'constitution.articles.article135': 'La loi budgétaire détermine pour chaque exercice la nature, le montant et l\'affectation des ressources et des charges de l\'État.',
      'constitution.articles.article140': 'L\'Assemblée nationale et le Sénat peuvent constituer une commission d\'enquête sur toute question d\'intérêt public.',
      'constitution.articles.article145': 'Les membres du Parlement peuvent adresser au Gouvernement des questions écrites.',
      'constitution.articles.article150': 'Le Gouvernement peut engager sa responsabilité devant l\'Assemblée nationale sur sa politique générale.',
      'constitution.articles.article151': 'Les provinces sont les entités territoriales décentralisées dotées de la personnalité juridique.',
      'constitution.articles.article152': 'Les provinces exercent les compétences qui leur sont réservées par la Constitution.',
      'constitution.articles.article153': 'Les provinces ont compétence dans toutes les matières non réservées exclusivement au pouvoir central.',
      'constitution.articles.article154': 'Les institutions provinciales sont : l\'Assemblée provinciale et le Gouvernement provincial.',
      'constitution.articles.article155': 'L\'Assemblée provinciale est composée de députés élus au suffrage universel direct.',
      'constitution.articles.article156': 'L\'Assemblée provinciale élit le Gouverneur et le Vice-gouverneur de la province.',
      'constitution.articles.article157': 'Le Gouverneur est le chef de l\'exécutif provincial.',
      'constitution.articles.article158': 'Le Gouverneur est responsable devant l\'Assemblée provinciale.',
      'constitution.articles.article159': 'Les recettes provinciales proviennent des impôts, taxes et autres contributions prévues par la loi provinciale.',
      'constitution.articles.article160': 'Les provinces reçoivent des transferts du budget national.',
      'constitution.articles.article165': 'Les entités territoriales sont dotées de la personnalité juridique et sont gérées par des conseils locaux.',
      'constitution.articles.article170': 'Les entités territoriales décentralisées jouissent de l\'autonomie financière.',
      'constitution.articles.article175': 'La création des provinces est décidée par la loi.',
      'constitution.articles.article180': 'Les limites des provinces ne peuvent être modifiées que par loi organique.',
      'constitution.articles.article181': 'Le pouvoir judiciaire est indépendant du pouvoir législatif et du pouvoir exécutif.',
      'constitution.articles.article182': 'Le pouvoir judiciaire est dévolu aux cours et tribunaux.',
      'constitution.articles.article183': 'La justice est rendue au nom du peuple congolais.',
      'constitution.articles.article184': 'Les juges sont indépendants dans l\'exercice de leurs fonctions juridictionnelles.',
      'constitution.articles.article185': 'Les juges ne sont soumis qu\'à l\'autorité de la loi.',
      'constitution.articles.article186': 'Le pouvoir judiciaire comprend les cours et tribunaux civils et militaires, les cours et tribunaux administratifs, et la Cour constitutionnelle.',
      'constitution.articles.article187': 'La Cour de cassation est la plus haute juridiction en matière judiciaire.',
      'constitution.articles.article188': 'Le Conseil d\'État est la plus haute juridiction en matière administrative.',
      'constitution.articles.article189': 'Le Conseil supérieur de la Magistrature assure la gestion du pouvoir judiciaire.',
      'constitution.articles.article190': 'Le Conseil supérieur de la Magistrature est présidé par le Président de la République.',
      'constitution.articles.article191': 'Le Procureur général près la Cour de cassation représente le ministère public près cette cour.',
      'constitution.articles.article192': 'Le Président et le Vice-président de la Cour de cassation sont nommés par le Président de la République.',
      'constitution.articles.article193': 'Les juges de paix sont élus par les conseils locaux.',
      'constitution.articles.article194': 'Les tribunaux militaires ne sont compétents qu\'en matière militaire.',
      'constitution.articles.article195': 'La Cour des comptes contrôle la gestion des finances de l\'État.',
      'constitution.articles.article196': 'Une loi organique détermine l\'organisation et le fonctionnement des cours et tribunaux.',
      'constitution.articles.article197': 'Le statut des magistrats est régi par une loi organique.',
      'constitution.articles.article198': 'Les magistrats du ministère public sont placés sous l\'autorité du ministre de la Justice.',
      'constitution.articles.article199': 'Les décisions de justice sont exécutoires.',
      'constitution.articles.article200': 'La Cour constitutionnelle est composée de neuf membres, y compris le Président et le Vice-président.',
      'constitution.articles.article201': 'La Cour constitutionnelle est l\'organe juridictionnel suprême en matière constitutionnelle.',
      'constitution.articles.article202': 'La Cour constitutionnelle juge de la constitutionnalité des lois et des actes ayant force de loi.',
      'constitution.articles.article203': 'La Cour constitutionnelle est compétente pour connaître des recours contre les décisions de la Commission électorale nationale indépendante.',
      'constitution.articles.article204': 'Les membres de la Cour constitutionnelle sont nommés pour un mandat de neuf ans non renouvelable.',
      'constitution.articles.article205': 'La Cour constitutionnelle veille à la régularité des élections présidentielles et législatives.',
      'constitution.articles.article206': 'La Cour constitutionnelle peut être saisie par le Président de la République, le Premier ministre, le Président de l\'Assemblée nationale, le Président du Sénat, un dixième des membres de l\'Assemblée nationale ou du Sénat.',
      'constitution.articles.article207': 'Les décisions de la Cour constitutionnelle ne sont susceptibles d\'aucun recours.',
      'constitution.articles.article208': 'Les décisions de la Cour constitutionnelle s\'imposent aux pouvoirs publics, à toutes les autorités administratives et juridictionnelles.',
      'constitution.articles.article209': 'Une loi organique détermine l\'organisation et le fonctionnement de la Cour constitutionnelle.',
      'constitution.articles.article210': 'Le Conseil supérieur de l\'audiovisuel et de la communication assure la liberté et la protection de la presse.',
      'constitution.articles.article211': 'La Commission électorale nationale indépendante organise et gère les processus électoraux.',
      'constitution.articles.article212': 'La Commission nationale des droits de l\'homme promeut et protège les droits humains.',
      'constitution.articles.article213': 'La Commission vérité et réconciliation contribue à la réconciliation nationale.',
      'constitution.articles.article214': 'La Commission d\'éthique et de lutte contre la corruption prévient et combat la corruption.',
      'constitution.articles.article215': 'La Commission nationale de réforme du droit participe à la réforme du droit congolais.',
      'constitution.articles.article216': 'L\'Observatoire national de la parité homme-femme veille à l\'application de la parité.',
      'constitution.articles.article217': 'L\'Observatoire national des droits de l\'homme veille sur la situation des droits humains.',
      'constitution.articles.article218': 'Ces institutions appuient la démocratie et la bonne gouvernance.',
      'constitution.articles.article219': 'Les membres de ces institutions jouissent de l\'immunité fonctionnelle.',
      'constitution.articles.article220': 'Une loi organique détermine l\'organisation, la composition et le fonctionnement de ces institutions.',
      'constitution.articles.article221': 'La Constitution peut être révisée.',
      'constitution.articles.article222': 'L\'initiative de la révision constitutionnelle appartient concurremment au Président de la République et au Parlement.',
      'constitution.articles.article223': 'Aucune procédure de révision ne peut être entreprise ou poursuivie en période d\'état d\'urgence ou d\'état de siège.',
      'constitution.articles.article224': 'La forme républicaine de l\'État, le principe du suffrage universel, la forme représentative du Gouvernement ainsi que le nombre et la durée des mandats du Président de la République ne peuvent faire l\'objet d\'aucune révision constitutionnelle.',
      'constitution.articles.article225': 'Aucune révision ne peut être entreprise lorsqu\'elle porte atteinte à l\'intégrité du territoire.',
      'constitution.articles.article226': 'Si la Cour constitutionnelle, saisie par le Président de la République ou par le tiers des députés ou des sénateurs, a déclaré qu\'un projet ou une proposition de révision constitutionnelle comporte une disposition contraire au présent article, ce projet ou cette proposition ne peut être poursuivi.',
      'constitution.articles.article227': 'Toute révision constitutionnelle adoptée contrairement au présent article est nulle et de nul effet.',
      'constitution.articles.article228': 'Toutes dispositions contraires à la présente Constitution sont abrogées.',
      'constitution.articles.article229': 'La présente Constitution entre en vigueur à la date de sa promulgation. Elle abroge la Loi fondamentale de la période de transition.',

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
      'nav.participateInPoll': 'Kopona na Vote',
      'nav.poll': 'Vote',
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

      // Constitution navigation
      'constitution.nav.senateArticles': 'Mibeko ya Sénat',
      'constitution.nav.fullConstitution': 'Mobeko Mobimba (1-229)',
      'constitution.search.placeholder': 'Luka mibeko...',
      'constitution.search.articlesFound': 'mibeko ezwami',
      'constitution.article': 'Mobeko',
      'constitution.chapter': 'Eteni',

      // Constitution chapters
      'constitution.chapters.generalProvisions': 'Mibeko ya Liboso',
      'constitution.chapters.rightsAndDuties': 'Makoki mpe Misala ya Moto mpe Mwana-mboka',
      'constitution.chapters.senate': 'Sénat',

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

      // Constitution procedures
      'constitution.procedures.title': 'Malandeli ya Parlement',
      'constitution.procedures.article105': 'Article 105',
      'constitution.procedures.content105': 'Ba séance ya Sénat ezali ya bato banso. Kasi Sénat ekoki kosala mayangani na kobomba soki Mokambi ya République, Premier ministre to zomi ya ba membre na ye basenga.',
      'constitution.procedures.article106': 'Article 106',
      'constitution.procedures.content106': 'Sénat ekoki kosala mayangani kaka soki ndambo ya ba membre na ye bazali wana. Ba décision na yango esalemaka na motango ya mingi ya ba vote.',
      'constitution.procedures.article107': 'Article 107',
      'constitution.procedures.content107': 'Soki ba vote ekokani, mongongo ya Mokambi ya Sénat nde ekokata.',

      // Constitution legislative process
      'constitution.legislative.title': 'Nzela ya Kosala Mibeko',
      'constitution.legislative.article108': 'Article 108',
      'constitution.legislative.content108': 'Ba projet mpe ba proposition ya mibeko etindamaka epai ya Assemblée nationale to Sénat.',
      'constitution.legislative.article109': 'Article 109',
      'constitution.legislative.content109': 'Projet to proposition nyonso ya mobeko etalelami na ba chambre mibale ya Parlement.',
      'constitution.legislative.article110': 'Article 110',
      'constitution.legislative.content110': 'Mobeko ezwami malamu soki endimami na maloba moko kaka na Assemblée nationale mpe Sénat.',

      // Constitution specific powers
      'constitution.specificPowers.title': 'Ba Nguya ya Libanda ya Sénat',
      'constitution.specificPowers.article111': 'Article 111',
      'constitution.specificPowers.content111': 'Sénat ezali na nguya ya yango moko ya kosamba Mokambi ya République mpo na botomboki mpe ba membre ya Gouvernement mpo na mabe basalaki na mosala.',
      'constitution.specificPowers.article112': 'Article 112',
      'constitution.specificPowers.content112': 'Sénat epesi makanisi na ye mpo na kopona bato na misala ya minene ya administration, ba mission diplomatique mpe ba entreprise ya Leta.',
      'constitution.specificPowers.article113': 'Article 113',
      'constitution.specificPowers.content113': 'Sénat esaleli komonisa ba entité territoriale mpe kobatela ba intérêt na yango.',

      // Constitution immunity
      'constitution.immunity.title': 'Kobatela ba Parlement',
      'constitution.immunity.article114': 'Article 114',
      'constitution.immunity.content114': 'Senateur moko te akoki kolandama, kolukama, kokangama to kosambalama mpo na makanisi to ba vote oyo apesi na mosala na ye.',
      'constitution.immunity.article115': 'Article 115',
      'constitution.immunity.content115': 'Na libanda ya ba session ya parlement, senateur moko te akoki kokangama longola kaka soki akangi na masumu to soki tribunal ekataki.',
      'constitution.immunity.article116': 'Article 116',
      'constitution.immunity.content116': 'Na tango ya ba session ya parlement, senateur moko te akoki kokangama to kolandama na koyeba liboso ya Sénat.',

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
      'nav.participateInPoll': 'Shiriki katika Uchaguzi',
      'nav.poll': 'Uchaguzi',
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

      // Constitution navigation
      'constitution.nav.senateArticles': 'Vipengele vya Seneti',
      'constitution.nav.fullConstitution': 'Katiba Kamili (1-229)',
      'constitution.search.placeholder': 'Tafuta vipengele...',
      'constitution.search.articlesFound': 'vipengele vilipatikana',
      'constitution.article': 'Kipengele',
      'constitution.chapter': 'Sura',

      // Constitution chapters
      'constitution.chapters.generalProvisions': 'Masharti ya Jumla',
      'constitution.chapters.rightsAndDuties': 'Haki na Wajibu wa Mtu na Raia',
      'constitution.chapters.senate': 'Seneti',

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

      // Constitution procedures
      'constitution.procedures.title': 'Taratibu za Kibunge',
      'constitution.procedures.article105': 'Ibara ya 105',
      'constitution.procedures.content105': 'Vikao vya Seneti ni vya umma. Hata hivyo, Seneti inaweza kukaa kwa siri kwa ombi la Rais wa Jamhuri, Waziri Mkuu, au moja ya kumi ya wanachama wake.',
      'constitution.procedures.article106': 'Ibara ya 106',
      'constitution.procedures.content106': 'Seneti inaweza tu kujadili wakati angalau nusu ya wanachama wake wapo. Maamuzi yake yachukuliwa kwa wengi wa kura zilizotolewa.',
      'constitution.procedures.article107': 'Ibara ya 107',
      'constitution.procedures.content107': 'Ikiwa ni uwiano, sauti ya Rais wa Seneti ndio inayoamua.',

      // Constitution legislative process
      'constitution.legislative.title': 'Mchakato wa Kisheria',
      'constitution.legislative.article108': 'Ibara ya 108',
      'constitution.legislative.content108': 'Mswada na mapendekezo ya sheria huwasilishwa ama kwa Bunge la Kitaifa au Seneti.',
      'constitution.legislative.article109': 'Ibara ya 109',
      'constitution.legislative.content109': 'Kila mswada au pendekezo la sheria huchunguzwa kwa mfuatano na vyumba viwili vya Bunge.',
      'constitution.legislative.article110': 'Ibara ya 110',
      'constitution.legislative.content110': 'Sheria inapitishwa kabisa inapokuwa imepigwa kura kwa masharti sawa na Bunge la Kitaifa na Seneti.',

      // Constitution specific powers
      'constitution.specificPowers.title': 'Mamlaka Maalum ya Seneti',
      'constitution.specificPowers.article111': 'Ibara ya 111',
      'constitution.specificPowers.content111': 'Seneti ina mamlaka ya kipekee ya kumhukumu Rais wa Jamhuri kwa uhaini mkuu na wanachama wa Serikali kwa makosa waliyoyafanya katika utendaji wa majukumu yao.',
      'constitution.specificPowers.article112': 'Ibara ya 112',
      'constitution.specificPowers.content112': 'Seneti hutoa maoni yake juu ya uteuzi wa nafasi za juu za utawala, ujumbe wa kidiplomasia, na mashirika ya umma kama inavyoamuriwa na sheria.',
      'constitution.specificPowers.article113': 'Ibara ya 113',
      'constitution.specificPowers.content113': 'Seneti inahakikisha uwakilishi wa makazi ya kijiografia na kutetea maslahi yao.',

      // Constitution immunity
      'constitution.immunity.title': 'Kinga ya Kibunge',
      'constitution.immunity.article114': 'Ibara ya 114',
      'constitution.immunity.content114': 'Hakuna seneta anayeweza kufuatiliwa, kutafutwa, kukamatwa, kushikiliwa au kuhukumiwa kwa maoni au kura alizozitoa katika utendaji wa majukumu yake.',
      'constitution.immunity.article115': 'Ibara ya 115',
      'constitution.immunity.content115': 'Nje ya vipindi vya kibunge, hakuna seneta anayeweza kukamatwa isipokuwa katika hali ya makosa ya wazi au kutokana na uamuzi wa mwisho wa mahakama.',
      'constitution.immunity.article116': 'Ibara ya 116',
      'constitution.immunity.content116': 'Wakati wa vipindi vya kibunge, hakuna seneta anayeweza kukamatwa au kufuatiliwa bila idhini ya kwanza ya Seneti.',

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
      'nav.participateInPoll': 'Kujiba mu Maponi',
      'nav.poll': 'Maponi',
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

      // Constitution navigation
      'constitution.nav.senateArticles': 'Mabengele a Senat',
      'constitution.nav.fullConstitution': 'Mubengele Wonso (1-229)',
      'constitution.search.placeholder': 'Saka mabengele...',
      'constitution.search.articlesFound': 'mabengele asangane',
      'constitution.article': 'Mubengele',
      'constitution.chapter': 'Mutubulu',

      // Constitution chapters
      'constitution.chapters.generalProvisions': 'Mabengele a Kutambila',
      'constitution.chapters.rightsAndDuties': 'Bufulu ne Musebele wa Muntu ne Mukaji wa Tshilunga',
      'constitution.chapters.senate': 'Senat',

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

      // Constitution procedures
      'constitution.procedures.title': 'Malandeli a Kunkondanji',
      'constitution.procedures.article105': 'Lukanda 105',
      'constitution.procedures.content105': 'Byakulukanya bya Senat bidi bya bantu boonso. Kudi umuandi, Senat ukumona kusaya tshisemi tshia Mukalenga ua Republiki, Premier ministre kata kumi ya bantu baye.',
      'constitution.procedures.article106': 'Lukanda 106',
      'constitution.procedures.content106': 'Senat ukumona kulandela mundu bantu baye badidila pia budidi badi bailu. Byakumona byasebela ne bingi bya ba vote biishile.',
      'constitution.procedures.article107': 'Lukanda 107',
      'constitution.procedures.content107': 'Diba ba vote bikatanye, dibanza dia Mukalenga ua Senat didi diasonga.',

      // Constitution legislative process
      'constitution.legislative.title': 'Nzila ya Kusala Mubengele',
      'constitution.legislative.article108': 'Lukanda 108',
      'constitution.legislative.content108': 'Ba projet ne ba proposition ya mubengele bilekuwa ku Kunkondanji ia Tshitshilele kata ku Senat.',
      'constitution.legislative.article109': 'Lukanda 109',
      'constitution.legislative.content109': 'Projet kata proposition yimu yimu ya mubengele ilandela mu makundanji abila ya Parlement.',
      'constitution.legislative.article110': 'Lukanda 110',
      'constitution.legislative.content110': 'Mubengele umwana udi usonga ikunyukua ne maloba amoya ne Kunkondanji ia Tshitshilele ne Senat.',

      // Constitution specific powers
      'constitution.specificPowers.title': 'Bukumu bua Kuabanzila bua Senat',
      'constitution.specificPowers.article111': 'Lukanda 111',
      'constitution.specificPowers.content111': 'Senat une bukumu buaye bua kulanda Mukalenga ua Republiki ku bukaci ne bantu ba Gouvernement ku bidulu biasalile mu musalu.',
      'constitution.specificPowers.article112': 'Lukanda 112',
      'constitution.specificPowers.content112': 'Senat upe makanishi aye ku kusolola bantu mu myangala mikanda ya administration, ba mission diplomatique ne ba entreprise ya Leta.',
      'constitution.specificPowers.article113': 'Lukanda 113',
      'constitution.specificPowers.content113': 'Senat ulondolola kumonekana kua ba entité territoriale ne kulinda bukanu buabo.',

      // Constitution immunity
      'constitution.immunity.title': 'Kulindilua kua Parlement',
      'constitution.immunity.article114': 'Lukanda 114',
      'constitution.immunity.content114': 'Senateur muana ata akumona kulandama, kulukama, kukangamua, kulindilua kata kukatilua ku makanishi kata ba vote bapele mu musalu uaye.',
      'constitution.immunity.article115': 'Lukanda 115',
      'constitution.immunity.content115': 'Kunze kua ba session ya parlement, senateur muana ata akumona kukangamua tshiamu kaba bidulu biabona tshiamu kata bukasha bua tribunal bukatile.',
      'constitution.immunity.article116': 'Lukanda 116',
      'constitution.immunity.content116': 'Mu ntangu ya ba session ya parlement, senateur muana ata akumona kukangamua kata kulandama dikua dimone kuiba kua Senat.',

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
      'nav.participateInPoll': 'Kwenda na Maponi',
      'nav.poll': 'Maponi',
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

      // Constitution navigation
      'constitution.nav.senateArticles': 'Mambangelo ma Senat',
      'constitution.nav.fullConstitution': 'Kimbangelo Kioso (1-229)',
      'constitution.search.placeholder': 'Sosa mambangelo...',
      'constitution.search.articlesFound': 'mambangelo mantu',
      'constitution.article': 'Mbangelo',
      'constitution.chapter': 'Sintu',

      // Constitution chapters
      'constitution.chapters.generalProvisions': 'Mambangelo ma Ntete',
      'constitution.chapters.rightsAndDuties': 'Zindibu ye Misala mia Ntu ye Mwana mboka',
      'constitution.chapters.senate': 'Senat',

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

      // Constitution procedures
      'constitution.procedures.title': 'Malandelu ma Parlement',
      'constitution.procedures.article105': 'Nsamu 105',
      'constitution.procedures.content105': 'Bilumbu bia Senat biwa bantu bonso. Kodi Senat ukumona kutalama mu fuku tuka Nfumu wa Republiki, Premier ministre kata kumi kia bantu biawu.',
      'constitution.procedures.article106': 'Nsamu 106',
      'constitution.procedures.content106': 'Senat ukumona kusolula kaka ntangu nsuwa ya bantu biawu banzitu. Bisolosa biawu binsalanga ye bingi bia maponi masala.',
      'constitution.procedures.article107': 'Nsamu 107',
      'constitution.procedures.content107': 'Tuka maponi makatanye, nzayilu ya Nfumu wa Senat yawa ikata.',

      // Constitution legislative process
      'constitution.legislative.title': 'Nzila ya Kusala Kimbangelo',
      'constitution.legislative.article108': 'Nsamu 108',
      'constitution.legislative.content108': 'Ba projet ye ba proposition ya bimbangelo bilekwa ku Lukutanu lua Tintinu kata ku Senat.',
      'constitution.legislative.article109': 'Nsamu 109',
      'constitution.legislative.content109': 'Projet kata proposition yima yima ya kimbangelo ilandakana mu malukutanu mole ma Parlement.',
      'constitution.legislative.article110': 'Nsamu 110',
      'constitution.legislative.content110': 'Kimbangelo kinsukulanga balumbu kipondama ye maloba mamosi ku Lukutanu lua Tintinu ye Senat.',

      // Constitution specific powers
      'constitution.specificPowers.title': 'Binkwa bia Kibanzila bia Senat',
      'constitution.specificPowers.article111': 'Nsamu 111',
      'constitution.specificPowers.content111': 'Senat una nkwa wawu wa kulanda Nfumu wa Republiki mu bukaci ye bantu ba Gouvernement mu mambimbi masalile mu musalu.',
      'constitution.specificPowers.article112': 'Nsamu 112',
      'constitution.specificPowers.content112': 'Senat upesa makinua mawu mu kusobola bantu mu misalu minene ya administration, ba mission diplomatique ye ba entreprise ya Leta.',
      'constitution.specificPowers.article113': 'Nsamu 113',
      'constitution.specificPowers.content113': 'Senat ukelanga kumonakana kua ba entité territoriale ye kulinda bukanu buabu.',

      // Constitution immunity
      'constitution.immunity.title': 'Kukelama kua Parlement',
      'constitution.immunity.article114': 'Nsamu 114',
      'constitution.immunity.content114': 'Senateur yakayaka ukoki kulendama, kulukama, kukangama, kulindama kata kulandama mu makinua kata maponi manani mu musalu wawu.',
      'constitution.immunity.article115': 'Nsamu 115',
      'constitution.immunity.content115': 'Kuna ba session ya parlement, senateur yakayaka ukoki kukangama tuka se mu mambimbi masosa tuka bukasha bua tribunal bukatile.',
      'constitution.immunity.article116': 'Nsamu 116',
      'constitution.immunity.content116': 'Mu ntangu ya ba session ya parlement, senateur yakayaka ukoki kukangama kata kulendama se kuyivana kua Senat.',

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

import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

// Services
import { TranslationService } from '../../../services/translation.service';
import { ThemeService } from '../../../services/theme.service';

// Components
import { NewsSectionComponent } from '../../news/news-section/news-section.component';
import { ThemeToggleComponent } from '../../../components/theme-toggle/theme-toggle.component';

// Highcharts + modules
import * as Highcharts from 'highcharts/highmaps';
import ExportingModule from 'highcharts/modules/exporting';
import ExportDataModule from 'highcharts/modules/export-data';
import FullScreenModule from 'highcharts/modules/full-screen';

// Initialize Highcharts modules
if (typeof Highcharts === 'object') {
  ExportingModule(Highcharts);
  ExportDataModule(Highcharts);
  FullScreenModule(Highcharts);
}

@Component({
  standalone: true,
  selector: 'app-senate-origin-map',
  imports: [CommonModule, FormsModule, HighchartsChartModule, NewsSectionComponent, ThemeToggleComponent],
  templateUrl: './senate-origin-map.component.html',
  styleUrls: ['./senate-origin-map.component.scss']
})
export class SenateOriginMapComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';
  updateFlag = false;
  isMapReady = false;
  mapLayerData: any = null;

  // Translation properties
  currentLanguage = 'fr';
  availableLanguages = this.translationService.getAvailableLanguages();

  // Navigation tab state
  activeTab: 'map' | 'analytics' | 'constitution' | 'news' = 'map';
  activeMapSubTab: 'map' | 'list' = 'map'; // New property for map sub-tabs

  // Mobile and tablet menu state
  isMobileView = false;
  isTabletView = false;
  isSmallTabletView = false;
  isLargeTabletView = false;
  isDesktopView = false;
  isLargeDesktopView = false;
  showMobileMenu = false;
  showMobileLegend = false;

  // Modal properties
  showModal = false;
  selectedRegion: any = null;
  regionSenators: any[] = [];

  // Senators list properties
  filterText = '';
  selectedSenatorId: string | null = null;
  selectedSenator: any = null; // For the profile card
  filteredSenators: any[] = [];

  // Random senators for navigation bar
  randomNavSenators: any[] = [];

  // Sorting properties
  sortBy: 'name' | 'province' | 'party' = 'province';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Feedback poll properties
  showFeedback = false;
  selectedProvince = '';
  feedbackResponse: 'yes' | 'no' | 'unsure' | null = null;
  hasVoted = false;
  feedbackStats: any = {};

  // Constitution properties
  constitutionView: 'senate' | 'full' = 'senate';
  constitutionSearchTerm = '';
  filteredArticles: any[] = [];
  allConstitutionArticles: any[] = [];

  // Chart options
  chartOptions: Highcharts.Options = {
    chart: {
      map: undefined // Will be set when map data is loaded
    },
    title: {
      text: 'Senate Map RDC'
    },
    subtitle: {
      text: 'Explore where senators of the Democratic Republic of Congo come from. Click a province to view its representatives.'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      min: 0,
      max: 8, // Maximum senators (Kinshasa has 8)
      stops: [
        [0, '#E8F4FD'],     // Light blue for 0 senators
        [0.2, '#BBDEFB'],   // Lighter blue for 1-2 senators
        [0.4, '#90CAF9'],   // Medium light blue for 2-3 senators
        [0.6, '#64B5F6'],   // Medium blue for 3-4 senators
        [0.8, '#42A5F5'],   // Medium dark blue for 4-6 senators
        [1, '#1E88E5']      // Dark blue for 6-8 senators
      ],
      labels: {
        format: '{value}'
      }
    },
    legend: {
      enabled: true,
      title: {
        text: this.translate('map.senatorsPerProvince') || 'Senators per Province',
        style: {
          color: '#495057',
          fontWeight: '600',
          fontSize: '12px'
        }
      },
      align: 'left',
      verticalAlign: 'bottom',
      floating: true,
      layout: 'horizontal', // Changed to horizontal for better mobile fit
      valueDecimals: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e9ecef',
      borderWidth: 1,
      borderRadius: 8,
      shadow: true,
      itemStyle: {
        fontSize: '10px',
        fontWeight: '500'
      },
      symbolHeight: 12,
      symbolWidth: 60, // Make the color bar wider but shorter
      symbolPadding: 2,
      padding: 8,
      margin: 10
    },
    tooltip: {
      enabled: true,
      headerFormat: '',
      pointFormat: '<b>{point.name}</b><br/>Senators: <b>{point.value}</b>',
      style: {
        fontSize: '13px'
      }
    },
    series: []
  };

  // Touch gesture detection for mobile
  private touchStartTime = 0;
  private touchStartX = 0;
  private touchStartY = 0;
  private readonly TAP_DURATION_THRESHOLD = 500; // ms
  private readonly TAP_DISTANCE_THRESHOLD = 20; // px

  // Sample senators data (this could come from the senators.json file)
  senatorsData = [
    { fullName: 'Agito Amela Carole', originProvince: 'Bas-Uele', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Agito_Amela_Carole.png' },
    { fullName: 'Gebanga Tarangutoro', originProvince: 'Bas-Uele', party: '', photo: '' },
    { fullName: 'Namasia Bazego Aminata', originProvince: 'Bas-Uele', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Aminata_1.png' },
    { fullName: 'Sinango Ngbakoli Eddy Pascal', originProvince: 'Bas-Uele', party: '', photo: '' },

    { fullName: 'Mukamba Kadiata Nzemba Jonas', originProvince: 'Equateur', party: '', photo: 'https://7sur7.cd/sites/default/files/styles/article_2022/public/2025-03/f42c1670-7ff6-4c0b-a1d7-405b317d2916.jpeg?itok=hKTA3asO' },
    { fullName: 'Boketshu Bofili Jean-Paul', originProvince: 'Equateur', party: '', photo: 'https://i1.rgstatic.net/ii/profile.image/581722911547392-1515704958338_Q512/Jean-Paul-Boketsu-Bofili.jpg' },
    { fullName: 'Bolenge Bopende Gabriel', originProvince: 'Equateur', party: '', photo: '' },
    { fullName: 'Baende Etape Jean Claude', originProvince: 'Equateur', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Baende_Etafe_Eliko_Jean-Claude.png' },

    { fullName: 'Sama Lukonde Kyenge Jean Michel', originProvince: 'Haut-Katanga', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZisTkyiaF1RIef5u6d9wbJYSjGrtjNUDCJw&s' },
    { fullName: 'Kalonda Della Idi Salomon', originProvince: 'Haut-Katanga', party: '', photo: 'https://congorassure.com/sites/default/files/inline-images/IMG-20250819-WA0073.jpg' },
    { fullName: 'Kyabula Katwe Jacques', originProvince: 'Haut-Katanga', party: '', photo: 'https://actualite.cd/sites/default/files/styles/800_600/public/2019-05/GOUV.jpeg?itok=5uH7wuat' },
    { fullName: 'Kabongo Binene', originProvince: 'Haut-Katanga', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPlOzjJR7iVogaw3ha9Azq5LRWHaR2aOu9g&s' },

    { fullName: 'Ilunga Kitombolwe Alain', originProvince: 'Haut-Lomami', party: '', photo: '' },
    { fullName: 'Kabamba Wa Umba Isabelle', originProvince: 'Haut-Lomami', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9YgwrVeNVdzkFtZ8YcTKpOcbWThMNsv02bg&s' },
    { fullName: 'Yamba Kazadi Gracia', originProvince: 'Haut-Lomami', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Yamba_Kazadi_Gracia.png' },
    { fullName: 'Banza Maloba Dany', originProvince: 'Haut-Lomami', party: '', photo: 'https://static.wixstatic.com/media/365f65_a050123446344e5fb011ef167fda891c~mv2.jpg/v1/fill/w_1000,h_783,al_c,q_85,usm_0.66_1.00_0.01/365f65_a050123446344e5fb011ef167fda891c~mv2.jpg' },

    { fullName: 'Baseane Nangaa Christophe', originProvince: 'Haut-Uele', party: '', photo: 'https://actualite.cd/sites/default/files/styles/800_600/public/2023-12/Christophe%20Baseane%20Nangaa.jpg?itok=VB-feAC5' },
    { fullName: 'Mangbukele Manga Dima Prospere', originProvince: 'Haut-Uele', party: '', photo: '' },
    { fullName: 'Kumbodimo Kababile Anna', originProvince: 'Haut-Uele', party: '', photo: '' },
    { fullName: 'Batumoko Afozunde Jean-Pierre', originProvince: 'Haut-Uele', party: '', photo: '' },

    { fullName: 'Adubango Awotho Samuel', originProvince: 'Ituri', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/SAMUEL_ADUBANGO.png' },
    { fullName: 'Banio Debho Daniel', originProvince: 'Ituri', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/DANIEL_BANIO.png' },
    { fullName: 'Bachebandey Manzolo Noelle', originProvince: 'Ituri', party: '', photo: '' },
    { fullName: 'Idi Tabani Zakaria', originProvince: 'Ituri', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxf-NBQdAr-mjJmyyw9MNxB3sjmWz1XCufnA&s' },

    { fullName: 'Nkole Tshimuanga Gaston', originProvince: 'Kasai', party: '', photo: 'https://www.congo-press.com/wp-content/uploads/2021/05/nkole_tshimuanga_gaston_21_0.jpg' },
    { fullName: 'Ngalamulume Bakakenga Joseph', originProvince: 'Kasai', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk37gaSNVlPCLANqQy5n9xz2aH_faSIcrGDw&s' },
    { fullName: 'Muya Muboyayi Clement', originProvince: 'Kasai', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHSzTuuGAETDCCBDHwCHHJ-MbyxVnPk4ZVXA&s' },
    { fullName: 'Mbingo Mvula Hubert', originProvince: 'Kasai', party: '', photo: '' },

    { fullName: 'Ngindu Biduaya Cedric', originProvince: 'Kasaï Central', party: '', photo: 'https://actualite.cd/sites/default/files/styles/800_600/public/2024-06/IMG-20240625-WA0035.jpg?itok=q15JTM1b' },
    { fullName: 'Mukengeshayi Kabongo Sylvain', originProvince: 'Kasaï Central', party: '', photo: 'https://le-journal.net/wp-content/uploads/2023/01/Taupin-Kabongo-560x390-1.jpg' },
    { fullName: 'Muntuaba Lukuna Luabeya Jean', originProvince: 'Kasaï Central', party: '', photo: '' },
    { fullName: 'Tshisekedi Kabasele Jean', originProvince: 'Kasaï Central', party: '', photo: '' },

    { fullName: 'Ngoyi Kasanji Alphonse', originProvince: 'Kasaï Oriental', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGAVrJz6BXcifIWSD8ovqtSdNjeq1j49eb1Q&s' },
    { fullName: 'Kabombo Mwadiamvita Guy', originProvince: 'Kasaï Oriental', party: '', photo: 'https://photos.radiookapi.net/picture/20240529121050897637_444226430_468375535558510_2083443664707242684_n.jpg?imgmax=1200' },
    { fullName: 'Kalala Wa Kalala Jose', originProvince: 'Kasaï Oriental', party: '', photo: 'https://www.opinion-info.cd/sites/default/files/styles/media_interne_1280x720/public/2025-04/IMG-20250413-WA0005.jpg?itok=TH-AEz5G' },
    { fullName: 'Mpanda Kabangu Jose', originProvince: 'Kasaï Oriental', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhKigrTKapR6j33DW8NRcii01iYfcv5S7KLg&s' },

    { fullName: 'Vangu Ki-Nsongo', originProvince: 'Kasaï Central', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnalf0oAIkWOb_-VMgpUdNhhKa79DJM5JO8w&s' },
    { fullName: 'Kinduelo Lumbu Pascal', originProvince: 'Kasaï Central', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHufWby1JSHwARQtKkxSFvtKAez1Avija5gA&s' },
    { fullName: 'Budimbu Ntubuanga Didier', originProvince: 'Kasaï Central', party: '', photo: 'https://www.irisfootball.com/wp-content/uploads/2024/05/IMG-20240529-WA0053.jpg' },
    { fullName: 'Ngudianza Bayokisa Kisula Nefertiti', originProvince: 'Kasaï Central', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadbX3NCyO7ZtS6yPEM5IcwPPRa88OMGSKtA&s' },

    { fullName: 'Mbunguje Marembo Anne', originProvince: 'Kinshasa', party: '', photo: 'https://7sur7.cd/sites/default/files/styles/article_2022/public/2024-05/995d036e-3d70-4843-9142-ffaee91cffb4.jpeg?itok=vze0f2I4' },
    { fullName: 'Mulumba Kongolo Wa Kongolo Gerard', originProvince: 'Kinshasa', party: '', photo: 'https://lepotentiel.cd/wp-content/uploads/2024/03/IMG-20240306-WA0063.jpg' },
    { fullName: 'Kabasele Tubajika Micke', originProvince: 'Kinshasa', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyEFjz9og4W5muAckgvZzsYVqI5rS4rmWBg&s' },
    { fullName: 'Kazadi Kankonde Ivan', originProvince: 'Kinshasa', party: '', photo: '' },
    { fullName: 'Kabuya Tshilumba Augustin', originProvince: 'Kinshasa', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR11Ih1YUKDw1Rko8u1znpgHheTDFQ3KkCxZA&s' },
    { fullName: 'Ngobila Mbaka Gentiny', originProvince: 'Kinshasa', party: '', photo: 'https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1215,fit=cover,gravity=0.5979x0.3291/https://prod.cdn-medias.jeuneafrique.com/medias/2024/01/12/jad20240112-ass-gentiny-ngobila.jpg' },
    { fullName: 'Lunguana Matumona Jacques', originProvince: 'Kinshasa', party: '', photo: 'https://actualite.cd/sites/default/files/styles/800_600/public/2019-11/okende1%20%281%29.jpg?itok=Wa_iE_ej' },
    { fullName: 'Bahati Tito Arlette', originProvince: 'Kinshasa', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuCGabQdRocT6z6NsIDCZxGl81luWCQ_Nflg&s' },

    { fullName: 'Luheto Kidid Platini', originProvince: 'Kwango', party: '', photo: '' },
    { fullName: 'Kapenda Kasuku Justin', originProvince: 'Kwango', party: '', photo: '' },
    { fullName: 'Naa Ikamba Simon', originProvince: 'Kwango', party: '', photo: '' },
    { fullName: 'Bitwisila Lusundji Willy', originProvince: 'Kwango', party: '', photo: '' },

    { fullName: '', originProvince: 'Kwilu', party: '', photo: '' },
    { fullName: '', originProvince: 'Kwilu', party: '', photo: '' },
    { fullName: '', originProvince: 'Kwilu', party: '', photo: '' },
    { fullName: '', originProvince: 'Kwilu', party: '', photo: '' },

    { fullName: '', originProvince: 'Nord-Ubangi', party: '', photo: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '', photo: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '', photo: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '', photo: '' },

    { fullName: 'Lumanu Mulenda Buanan Nsefu', originProvince: 'Lomami', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrG0EpnCtOJpi0RYqnqIsQ3vnYDBjGifvqw&s' },
    { fullName: 'Muabilu Mbayu Mukala Pius', originProvince: 'Lomami', party: '', photo: 'https://exclusivite.info/wp-content/uploads/2022/02/Screenshot_20220131-152917.jpg' },
    { fullName: 'Muleka Bajikila Florence', originProvince: 'Lomami', party: '', photo: '' },
    { fullName: 'Kalambayi Katshiobo Jonas', originProvince: 'Lomami', party: '', photo: 'https://liberteplus.net/wp-content/uploads/2022/07/IMG-20220729-WA0029_1-1-878x1024.jpg' },

    { fullName: 'Naweji Yav Norbert', originProvince: 'Lualaba', party: '', photo: '' },
    { fullName: 'Kanyimbu Shindany Michel', originProvince: 'Lualaba', party: '', photo: 'https://www.voxpopuli.cd/wp-content/uploads/2021/07/7I6A9803-620x400.jpg' },
    { fullName: 'Mashata Kayembe Celestin', originProvince: 'Lualaba', party: '', photo: 'https://topinfo.cd/wp-content/uploads/2022/07/IMG-20220704-WA0189-1024x768.jpg' },
    { fullName: 'Masuka Shindany Michel', originProvince: 'Lualaba', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Masuka_Saini_Fifi.png' },

    { fullName: 'Babanga Mpotiyolo Anicet', originProvince: 'Mai-Ndombe', party: '', photo: '' },
    { fullName: 'Mutima Sakrini Herman', originProvince: 'Mai-Ndombe', party: '', photo: '' },
    { fullName: 'Mongo Lonkonda Aime', originProvince: 'Mai-Ndombe', party: '', photo: '' },
    { fullName: 'Ngambani Ngovoli Adonis', originProvince: 'Mai-Ndombe', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwLklfbPPTwraxuy0sQ2iFwnpdBT0PYnQDVA&s' },

    { fullName: 'Luanga Mukela Faustin', originProvince: 'Maniema', party: '', photo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Faustin_Luanga.png' },
    { fullName: 'Afani Idrissa Mangala', originProvince: 'Maniema', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaVqvwa8uL6ALRpuuLeAafwwoZ3gNcS5CsRg&s' },
    { fullName: 'Kalumba Mwana Ngongo Justin', originProvince: 'Maniema', party: '', photo: 'https://www.financetimes.cd/sites/default/files/styles/photo_page_de_listing/public/2020-07/WhatsApp%20Image%202020-07-29%20at%201.57.41%20AM.jpeg?itok=gnJgRl54' },
    { fullName: 'Omona Bitika Pascal', originProvince: 'Maniema', party: '', photo: 'https://media.licdn.com/dms/image/v2/D4E03AQHngp0yLrK9Iw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698061890096?e=2147483647&v=beta&t=7xVrnl7rca7k-jZ0hGxM090FR4Hzs6LiYBVETE4yALc' },

    { fullName: 'Bokumwana Maposo Elise', originProvince: 'Mongala', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhvqi3uLRuRAg-YklJ5mfCrV13-e7RYAQZA&s' },
    { fullName: 'Sakombi Molendo Aime', originProvince: 'Mongala', party: '', photo: 'https://cdn.asp.events/CLIENT_Energy_C_13C9F44C_A8F1_6ADC_8157B56AAE84B86E/sites/CEIF2025/media/libraries/speakers/H.E.-Aime-Molendo.jpg/fit-in/500x500/filters:no_upscale()' },
    { fullName: 'Lingepo Molanga Michel', originProvince: 'Mongala', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT664godASkGQv0tkeM4HUfNF2zJe5uTkiFEw&s' },
    { fullName: 'Lihau Ebua Kalokola Jean-Pierre', originProvince: 'Mongala', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/lihau.png' },

    { fullName: 'Kaseraka Katokolyo Jean-Marie', originProvince: 'Nord-Kivu', party: '', photo: 'https://www.ellefm.net/wp-content/uploads/2024/10/IMG-20241006-WA0061.jpg' },
    { fullName: 'Vunabandi Kanyinmigo', originProvince: 'Nord-Kivu', party: '', photo: '' },
    { fullName: 'Mumbere Malhozi Papy', originProvince: 'Nord-Kivu', party: '', photo: '' },
    { fullName: 'Shabani Lukoo Bihango Jacquemain', originProvince: 'Nord-Kivu', party: '', photo: 'https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1215,fit=cover/https://prod.cdn-medias.jeuneafrique.com/medias/2024/06/26/jad20240626-ass-rdc-jacquemain-shabani-ministre-interieur.jpg' },

    { fullName: 'Lutundula Apala Penapala', originProvince: 'Sankuru', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE1jpNRKnJ9bHaQdjcll4PWSzXMRHyzhY7kQ&s' },
    { fullName: 'Kalala Masimango Rene', originProvince: 'Sankuru', party: '', photo: '' },
    { fullName: 'Mpetshi Woto Bernard', originProvince: 'Sankuru', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9l89oNts_W_aiIN2XVzwoJjYq6yjOjqcbMQ&s' },
    { fullName: 'Lodi Emongo Jules', originProvince: 'Sankuru', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Lodi_Emongo_Jules.png' },

    { fullName: 'Bulakayi Mululunganya Aristide', originProvince: 'Sud-Kivu', party: '', photo: 'https://infosdirect.net/wp-content/uploads/2024/03/IMG-20240303-WA0029.jpg' },
    { fullName: 'Bahati Lukwebo Modeste', originProvince: 'Sud-Kivu', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Bahati_Lukwebo_Modeste.png' },
    { fullName: 'Muhanzi Mubembe Eustache', originProvince: 'Sud-Kivu', party: '', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Eustache_Muhanzi_Mubembe_-_2020_%28cropped%29.jpg/250px-Eustache_Muhanzi_Mubembe_-_2020_%28cropped%29.jpg' },
    { fullName: 'Basengezi Katintima', originProvince: 'Sud-Kivu', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmw9AtWQ_1ccTDxHqiL_vdBodwmV148XVmxQ&s' },

    { fullName: 'Mondonge Bambulu Alexis', originProvince: 'Sud-Ubangi', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSarY2N1EjgHsYzYuHPMJHSdvUMRywG-rAiXw&s' },
    { fullName: 'Bussa Tonga Jean Lucien', originProvince: 'Sud-Ubangi', party: '', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/JLB_Final.png/1200px-JLB_Final.png' },
    { fullName: 'Bemba Ndokwa Francoise', originProvince: 'Sud-Ubangi', party: '', photo: 'https://i0.wp.com/congoprofond.net/wp-content/uploads/2024/08/IMG-20240812-WA0002-1000x600.jpg?resize=1000%2C600&ssl=1' },
    { fullName: 'Boboy Mwanela Nadine', originProvince: 'Sud-Ubangi', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRav7nQ-Dp69MVOQ-gQRcqAsLYblwFK3pUcLw&s' },

    { fullName: 'Ramazani Masudi Kilele', originProvince: 'Tanganyika', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLLXAy75NiMLCqjHCjSBq_TIzZorzto2Xy-g&s' },
    { fullName: 'Mwando Katempa Christine', originProvince: 'Tanganyika', party: '', photo: 'https://media.licdn.com/dms/image/v2/D4D03AQESOFNliGkW5A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1683621056808?e=2147483647&v=beta&t=4z1uQ7wjJUYEKpydmlZ4ruUrX4rDOC1bf11AylcJYJY' },
    { fullName: 'Katumwa Mukalay Vicky', originProvince: 'Tanganyika', party: '', photo: 'https://lh4.googleusercontent.com/-BlWgZfKHGkY/UW0UZb-JBhI/AAAAAAAAkEA/R7BNWol0-vw/IMG_1078.JPG?imgmax=400' },
    { fullName: 'Pungwe Mbuyu Luyongola Patrice', originProvince: 'Tanganyika', party: '', photo: 'https://media.licdn.com/dms/image/v2/C4D03AQHHjmSkKEeCJw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1611905935263?e=2147483647&v=beta&t=yzvFV6pFfaKSoyLFqyfOm4EzoCTEo2QoLO6UDJx89O0' },

    { fullName: 'Bamanisa Saidi Jean', originProvince: 'Tshopo', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkAxHeh-8k74bE8NR-OiAhpHrAKnwlITVPng&s' },
    { fullName: 'Nkomba Sabangu Madeleine', originProvince: 'Tshopo', party: '', photo: 'https://www.congo-press.com/wp-content/uploads/2022/05/nikomba_22_0214.jpg' },
    { fullName: 'Daruwezi Mokombe Jean-Pierre', originProvince: 'Tshopo', party: '', photo: 'https://depechesdelatshopo.com/wp-content/uploads/2024/03/IMG-20240311-WA0547.jpg' },
    { fullName: 'Kayala Ninga Renabelle', originProvince: 'Tshopo', party: '', photo: 'https://depechesdelatshopo.com/wp-content/uploads/2024/05/IMG-20240516-WA0099-1-420x280.jpg' },

    { fullName: 'Loando Mboyo Guy', originProvince: 'Tshuapa', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXBuGOH8eX1MuUoacPneGqLsf_4k0R_pcwoA&s' },
    { fullName: 'Ekumbo Longulu Moise', originProvince: 'Tshuapa', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2sQRKNQJNqmCjE_g7Hv56-PLoh-5gmwmfWw&s' },
    { fullName: 'Boongo Nkoy Pancrace', originProvince: 'Tshuapa', party: '', photo: 'https://img.over-blog-kiwi.com/0/96/89/48/20190412/ob_815d21_boongo-nkoy-pancrace.jpg' },
    { fullName: 'Isengi Ndelo Bokeka Corneille Patrice', originProvince: 'Tshuapa', party: '', photo: 'https://media.licdn.com/dms/image/v2/C4D03AQGCP_bK0nomhg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1658791956559?e=2147483647&v=beta&t=ozz-6EKloY4xSNIg0jLXP7lkCHIq8yPaKXGO_p6YHLo' },

  ];

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.isMapReady = true;
    console.log('Chart instance captured');
  };

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly translationService: TranslationService,
    private readonly themeService: ThemeService
  ) {
    // Set French as default language
    this.translationService.setLanguage('fr');
    this.currentLanguage = 'fr';
    this.loadMapData();
  }

  ngOnInit(): void {
    console.log('SenateOriginMapComponent initialized');
    // Sync with translation service language
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.updateChartTexts();
    this.initializeFilteredSenators();
    this.initializeRandomNavSenators();
    this.initializeConstitutionArticles();
    this.checkViewportSize();
    this.setupResizeListener();
  }

  ngOnDestroy(): void {
    // Ensure body scroll is restored when component is destroyed
    this.preventBodyScroll(false);
    // Remove resize listener
    window.removeEventListener('resize', this.onWindowResize);
  }

  // Method to set active map sub-tab
  setActiveMapSubTab(tab: 'map' | 'list'): void {
    this.activeMapSubTab = tab;
  }

  // Senators list methods
  initializeFilteredSenators(): void {
    this.filteredSenators = [...this.senatorsData];
    this.applySorting();
  }

  // Random senators for navigation bar
  initializeRandomNavSenators(): void {
    // Filter senators that have photos
    const senatorsWithPhotos = this.senatorsData.filter(senator =>
      senator.photo && senator.photo.trim() !== ''
    );

    // Randomly select 4 senators
    this.randomNavSenators = this.getRandomSenators(senatorsWithPhotos, 4);
  }

  private getRandomSenators(senators: any[], count: number): any[] {
    const shuffled = [...senators].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  refreshRandomSenators(): void {
    this.initializeRandomNavSenators();
  }

  onRandomSenatorClick(senator: any): void {
    // Focus the senator in the sidebar and open their profile
    this.selectSenator(senator);
    // Highlight their province on the map
    this.highlightSenatorProvince(senator.originProvince);
  }

  onFilterChange(event: any): void {
    this.filterText = event.target.value.toLowerCase();
    this.filterSenators();
  }

  filterSenators(): void {
    if (!this.filterText.trim()) {
      this.filteredSenators = [...this.senatorsData];
    } else {
      this.filteredSenators = this.senatorsData.filter(senator =>
        senator.fullName.toLowerCase().includes(this.filterText) ||
        senator.originProvince.toLowerCase().includes(this.filterText) ||
        senator.party?.toLowerCase().includes(this.filterText)
      );
    }
    this.applySorting();
  }

  // Sorting methods
  onSortChange(sortBy: 'name' | 'province' | 'party'): void {
    if (this.sortBy === sortBy) {
      // Toggle sort direction if same field
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new sort field with ascending default
      this.sortBy = sortBy;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  applySorting(): void {
    this.filteredSenators.sort((a, b) => {
      let valueA: string;
      let valueB: string;

      switch (this.sortBy) {
        case 'name':
          valueA = a.fullName.toLowerCase();
          valueB = b.fullName.toLowerCase();
          break;
        case 'province':
          valueA = a.originProvince.toLowerCase();
          valueB = b.originProvince.toLowerCase();
          break;
        case 'party':
          valueA = (a.party || '').toLowerCase();
          valueB = (b.party || '').toLowerCase();
          break;
        default:
          valueA = a.fullName.toLowerCase();
          valueB = b.fullName.toLowerCase();
      }

      const comparison = valueA.localeCompare(valueB);
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  selectSenator(senator: any): void {
    this.selectedSenatorId = senator.fullName;
    this.selectedSenator = senator; // Set the selected senator for the profile card
    this.preventBodyScroll(true); // Prevent body scrolling on mobile
    // You could highlight the senator's province on the map here
    this.highlightSenatorProvince(senator.originProvince);
  }

  deselectSenator(): void {
    this.selectedSenatorId = null;
    this.selectedSenator = null;
    this.preventBodyScroll(false); // Restore body scrolling
    // Remove any province highlighting
    console.log('Senator deselected');
  }

  onMapContainerClick(event: Event): void {
    // Check if the click was on the map container itself (not on the profile card or other elements)
    const target = event.target as HTMLElement;
    const isProfileCard = target.closest('.profile-card');
    const isHighchartsElement = target.closest('.highcharts-container') ||
                               target.closest('svg') ||
                               target.tagName === 'path' ||
                               target.tagName === 'g';

    // Only deselect if clicking on the map background or empty space
    if (!isProfileCard && !isHighchartsElement) {
      this.deselectSenator();
    }
  }

  // Touch event handlers for mobile
  onTouchStart(event: TouchEvent): void {
    this.touchStartTime = Date.now();
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndTime = Date.now();
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const duration = touchEndTime - this.touchStartTime;
    const distance = Math.sqrt(
      Math.pow(touchEndX - this.touchStartX, 2) +
      Math.pow(touchEndY - this.touchStartY, 2)
    );

    // Detect tap (short duration and small movement)
    if (duration < this.TAP_DURATION_THRESHOLD && distance < this.TAP_DISTANCE_THRESHOLD) {
      // Treat as click
      this.onMapContainerClick(event);
    }
  }

  // Helper methods for the profile card
  getRandomStat(type: 'followers'): string {
    return (Math.floor(Math.random() * 400) + 100).toString();
  }

  private highlightSenatorProvince(province: string): void {
    // Find the corresponding map marker and highlight it
    console.log('Highlighting province:', province);
    // This could trigger a visual highlight on the map
  }

  getSenatorId(senator: any): string {
    return senator.fullName;
  }

  // Translation methods
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  private generateConnectionLines(): any[] {
    const kinshasaCoords = { lat: -4.4419, lon: 15.2663 };

    // Define all provincial capitals with their coordinates
    const provincialCapitals = [
      { name: 'Lubumbashi', province: 'Haut-Katanga', lat: -11.6645, lon: 27.4797, senators: 4 },
      { name: 'Kisangani', province: 'Tshopo', lat: 0.5149, lon: 25.1972, senators: 4 },
      { name: 'Kananga', province: 'Kasai Central', lat: -5.8921, lon: 22.4454, senators: 4 },
      { name: 'Bukavu', province: 'Sud-Kivu', lat: -2.5089, lon: 28.8473, senators: 4 },
      { name: 'Goma', province: 'Nord-Kivu', lat: 1.2103, lon: 29.2348, senators: 4 },
      { name: 'Mbuji-Mayi', province: 'Kasai Oriental', lat: -6.1583, lon: 23.6014, senators: 4 },
      { name: 'Bandundu', province: 'Kwilu', lat: -3.3098, lon: 17.3157, senators: 4 },
      { name: 'Buta', province: 'Bas-Uele', lat: 3.7167, lon: 22.4167, senators: 4 },
      { name: 'Mbandaka', province: 'Equateur', lat: 0.0389, lon: 18.2656, senators: 4 },
      { name: 'Kamina', province: 'Haut-Lomami', lat: -9.2167, lon: 25.8167, senators: 4 },
      { name: 'Isiro', province: 'Haut-Uele', lat: 3.4833, lon: 25.6333, senators: 4 },
      { name: 'Bunia', province: 'Ituri', lat: 1.6667, lon: 30.8333, senators: 4 },
      { name: 'Luebo', province: 'Kasai', lat: -5.1833, lon: 20.7500, senators: 4 },
      { name: 'Matadi', province: 'Kongo Central', lat: -5.7833, lon: 14.2167, senators: 4 },
      { name: 'Kenge', province: 'Kwango', lat: -5.9333, lon: 16.9500, senators: 4 },
      { name: 'Gbadolite', province: 'Nord-Ubangi', lat: 4.2500, lon: 21.4833, senators: 4 },
      { name: 'Kabinda', province: 'Lomami', lat: -8.8000, lon: 25.4000, senators: 4 },
      { name: 'Kolwezi', province: 'Lualaba', lat: -10.6833, lon: 25.4000, senators: 4 },
      { name: 'Inongo', province: 'Mai-Ndombe', lat: -2.6500, lon: 17.8333, senators: 4 },
      { name: 'Kindu', province: 'Maniema', lat: -4.2167, lon: 26.2833, senators: 4 },
      { name: 'Lisala', province: 'Mongala', lat: 1.8333, lon: 19.9167, senators: 4 },
      { name: 'Lodja', province: 'Sankuru', lat: -7.2333, lon: 24.7333, senators: 4 },
      { name: 'Gemena', province: 'Sud-Ubangi', lat: 3.4000, lon: 18.6000, senators: 4 },
      { name: 'Kalemie', province: 'Tanganyika', lat: -6.8500, lon: 27.4833, senators: 4 },
      { name: 'Boende', province: 'Tshuapa', lat: -2.3167, lon: 20.8500, senators: 4 }
    ];

    // Generate connection lines from each provincial capital to Kinshasa
    return provincialCapitals.map(capital => ({
      name: `${capital.name} → Kinshasa`,
      geometry: {
        type: 'LineString',
        coordinates: [
          [capital.lon, capital.lat],
          [kinshasaCoords.lon, kinshasaCoords.lat]
        ]
      },
      custom: {
        from: capital.name,
        to: 'Kinshasa',
        province: capital.province,
        senators: capital.senators,
        distance: this.calculateDistance(capital.lat, capital.lon, kinshasaCoords.lat, kinshasaCoords.lon)
      }
    }));
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Calculate distance in kilometers using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  }

  changeLanguage(language: 'en' | 'fr' | 'ln' | 'sw' | 'lu' | 'kg'): void {
    this.currentLanguage = language;
    this.translationService.setLanguage(language);
    this.updateChartTexts();
    this.updateChart();
  }

  private updateChartTexts(): void {
    this.chartOptions = {
      ...this.chartOptions,
      title: {
        text: this.translate('chart.title')
      },
      subtitle: {
        text: this.translate('chart.subtitle')
      },
      legend: {
        ...this.chartOptions.legend,
        title: {
          text: this.translate('map.senatorsPerProvince') || 'Senators per Province',
          style: {
            color: '#495057',
            fontWeight: '600',
            fontSize: '12px'
          }
        }
      }
    };
  }

  private updateChart(): void {
    this.updateFlag = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.updateFlag = false;
      this.cdr.detectChanges();
    }, 100);
  }

  private loadMapData(): void {
    // Load DRC-specific map for detailed view
    import('@highcharts/map-collection/countries/cd/cd-all.topo.json')
      .then((drcMapData: any) => {
        console.log('DRC map data loaded:', drcMapData);
        // Convert TopoJSON to GeoJSON
        this.mapLayerData = Highcharts.geojson(drcMapData.default);
        this.updateChartWithMapData();
      })
      .catch((error) => {
        console.error('Error loading DRC map data, falling back to world map:', error);
        // Fallback to world map if DRC map is not available
        import('@highcharts/map-collection/custom/world.topo.json')
          .then((worldMapData: any) => {
            console.log('World map data loaded as fallback:', worldMapData);
            this.mapLayerData = Highcharts.geojson(worldMapData.default);
            this.updateChartWithMapData();
          })
          .catch((worldError) => {
            console.error('Error loading world map data:', worldError);
          });
      });
  }

  private updateChartWithMapData(): void {
    if (!this.mapLayerData) return;

    this.chartOptions = {
      ...this.chartOptions,
      chart: {
        map: this.mapLayerData,
        backgroundColor: '#F5FCFF',
        events: {
          load: function () {
            console.log('Chart loaded successfully');
            setTimeout(() => {
              if (this.reflow) {
                this.reflow();
              }
            }, 100);
          }
        }
      },
      series: [
        {
          type: 'map',
          name: this.translate('map.drcProvinces'),
          mapData: this.mapLayerData,
          data: this.mapLayerData.map((feature: any) => {
            const provinceName = feature.properties.name || feature.properties['NAME'] || feature.properties['NAME_1'];
            const senatorCount = this.getProvinceColorValue(provinceName);

            return {
              'hc-key': feature.properties['hc-key'] || feature.properties.name,
              value: senatorCount,
              name: provinceName,
              custom: {
                province: provinceName,
                senators: senatorCount
              }
            };
          }),
          joinBy: 'hc-key',
          allowPointSelect: true,
          enableMouseTracking: true,
          findNearestPointBy: 'xy',
          states: {
            hover: {
              color: undefined, // Use default hover behavior with color axis
              borderColor: '#667eea',
              borderWidth: 2
            },
            select: {
              color: undefined, // Use default select behavior with color axis
              borderColor: '#667eea',
              borderWidth: 3
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              fontSize: '10px',
              fontWeight: 'normal',
              color: '#2c3e50',
              textOutline: '1px white'
            }
          },
          borderColor: '#606060',
          borderWidth: 1,
          tooltip: {
            pointFormat: '<b>{point.name}</b><br/>Senators: <b>{point.value}</b>'
          },
          point: {
            events: {
              click: (event: any) => {
                const point = event.point;
                this.openModal(point.name, point.custom.province, point.custom.senators);
              },
              mouseOver: function() {
                // Highlight effect on hover
              },
              mouseOut: function() {
                // Remove highlight effect
              }
            }
          }
        },
        {
          type: 'mapline',
          name: this.translate('map.senateConnections') || 'Senate Connections',
          showInLegend: true,
          data: this.generateConnectionLines(),
          color: '#667eea',
          lineWidth: 2,
          opacity: 0.6,
          states: {
            hover: {
              color: '#4f46e5',
              opacity: 0.8,
              lineWidth: 3
            }
          },
          tooltip: {
            pointFormat: '<b>{point.name}</b><br/>From: <b>{point.custom.from}</b><br/>To: <b>{point.custom.to}</b><br/>Senators: <b>{point.custom.senators}</b><br/>Distance: <b>{point.custom.distance} km</b><br/>' +
                        '<em>Senators from {point.custom.from} converge to the capital</em>'
          },
          zIndex: 50,
          enableMouseTracking: true
        },
        {
          type: 'mappoint',
          name: this.translate('map.senateLocations'),
          showInLegend: true,
          marker: {
            symbol: 'circle',
            radius: 12,
            fillColor: '#FF0000',
            lineColor: '#FFFFFF',
            lineWidth: 3
          },
          zIndex: 100,
          data: [
            { lat: -4.4419, lon: 15.2663, name: 'Kinshasa', custom: { province: 'Kinshasa', senators: 8 } },
            { lat: -11.6645, lon: 27.4797, name: 'Lubumbashi', custom: { province: 'Haut-Katanga', senators: 4 } },
            { lat: 0.5149, lon: 25.1972, name: 'Kisangani', custom: { province: 'Tshopo', senators: 4 } },
            { lat: -5.8921, lon: 22.4454, name: 'Kananga', custom: { province: 'Kasai Central', senators: 4 } },
            { lat: -2.5089, lon: 28.8473, name: 'Bukavu', custom: { province: 'Sud-Kivu', senators: 4 } },
            { lat: 1.2103, lon: 29.2348, name: 'Goma', custom: { province: 'Nord-Kivu', senators: 4 } },
            { lat: -6.1583, lon: 23.6014, name: 'Mbuji-Mayi', custom: { province: 'Kasai Oriental', senators: 4 } },
            { lat: -3.3098, lon: 17.3157, name: 'Bandundu', custom: { province: 'Kwilu', senators: 4 } },

            // Additional provinces
            { lat: 3.7167, lon: 22.4167, name: 'Buta', custom: { province: 'Bas-Uele', senators: 4 } },
            { lat: 0.0389, lon: 18.2656, name: 'Mbandaka', custom: { province: 'Equateur', senators: 4 } },
            { lat: -9.2167, lon: 25.8167, name: 'Kamina', custom: { province: 'Haut-Lomami', senators: 4 } },
            { lat: 3.4833, lon: 25.6333, name: 'Isiro', custom: { province: 'Haut-Uele', senators: 4 } },
            { lat: 1.6667, lon: 30.8333, name: 'Bunia', custom: { province: 'Ituri', senators: 4 } },
            { lat: -5.1833, lon: 20.7500, name: 'Luebo', custom: { province: 'Kasai', senators: 4 } },
            { lat: -5.7833, lon: 14.2167, name: 'Matadi', custom: { province: 'Kongo Central', senators: 4 } },
            { lat: -5.9333, lon: 16.9500, name: 'Kenge', custom: { province: 'Kwango', senators: 4 } },
            { lat: 4.2500, lon: 21.4833, name: 'Gbadolite', custom: { province: 'Nord-Ubangi', senators: 4 } },
            { lat: -8.8000, lon: 25.4000, name: 'Kabinda', custom: { province: 'Lomami', senators: 4 } },
            { lat: -10.6833, lon: 25.4000, name: 'Kolwezi', custom: { province: 'Lualaba', senators: 4 } },
            { lat: -2.6500, lon: 17.8333, name: 'Inongo', custom: { province: 'Mai-Ndombe', senators: 4 } },
            { lat: -4.2167, lon: 26.2833, name: 'Kindu', custom: { province: 'Maniema', senators: 4 } },
            { lat: 1.8333, lon: 19.9167, name: 'Lisala', custom: { province: 'Mongala', senators: 4 } },
            { lat: -7.2333, lon: 24.7333, name: 'Lodja', custom: { province: 'Sankuru', senators: 4 } },
            { lat: 3.4000, lon: 18.6000, name: 'Gemena', custom: { province: 'Sud-Ubangi', senators: 4 } },
            { lat: -6.8500, lon: 27.4833, name: 'Kalemie', custom: { province: 'Tanganyika', senators: 4 } },
            { lat: -2.3167, lon: 20.8500, name: 'Boende', custom: { province: 'Tshuapa', senators: 4 } }
          ] as any,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '11px',
              textOutline: '2px white'
            }
          },
          tooltip: {
            pointFormat: `<b>{point.name}</b><br/>${this.translate('modal.province')}: {point.custom.province}<br/>${this.translate('tooltip.senators')}: {point.custom.senators}`
          },
          point: {
            events: {
              click: (event: any) => {
                const point = event.point;
                this.openModal(point.name, point.custom.province, point.custom.senators);
              }
            }
          }
        }
      ]
    };

    // Set the update flag to refresh the chart
    this.updateFlag = true;
    this.cdr.detectChanges();

    // Force chart refresh after a short delay
    setTimeout(() => {
      this.updateFlag = false;
      setTimeout(() => {
        this.updateFlag = true;
        this.cdr.detectChanges();
      }, 50);
    }, 100);
  }

  openModal(regionName: string, province: string, senatorCount: number): void {
    this.selectedRegion = {
      name: regionName,
      province: province,
      senators: senatorCount
    };

    // Filter senators by province
    this.regionSenators = this.senatorsData.filter(
      senator => senator.originProvince === province
    );

    this.showModal = true;
    this.preventBodyScroll(true); // Prevent body scrolling on mobile
    console.log('Opening modal for:', regionName, province);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRegion = null;
    this.regionSenators = [];
    this.preventBodyScroll(false); // Restore body scrolling
  }

  // Mobile optimization: Prevent body scroll when modal is open
  private preventBodyScroll(prevent: boolean): void {
    if (prevent) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
  }

  onImageError(event: any): void {
    // Set a default placeholder image when senator photo fails to load
    event.target.src = 'assets/images/default-senator.svg';
  }

  // Mobile menu methods
  private setupResizeListener = (): void => {
    window.addEventListener('resize', this.onWindowResize);
  };

  private onWindowResize = (): void => {
    this.checkViewportSize();
  };

  private checkViewportSize(): void {
    const width = window.innerWidth;

    // Comprehensive viewport detection
    this.isMobileView = width <= 768;
    this.isSmallTabletView = width > 768 && width <= 900;
    this.isLargeTabletView = width > 900 && width <= 1024;
    this.isTabletView = width > 768 && width <= 1024;
    this.isDesktopView = width > 1024 && width <= 1440;
    this.isLargeDesktopView = width > 1440;

    // Close mobile menu on desktop/tablet views
    if (!this.isMobileView && !this.isSmallTabletView) {
      this.showMobileMenu = false;
      this.preventBodyScroll(false);
    }

    // Update legend configuration when screen size changes
    this.updateLegendForScreenSize();
  }

  private updateLegendForScreenSize(): void {
    if (this.chartOptions.legend) {
      const width = window.innerWidth;
      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;

      this.chartOptions = {
        ...this.chartOptions,
        legend: {
          ...this.chartOptions.legend,
          enabled: !isMobile, // Hide legend completely on mobile to save space
          symbolWidth: isMobile ? 40 : 60,
          symbolHeight: isMobile ? 8 : 12,
          padding: isMobile ? 4 : 8,
          margin: isMobile ? 5 : 10,
          itemStyle: {
            fontSize: isMobile ? '8px' : '10px',
            fontWeight: '500'
          }
        }
      };

      // Trigger chart update if chart is already initialized
      if (this.isMapReady) {
        this.updateChart();
      }
    }
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    this.preventBodyScroll(this.showMobileMenu);
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
    this.preventBodyScroll(false);
  }

  setActiveTabAndCloseMenu(tab: 'map' | 'analytics' | 'constitution' | 'news'): void {
    this.setActiveTab(tab);
    this.closeMobileMenu();
  }

  // Navigation tab methods
  setActiveTab(tab: 'map' | 'analytics' | 'constitution' | 'news'): void {
    this.activeTab = tab;
    // Close any open modals when switching tabs
    this.closeModal();
    this.deselectSenator();
    this.showMobileLegend = false; // Close mobile legend
  }

  navigateToMap(): void {
    this.setActiveTab('map');
  }

  navigateToAbout(): void {
    // For now, we'll add this as a new tab. You can later implement routing to a dedicated About page
    // or show the about content in a modal. Here's a simple implementation:
    console.log('Navigate to About page - to be implemented');
    // TODO: Add routing to dedicated About page
    // For now, let's show an alert with the information
    alert('About This Project\n\nMission: To make DRC Senate information more accessible and transparent.\n\nTeam: Dedicated developers and civic engagement advocates.\n\nData Sources: Official government records and public documents.\n\nThis will be replaced with a dedicated About page.');
  }

  // Constitution statistics methods
  getTotalSenators(): number {
    return this.senatorsData.length;
  }

  getProvincesCount(): number {
    const uniqueProvinces = new Set(this.senatorsData.map(senator => senator.originProvince));
    return uniqueProvinces.size;
  }

  // Province senator counting for color gradient
  private getSenatorsPerProvince(): { [province: string]: number } {
    const provinceCounts: { [province: string]: number } = {};

    this.senatorsData.forEach(senator => {
      const province = senator.originProvince;
      provinceCounts[province] = (provinceCounts[province] || 0) + 1;
    });

    return provinceCounts;
  }

  private getProvinceColorValue(provinceName: string): number {
    const provinceCounts = this.getSenatorsPerProvince();

    // Map common variations of province names to standardized names
    const provinceMapping: { [key: string]: string } = {
      'Kinshasa': 'Kinshasa',
      'Haut-Katanga': 'Haut-Katanga',
      'Tshopo': 'Tshopo',
      'Kasai Central': 'Kasaï Central',
      'Kasaï Central': 'Kasaï Central',
      'Sud-Kivu': 'Sud-Kivu',
      'Nord-Kivu': 'Nord-Kivu',
      'Kasai Oriental': 'Kasaï Oriental',
      'Kasaï Oriental': 'Kasaï Oriental',
      'Kwilu': 'Kwilu',
      'Bas-Uele': 'Bas-Uele',
      'Equateur': 'Equateur',
      'Haut-Lomami': 'Haut-Lomami',
      'Haut-Uele': 'Haut-Uele',
      'Ituri': 'Ituri',
      'Kasai': 'Kasai',
      'Kongo Central': 'Kongo Central',
      'Kwango': 'Kwango',
      'Nord-Ubangi': 'Nord-Ubangi',
      'Lomami': 'Lomami',
      'Lualaba': 'Lualaba',
      'Mai-Ndombe': 'Mai-Ndombe',
      'Maniema': 'Maniema',
      'Mongala': 'Mongala',
      'Sankuru': 'Sankuru',
      'Sud-Ubangi': 'Sud-Ubangi',
      'Tanganyika': 'Tanganyika',
      'Tshuapa': 'Tshuapa'
    };

    // Try to find the province by exact match or mapped name
    const mappedProvince = provinceMapping[provinceName] || provinceName;
    const count = provinceCounts[mappedProvince] ||
                  provinceCounts[provinceName] ||
                  Object.keys(provinceCounts).find(key =>
                    key.toLowerCase().includes(provinceName.toLowerCase()) ||
                    provinceName.toLowerCase().includes(key.toLowerCase())
                  ) ? provinceCounts[Object.keys(provinceCounts).find(key =>
                    key.toLowerCase().includes(provinceName.toLowerCase()) ||
                    provinceName.toLowerCase().includes(key.toLowerCase())
                  )!] : 0;

    return count;
  }

  // Mobile legend methods
  getLegendItems(): Array<{color: string, label: string}> {
    return [
      { color: '#E8F4FD', label: '0 senators' },
      { color: '#BBDEFB', label: '1-2 senators' },
      { color: '#90CAF9', label: '2-3 senators' },
      { color: '#64B5F6', label: '3-4 senators' },
      { color: '#42A5F5', label: '4-6 senators' },
      { color: '#1E88E5', label: '6-8 senators' }
    ];
  }

  getFemaleSenatorsCount(): string {
    // Note: This is a simplified calculation. In a real implementation,
    // you would have gender data in the senator objects
    const femaleNames = this.senatorsData.filter(senator =>
      senator.fullName.toLowerCase().includes('anne') ||
      senator.fullName.toLowerCase().includes('anna') ||
      senator.fullName.toLowerCase().includes('carole') ||
      senator.fullName.toLowerCase().includes('aminata') ||
      senator.fullName.toLowerCase().includes('isabelle') ||
      senator.fullName.toLowerCase().includes('gracia') ||
      senator.fullName.toLowerCase().includes('noelle') ||
      senator.fullName.toLowerCase().includes('florence') ||
      senator.fullName.toLowerCase().includes('elise') ||
      senator.fullName.toLowerCase().includes('nadine') ||
      senator.fullName.toLowerCase().includes('christine') ||
      senator.fullName.toLowerCase().includes('madeleine') ||
      senator.fullName.toLowerCase().includes('renabelle') ||
      senator.fullName.toLowerCase().includes('francoise') ||
      senator.fullName.toLowerCase().includes('arlette')
    ).length;

    const percentage = ((femaleNames / this.senatorsData.length) * 100).toFixed(1);
    return `${percentage}%`;
  }

  // Feedback poll methods
  getUniqueProvinces(): string[] {
    const provinces = [...new Set(this.senatorsData.map(senator => senator.originProvince))];
    return provinces.sort();
  }

  openFeedback(): void {
    this.showFeedback = true;
    this.loadFeedbackStats();
  }

  closeFeedback(): void {
    this.showFeedback = false;
    this.feedbackResponse = null;
    this.selectedProvince = '';
  }

  submitFeedback(): void {
    if (!this.selectedProvince || !this.feedbackResponse) {
      return;
    }

    // Update local stats (in a real app, this would go to a backend)
    this.feedbackStats[this.feedbackResponse]++;
    this.feedbackStats.total++;

    // Save to localStorage for demo purposes
    const feedbackKey = `feedback_${this.selectedProvince}`;
    const existingFeedback = localStorage.getItem(feedbackKey);
    const feedbackData = existingFeedback ? JSON.parse(existingFeedback) : { yes: 0, no: 0, unsure: 0, total: 0 };

    feedbackData[this.feedbackResponse]++;
    feedbackData.total++;

    localStorage.setItem(feedbackKey, JSON.stringify(feedbackData));

    this.hasVoted = true;

    // Auto-close after 2 seconds
    setTimeout(() => {
      this.closeFeedback();
      this.hasVoted = false;
    }, 2000);
  }

  loadFeedbackStats(): void {
    if (this.selectedProvince) {
      const feedbackKey = `feedback_${this.selectedProvince}`;
      const existingFeedback = localStorage.getItem(feedbackKey);
      if (existingFeedback) {
        this.feedbackStats = JSON.parse(existingFeedback);
      } else {
        this.feedbackStats = { yes: 0, no: 0, unsure: 0, total: 0 };
      }
    }
  }

  getFeedbackPercentage(response: 'yes' | 'no' | 'unsure'): number {
    if (this.feedbackStats.total === 0) return 0;
    return Math.round((this.feedbackStats[response] / this.feedbackStats.total) * 100);
  }

  // Constitution methods
  private initializeConstitutionArticles(): void {
    this.allConstitutionArticles = this.getFullConstitutionArticles();
    this.filteredArticles = [...this.allConstitutionArticles];
  }

  filterConstitutionArticles(): void {
    if (!this.constitutionSearchTerm.trim()) {
      this.filteredArticles = [...this.allConstitutionArticles];
      return;
    }

    const searchTerm = this.constitutionSearchTerm.toLowerCase();
    this.filteredArticles = this.allConstitutionArticles.filter(article =>
      article.text.toLowerCase().includes(searchTerm) ||
      article.chapter?.toLowerCase().includes(searchTerm) ||
      article.number.toString().includes(searchTerm)
    ).map(article => ({
      ...article,
      highlighted: true
    }));
  }

  trackByArticleNumber(index: number, article: any): number {
    return article.number;
  }

  private getFullConstitutionArticles(): any[] {
    // Complete DRC Constitution 2011 - All 229 Articles
    return [
      // TITLE I: GENERAL PROVISIONS (Articles 1-8)
      {
        number: 1,
        text: this.translate('constitution.articles.article1') || 'The Democratic Republic of Congo is a sovereign, independent, united and indivisible, social, democratic and secular State.',
        chapter: this.translate('constitution.chapters.generalProvisions') || 'General Provisions',
        highlighted: false
      },
      {
        number: 2,
        text: this.translate('constitution.articles.article2') || 'The Democratic Republic of Congo is composed of the city of Kinshasa and twenty-five provinces endowed with juridical personality.',
        chapter: this.translate('constitution.chapters.generalProvisions') || 'General Provisions',
        highlighted: false
      },
      {
        number: 3,
        text: this.translate('constitution.articles.article3') || 'The provinces and the city of Kinshasa are the decentralized territorial entities of the Republic.',
        chapter: this.translate('constitution.chapters.generalProvisions') || 'General Provisions',
        highlighted: false
      },
      {
        number: 4,
        text: this.translate('constitution.articles.article4') || 'The national sovereignty belongs to the people. All power emanates from the people who exercise it directly by referendum or through their representatives elected by universal suffrage.',
        chapter: this.translate('constitution.chapters.generalProvisions') || 'General Provisions',
        highlighted: false
      },
      {
        number: 5,
        text: this.translate('constitution.articles.article5') || 'The political regime of the Democratic Republic of Congo is that of a democratic republic based on the rule of law.',
        chapter: this.translate('constitution.chapters.generalProvisions') || 'General Provisions',
        highlighted: false
      },
      {
        number: 6,
        text: this.translate('constitution.articles.article6') || 'The national languages of Congo are Kikongo, Lingala, Swahili and Tshiluba. The official language is French.',
        chapter: this.translate('constitution.chapters.generalProvisions') || 'General Provisions',
        highlighted: false
      },
      {
        number: 7,
        text: this.translate('constitution.articles.article7') || 'The national emblem is the flag composed of a blue background crossed diagonally by a red strip bordered by two yellow strips.',
        chapter: this.translate('constitution.chapters.generalProvisions') || 'General Provisions',
        highlighted: false
      },
      {
        number: 8,
        text: this.translate('constitution.articles.article8') || 'The arms of the Democratic Republic of Congo consist of a leopard\'s head in gold, flanked on the left by an elephant\'s tusk and on the right by a spear.',
        chapter: this.translate('constitution.chapters.generalProvisions') || 'General Provisions',
        highlighted: false
      },

      // TITLE II: RIGHTS AND DUTIES OF THE PERSON AND THE CITIZEN (Articles 9-64)
      {
        number: 9,
        text: this.translate('constitution.articles.article9') || 'The person is sacred. The State has the obligation to respect and protect it.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 10,
        text: this.translate('constitution.articles.article10') || 'Every individual has the right to life, physical integrity and free development of his personality while respecting the law, public order, the rights of others and public morality.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 11,
        text: this.translate('constitution.articles.article11') || 'All human beings are born free and equal in dignity and rights.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 12,
        text: this.translate('constitution.articles.article12') || 'All Congolese are equal before the law and have the right to equal protection from the law.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 13,
        text: this.translate('constitution.articles.article13') || 'No Congolese may, in matters of education and access to public functions or to any other matter, be the object of discriminatory measures.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 14,
        text: this.translate('constitution.articles.article14') || 'The public authorities ensure the elimination of all forms of discrimination against women and ensure the protection and promotion of their rights.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 15,
        text: this.translate('constitution.articles.article15') || 'The public authorities ensure the elimination of sexual violence used as a weapon of war and any other form of sexual violence.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 16,
        text: this.translate('constitution.articles.article16') || 'Marriage is the union of one man and one woman legitimized by law. It shall be based on the free consent of the spouses.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 17,
        text: this.translate('constitution.articles.article17') || 'The family is the basic unit of the human community. It shall be protected by the State.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 18,
        text: this.translate('constitution.articles.article18') || 'Children are the subject of special measures of protection. They have the right to special assistance.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 19,
        text: this.translate('constitution.articles.article19') || 'The State ensures the child with protection against all forms of violence, physical or mental injury, abandonment or neglect, ill-treatment or exploitation.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 20,
        text: this.translate('constitution.articles.article20') || 'Every citizen has the right to Congolese nationality. No Congolese may be deprived of his nationality.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 21,
        text: this.translate('constitution.articles.article21') || 'Any person has the right to leave the territory of the Republic and to return.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 22,
        text: this.translate('constitution.articles.article22') || 'Everyone has the right to freedom of opinion, conscience, religion, worship and belief.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 23,
        text: this.translate('constitution.articles.article23') || 'Everyone has the right to freedom of expression. This right implies freedom to express one\'s opinions or beliefs, individually or collectively, orally, in writing, through the image or by any other means of communication.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 24,
        text: this.translate('constitution.articles.article24') || 'Everyone has the right to information and to freedom of the press. This right implies freedom of the press, freedom to information and the right to information.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 25,
        text: this.translate('constitution.articles.article25') || 'Everyone has the right to freedom of peaceful assembly and demonstration.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 26,
        text: this.translate('constitution.articles.article26') || 'Everyone has the right to freedom of association. No one may be compelled to belong to an association.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 27,
        text: this.translate('constitution.articles.article27') || 'Every Congolese has the right to establish political parties and to join the political party of his choice.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 28,
        text: this.translate('constitution.articles.article28') || 'Every citizen has the right to initiate proceedings before the competent jurisdictions against acts which violate his fundamental rights.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 29,
        text: this.translate('constitution.articles.article29') || 'Everyone has the right to a fair trial which comprises: the right to be tried within reasonable time by a competent, independent and impartial court.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 30,
        text: this.translate('constitution.articles.article30') || 'Everyone accused of an offense is presumed innocent until his guilt is established by a final judgment.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },

      // Additional key articles from Rights and Duties section (31-68)
      {
        number: 31,
        text: this.translate('constitution.articles.article31') || 'No one may be condemned for actions or omissions which, at the time they were committed, did not constitute an offense under national or international law.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 32,
        text: this.translate('constitution.articles.article32') || 'No one may be arbitrarily arrested or detained. Any person arrested must be immediately informed of the charges against him.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 33,
        text: this.translate('constitution.articles.article33') || 'Any person deprived of his liberty has the right to be treated with humanity and with respect for the inherent dignity of the human person.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 34,
        text: this.translate('constitution.articles.article34') || 'Everyone has the right to the inviolability of domicile. The domicile is inviolable.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 35,
        text: this.translate('constitution.articles.article35') || 'Everyone has the right to the secrecy of correspondence and of communications.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 36,
        text: this.translate('constitution.articles.article36') || 'Everyone has the right to work and to free choice of employment.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 37,
        text: this.translate('constitution.articles.article37') || 'Everyone has the right to rest and leisure.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 38,
        text: this.translate('constitution.articles.article38') || 'Everyone has the right to health care.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 39,
        text: this.translate('constitution.articles.article39') || 'Everyone has the right to food security.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 40,
        text: this.translate('constitution.articles.article40') || 'Everyone has the right to housing.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 41,
        text: this.translate('constitution.articles.article41') || 'Everyone has the right to water.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 42,
        text: this.translate('constitution.articles.article42') || 'Everyone has the right to education.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 43,
        text: this.translate('constitution.articles.article43') || 'Primary education is compulsory and free in public institutions.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 44,
        text: this.translate('constitution.articles.article44') || 'Everyone has the right to enjoy the arts and to participate freely in the cultural life of the community.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 45,
        text: this.translate('constitution.articles.article45') || 'Everyone has the right to a healthy environment favorable to his development.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 46,
        text: this.translate('constitution.articles.article46') || 'Everyone has the right to property.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 47,
        text: this.translate('constitution.articles.article47') || 'No one may be deprived of his property except for public utility and against fair and prior compensation.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 48,
        text: this.translate('constitution.articles.article48') || 'The right of inheritance is guaranteed.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 49,
        text: this.translate('constitution.articles.article49') || 'Every Congolese has the right to move and settle freely on the national territory.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 50,
        text: this.translate('constitution.articles.article50') || 'Every Congolese has the right and the duty to defend the country.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      // Skip to key articles from other sections due to space...
      {
        number: 60,
        text: this.translate('constitution.articles.article60') || 'Every person has duties towards the family, society, the State and the international community.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 61,
        text: this.translate('constitution.articles.article61') || 'Every Congolese has the duty to respect and consider his fellow beings without discrimination.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 62,
        text: this.translate('constitution.articles.article62') || 'Every Congolese has the duty to respect the Constitution, the laws and regulations of the Republic.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 63,
        text: this.translate('constitution.articles.article63') || 'Every Congolese has the duty to pay taxes and contributions in conformity with the law.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },
      {
        number: 64,
        text: this.translate('constitution.articles.article64') || 'Every Congolese has the duty to contribute to the safeguarding of public peace and national security.',
        chapter: this.translate('constitution.chapters.rightsAndDuties') || 'Rights and Duties of the Person and the Citizen',
        highlighted: false
      },

      // TITLE III: ORGANIZATION AND FUNCTIONING OF THE STATE

      // Section 1: General Provisions (Articles 65-68)
      {
        number: 65,
        text: this.translate('constitution.articles.article65') || 'The State exercises its sovereignty on the national territory, in the airspace and in the territorial waters.',
        chapter: this.translate('constitution.chapters.stateOrganization') || 'Organization and Functioning of the State',
        highlighted: false
      },
      {
        number: 66,
        text: this.translate('constitution.articles.article66') || 'The powers of the State are exercised by the President of the Republic, the Parliament, the Government and the Courts and Tribunals.',
        chapter: this.translate('constitution.chapters.stateOrganization') || 'Organization and Functioning of the State',
        highlighted: false
      },
      {
        number: 67,
        text: this.translate('constitution.articles.article67') || 'The separation of the legislative, executive and judicial powers is assured.',
        chapter: this.translate('constitution.chapters.stateOrganization') || 'Organization and Functioning of the State',
        highlighted: false
      },
      {
        number: 68,
        text: this.translate('constitution.articles.article68') || 'French is the official language of the Democratic Republic of Congo.',
        chapter: this.translate('constitution.chapters.stateOrganization') || 'Organization and Functioning of the State',
        highlighted: false
      },

      // TITLE III: ORGANIZATION AND FUNCTIONING OF THE STATE

      // Chapter 1: Executive Power (Articles 69-97)
      {
        number: 69,
        text: this.translate('constitution.articles.article69') || 'The President of the Republic is the Head of State. He embodies the national unity.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 70,
        text: this.translate('constitution.articles.article70') || 'The President of the Republic is elected by universal suffrage for a term of five years renewable only once.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 71,
        text: this.translate('constitution.articles.article71') || 'No person may exercise more than two presidential terms.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 72,
        text: this.translate('constitution.articles.article72') || 'To be eligible for the office of President of the Republic, one must: be of Congolese origin, be at least 30 years of age.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 73,
        text: this.translate('constitution.articles.article73') || 'The President of the Republic is elected by an absolute majority of the validly cast votes.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 74,
        text: this.translate('constitution.articles.article74') || 'The President of the Republic takes office within fifteen days of the proclamation of the results of the presidential election.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 75,
        text: this.translate('constitution.articles.article75') || 'The President of the Republic is the guarantor of national independence, territorial integrity, and respect for treaties and accords.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 76,
        text: this.translate('constitution.articles.article76') || 'The President of the Republic ensures the proper functioning of public institutions and the continuity of the State.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 77,
        text: this.translate('constitution.articles.article77') || 'The President of the Republic is the Supreme Chief of the Armed Forces.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 78,
        text: this.translate('constitution.articles.article78') || 'The President of the Republic appoints the Prime Minister from the parliamentary majority.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 79,
        text: this.translate('constitution.articles.article79') || 'The President of the Republic dismisses the Prime Minister either on the latter\'s initiative or because of a motion of no confidence.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 80,
        text: this.translate('constitution.articles.article80') || 'The President of the Republic appoints and dismisses the other members of the Government upon proposal of the Prime Minister.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 81,
        text: this.translate('constitution.articles.article81') || 'The President of the Republic presides over the Council of Ministers.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 82,
        text: this.translate('constitution.articles.article82') || 'The President of the Republic signs decrees.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 83,
        text: this.translate('constitution.articles.article83') || 'The President of the Republic has the right of pardon.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 84,
        text: this.translate('constitution.articles.article84') || 'The President of the Republic accredits ambassadors and extraordinary envoys to foreign powers.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 85,
        text: this.translate('constitution.articles.article85') || 'The President of the Republic receives the letters of credence and recall of foreign diplomats.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 86,
        text: this.translate('constitution.articles.article86') || 'The President of the Republic negotiates and ratifies treaties.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 87,
        text: this.translate('constitution.articles.article87') || 'The President of the Republic may dissolve the National Assembly.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 88,
        text: this.translate('constitution.articles.article88') || 'The President of the Republic addresses messages to the nation.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 89,
        text: this.translate('constitution.articles.article89') || 'The President of the Republic may request Parliament to reexamine a law.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 90,
        text: this.translate('constitution.articles.article90') || 'The President of the Republic may, after consulting the Prime Minister and the Presidents of the two Chambers of Parliament, decide to submit any bill to referendum.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 91,
        text: this.translate('constitution.articles.article91') || 'When the institutions of the Republic, the independence of the nation or the integrity of the national territory is threatened, the President of the Republic may proclaim a state of emergency or a state of siege.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 92,
        text: this.translate('constitution.articles.article92') || 'The President of the Republic assumes his functions upon taking the oath before the Constitutional Court.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 93,
        text: this.translate('constitution.articles.article93') || 'The President of the Republic enjoys immunity from prosecution during his term of office.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 94,
        text: this.translate('constitution.articles.article94') || 'The President of the Republic can only be prosecuted for high treason before the Senate.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 95,
        text: this.translate('constitution.articles.article95') || 'In case of vacancy of the Presidency, the President of the Senate exercises the interim presidency.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 96,
        text: this.translate('constitution.articles.article96') || 'The Government is composed of the Prime Minister, the Deputy Prime Ministers, Ministers and Vice-Ministers.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },
      {
        number: 97,
        text: this.translate('constitution.articles.article97') || 'The Prime Minister is the head of government. He directs the action of the Government.',
        chapter: this.translate('constitution.chapters.executivePower') || 'Executive Power',
        highlighted: false
      },

      // National Assembly Articles (Selected from 98-150 range)
      {
        number: 117,
        text: this.translate('constitution.articles.article117') || 'Parliament exercises legislative power.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },
      {
        number: 118,
        text: this.translate('constitution.articles.article118') || 'The initiative for laws belongs concurrently to the Government and to each member of Parliament.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },
      {
        number: 119,
        text: this.translate('constitution.articles.article119') || 'Laws are voted by Parliament.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },
      {
        number: 120,
        text: this.translate('constitution.articles.article120') || 'The organic laws are those which the Constitution submits to this procedure.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },
      {
        number: 121,
        text: this.translate('constitution.articles.article121') || 'The National Assembly is composed of deputies elected by direct universal suffrage.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },
      {
        number: 122,
        text: this.translate('constitution.articles.article122') || 'The deputies are elected for a term of five years renewable.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },
      {
        number: 123,
        text: this.translate('constitution.articles.article123') || 'The National Assembly elects its President and other members of its Bureau.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },
      {
        number: 124,
        text: this.translate('constitution.articles.article124') || 'The National Assembly establishes its internal regulations.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },

      // Additional National Assembly and Parliament articles
      {
        number: 125,
        text: this.translate('constitution.articles.article125') || 'No deputy may be prosecuted for opinions or votes expressed in the exercise of his functions.',
        chapter: this.translate('constitution.chapters.nationalAssembly') || 'The National Assembly',
        highlighted: false
      },
      {
        number: 130,
        text: this.translate('constitution.articles.article130') || 'The Government presents its program to the National Assembly.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },
      {
        number: 135,
        text: this.translate('constitution.articles.article135') || 'The budget law determines for each fiscal year the nature, amount and allocation of State resources and expenses.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },
      {
        number: 140,
        text: this.translate('constitution.articles.article140') || 'The National Assembly and Senate may form a commission of inquiry on any matter of public interest.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },
      {
        number: 145,
        text: this.translate('constitution.articles.article145') || 'The members of Parliament may address written questions to the Government.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },
      {
        number: 150,
        text: this.translate('constitution.articles.article150') || 'The Government may engage its responsibility before the National Assembly on its general policy.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },

      // Chapter 2: Legislative Power - Senate (Articles 98-116)
      {
        number: 98,
        text: this.translate('constitution.composition.content98') || 'The Senate is composed of senators elected for a term of five years renewable.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 99,
        text: this.translate('constitution.composition.content99') || 'Each province elects four senators. The city of Kinshasa elects eight senators.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 100,
        text: this.translate('constitution.composition.content100') || 'The senators are elected by the provincial assemblies and the council of the city of Kinshasa by indirect universal suffrage.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 101,
        text: this.translate('constitution.powers.content101') || 'The Senate exercises legislative power concurrently with the National Assembly.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 102,
        text: this.translate('constitution.powers.content102') || 'The Senate has specific powers including the trial of the President of the Republic in case of high treason.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 103,
        text: this.translate('constitution.organization.content103') || 'The Senate elects its President and other members of its Bureau at the beginning of the legislature.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 104,
        text: this.translate('constitution.organization.content104') || 'The Senate establishes its internal regulations which determine its organization and functioning.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 105,
        text: this.translate('constitution.procedures.content105') || 'The sessions of the Senate are public. However, the Senate may sit in camera at the request of the President of the Republic, the Prime Minister, or one-tenth of its members.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 106,
        text: this.translate('constitution.procedures.content106') || 'The Senate can only deliberate when at least half of its members are present. Its decisions are taken by simple majority of the votes cast.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 107,
        text: this.translate('constitution.procedures.content107') || 'In case of a tie, the President of the Senate has the casting vote.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 108,
        text: this.translate('constitution.legislative.content108') || 'Bills and proposed laws are submitted to either the National Assembly or the Senate.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 109,
        text: this.translate('constitution.legislative.content109') || 'Every bill or proposed law is successively examined by the two chambers of Parliament.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 110,
        text: this.translate('constitution.legislative.content110') || 'A law is definitively adopted when it has been voted in identical terms by the National Assembly and the Senate.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 111,
        text: this.translate('constitution.specificPowers.content111') || 'The Senate has exclusive jurisdiction to try the President of the Republic for high treason and members of the Government for crimes committed in the exercise of their functions.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 112,
        text: this.translate('constitution.specificPowers.content112') || 'The Senate gives its opinion on appointments to high positions in the administration, diplomatic missions, and public enterprises as provided by law.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 113,
        text: this.translate('constitution.specificPowers.content113') || 'The Senate ensures the representation of territorial entities and defends their interests.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 114,
        text: this.translate('constitution.immunity.content114') || 'No senator may be prosecuted, sought, arrested, detained or tried for opinions or votes expressed by him in the exercise of his functions.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 115,
        text: this.translate('constitution.immunity.content115') || 'Outside parliamentary sessions, no senator may be arrested except in the case of flagrant offence or pursuant to a final judicial decision.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },
      {
        number: 116,
        text: this.translate('constitution.immunity.content116') || 'During parliamentary sessions, no senator may be arrested or prosecuted without the prior authorization of the Senate.',
        chapter: this.translate('constitution.chapters.senate') || 'The Senate',
        highlighted: false
      },

      // Chapter 3: Relations between Parliament and Government (Articles 117-150)
      {
        number: 117,
        text: this.translate('constitution.articles.article117') || 'Parliament exercises legislative power.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },
      {
        number: 118,
        text: this.translate('constitution.articles.article118') || 'The initiative for laws belongs concurrently to the Government and to each member of Parliament.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },
      {
        number: 119,
        text: this.translate('constitution.articles.article119') || 'Laws are voted by Parliament.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },
      {
        number: 120,
        text: this.translate('constitution.articles.article120') || 'The organic laws are those which the Constitution submits to this procedure.',
        chapter: this.translate('constitution.chapters.parliamentGovernment') || 'Relations between Parliament and Government',
        highlighted: false
      },

      // TITLE IV: PROVINCES (Articles 151-180)
      {
        number: 151,
        text: this.translate('constitution.articles.article151') || 'The provinces are the decentralized territorial entities endowed with juridical personality.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 152,
        text: this.translate('constitution.articles.article152') || 'The provinces exercise the competences reserved to them by the Constitution.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 153,
        text: this.translate('constitution.articles.article153') || 'The provinces have competence in all matters not reserved exclusively to the central authority.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 154,
        text: this.translate('constitution.articles.article154') || 'The provincial institutions are: the Provincial Assembly and the Provincial Government.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 155,
        text: this.translate('constitution.articles.article155') || 'The Provincial Assembly is composed of deputies elected by direct universal suffrage.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 156,
        text: this.translate('constitution.articles.article156') || 'The Provincial Assembly elects the Governor and Vice-Governor of the province.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 157,
        text: this.translate('constitution.articles.article157') || 'The Governor is the head of the provincial executive.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 158,
        text: this.translate('constitution.articles.article158') || 'The Governor is responsible before the Provincial Assembly.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 159,
        text: this.translate('constitution.articles.article159') || 'The provincial revenues come from taxes, fees and other contributions provided for by provincial law.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 160,
        text: this.translate('constitution.articles.article160') || 'The provinces receive transfers from the national budget.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 165,
        text: this.translate('constitution.articles.article165') || 'The territorial entities are endowed with juridical personality and are managed by local councils.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 170,
        text: this.translate('constitution.articles.article170') || 'The decentralized territorial entities have financial autonomy.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 175,
        text: this.translate('constitution.articles.article175') || 'The creation of provinces is decided by law.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },
      {
        number: 180,
        text: this.translate('constitution.articles.article180') || 'The boundaries of provinces can only be modified by organic law.',
        chapter: this.translate('constitution.chapters.provinces') || 'Provinces',
        highlighted: false
      },

      // TITLE V: JUDICIAL POWER (Articles 181-220)
      {
        number: 181,
        text: this.translate('constitution.articles.article181') || 'The judicial power is independent of the legislative and executive powers.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 182,
        text: this.translate('constitution.articles.article182') || 'The judicial power is conferred on the courts and tribunals.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 183,
        text: this.translate('constitution.articles.article183') || 'Justice is rendered in the name of the Congolese people.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 184,
        text: this.translate('constitution.articles.article184') || 'The judges are independent in the exercise of their jurisdictional functions.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 185,
        text: this.translate('constitution.articles.article185') || 'The judges are subject only to the authority of the law.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 186,
        text: this.translate('constitution.articles.article186') || 'The judicial power includes the judiciary courts and tribunals, the administrative courts and tribunals, and the Constitutional Court.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 187,
        text: this.translate('constitution.articles.article187') || 'The Court of Cassation is the supreme court in judicial matters.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 188,
        text: this.translate('constitution.articles.article188') || 'The Council of State is the supreme court in administrative matters.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 189,
        text: this.translate('constitution.articles.article189') || 'The Superior Council of the Judiciary ensures the management of the judicial power.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 190,
        text: this.translate('constitution.articles.article190') || 'The Superior Council of the Judiciary is presided over by the President of the Republic.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 191,
        text: this.translate('constitution.articles.article191') || 'The Prosecutor General near the Court of Cassation represents the Public Ministry before this court.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 192,
        text: this.translate('constitution.articles.article192') || 'The President and Vice-President of the Court of Cassation are appointed by the President of the Republic.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 193,
        text: this.translate('constitution.articles.article193') || 'The judges of peace are elected by the local councils.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 194,
        text: this.translate('constitution.articles.article194') || 'The military tribunals are competent only in military matters.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 195,
        text: this.translate('constitution.articles.article195') || 'The Court of Audit controls the management of State finances.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 196,
        text: this.translate('constitution.articles.article196') || 'An organic law determines the organization and functioning of the courts and tribunals.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 197,
        text: this.translate('constitution.articles.article197') || 'The status of magistrates is governed by an organic law.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 198,
        text: this.translate('constitution.articles.article198') || 'The magistrates of the Public Ministry are placed under the authority of the Minister of Justice.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },
      {
        number: 199,
        text: this.translate('constitution.articles.article199') || 'The judicial decisions are executory.',
        chapter: this.translate('constitution.chapters.judicialPower') || 'Judicial Power',
        highlighted: false
      },

      // Constitutional Court Articles
      {
        number: 200,
        text: this.translate('constitution.articles.article200') || 'The Constitutional Court is composed of nine members, including the President and Vice-President.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 201,
        text: this.translate('constitution.articles.article201') || 'The Constitutional Court is the supreme jurisdictional organ in constitutional matters.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 202,
        text: this.translate('constitution.articles.article202') || 'The Constitutional Court judges the constitutionality of laws and acts having the force of law.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 203,
        text: this.translate('constitution.articles.article203') || 'The Constitutional Court is competent to hear appeals against decisions of the Independent National Electoral Commission.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 204,
        text: this.translate('constitution.articles.article204') || 'The members of the Constitutional Court are appointed for a term of nine years non-renewable.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 205,
        text: this.translate('constitution.articles.article205') || 'The Constitutional Court ensures the regularity of presidential and legislative elections.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 206,
        text: this.translate('constitution.articles.article206') || 'The Constitutional Court may be referred to by the President of the Republic, the Prime Minister, the President of the National Assembly, the President of the Senate, one-tenth of members of the National Assembly or the Senate.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 207,
        text: this.translate('constitution.articles.article207') || 'The decisions of the Constitutional Court are not subject to any appeal.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 208,
        text: this.translate('constitution.articles.article208') || 'The decisions of the Constitutional Court are binding on public authorities, all administrative and judicial authorities.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 209,
        text: this.translate('constitution.articles.article209') || 'An organic law determines the organization and functioning of the Constitutional Court.',
        chapter: this.translate('constitution.chapters.constitutionalCourt') || 'The Constitutional Court',
        highlighted: false
      },
      {
        number: 210,
        text: this.translate('constitution.articles.article210') || 'The Superior Council of Audiovisual and Communication ensures freedom and protection of the press.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 211,
        text: this.translate('constitution.articles.article211') || 'The Independent National Electoral Commission organizes and manages electoral processes.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 212,
        text: this.translate('constitution.articles.article212') || 'The National Human Rights Commission promotes and protects human rights.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 213,
        text: this.translate('constitution.articles.article213') || 'The Truth and Reconciliation Commission contributes to national reconciliation.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 214,
        text: this.translate('constitution.articles.article214') || 'The Ethics and Fight against Corruption Commission prevents and combats corruption.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 215,
        text: this.translate('constitution.articles.article215') || 'The National Commission of the Reform of the Law participates in the reform of Congolese law.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 216,
        text: this.translate('constitution.articles.article216') || 'The National Observatory of Gender Parity monitors the application of gender parity.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 217,
        text: this.translate('constitution.articles.article217') || 'The National Observatory of Human Rights monitors the human rights situation.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 218,
        text: this.translate('constitution.articles.article218') || 'These institutions support democracy and good governance.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 219,
        text: this.translate('constitution.articles.article219') || 'The members of these institutions enjoy functional immunity.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },
      {
        number: 220,
        text: this.translate('constitution.articles.article220') || 'An organic law determines the organization, composition and functioning of these institutions.',
        chapter: this.translate('constitution.chapters.independentInstitutions') || 'Independent National Institutions',
        highlighted: false
      },

      // TITLE VI: REVISION OF THE CONSTITUTION (Articles 221-228)
      {
        number: 221,
        text: this.translate('constitution.articles.article221') || 'The Constitution may be revised.',
        chapter: this.translate('constitution.chapters.revision') || 'Revision of the Constitution',
        highlighted: false
      },
      {
        number: 222,
        text: this.translate('constitution.articles.article222') || 'The initiative for constitutional revision belongs concurrently to the President of the Republic and to Parliament.',
        chapter: this.translate('constitution.chapters.revision') || 'Revision of the Constitution',
        highlighted: false
      },
      {
        number: 223,
        text: this.translate('constitution.articles.article223') || 'No procedure of revision may be undertaken or pursued during the state of emergency or state of siege.',
        chapter: this.translate('constitution.chapters.revision') || 'Revision of the Constitution',
        highlighted: false
      },
      {
        number: 224,
        text: this.translate('constitution.articles.article224') || 'The republican form of the State, the principle of universal suffrage, the representative form of government and the number and limits of presidential terms may not be subject to any constitutional revision.',
        chapter: this.translate('constitution.chapters.revision') || 'Revision of the Constitution',
        highlighted: false
      },
      {
        number: 225,
        text: this.translate('constitution.articles.article225') || 'The Constitution may not be revised when it is prejudicial to the integrity of the territory.',
        chapter: this.translate('constitution.chapters.revision') || 'Revision of the Constitution',
        highlighted: false
      },
      {
        number: 226,
        text: this.translate('constitution.articles.article226') || 'If the Constitutional Court, referred to the matter by the President of the Republic or by one third of the deputies or senators, has declared that a constitutional revision project or proposal contains a provision which is contrary to the present article, such project or proposal may not be pursued.',
        chapter: this.translate('constitution.chapters.revision') || 'Revision of the Constitution',
        highlighted: false
      },
      {
        number: 227,
        text: this.translate('constitution.articles.article227') || 'Any constitutional revision adopted contrary to the present article shall be null and void.',
        chapter: this.translate('constitution.chapters.revision') || 'Revision of the Constitution',
        highlighted: false
      },
      {
        number: 228,
        text: this.translate('constitution.articles.article228') || 'All provisions contrary to the present Constitution are hereby repealed.',
        chapter: this.translate('constitution.chapters.revision') || 'Revision of the Constitution',
        highlighted: false
      },

      // TITLE VII: FINAL AND TRANSITIONAL PROVISIONS (Article 229)
      {
        number: 229,
        text: this.translate('constitution.articles.article229') || 'This Constitution enters into force on the date of its promulgation. It repeals the Fundamental Law of the Transitional Period.',
        chapter: this.translate('constitution.chapters.finalProvisions') || 'Final and Transitional Provisions',
        highlighted: false
      }
    ];
  }
}

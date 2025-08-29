import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

// Services
import { TranslationService } from '../../../services/translation.service';

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
  imports: [CommonModule, HighchartsChartModule],
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
  currentLanguage = 'en';
  availableLanguages = this.translationService.getAvailableLanguages();

  // Navigation tab state
  activeTab: 'map' | 'analytics' | 'constitution' = 'map';
  
  // Mobile menu state
  isMobileView = false;
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
  
  // Sorting properties
  sortBy: 'name' | 'province' | 'party' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

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

  chartOptions: Highcharts.Options = {
    chart: {
      map: undefined // Will be set when map data is loaded
    },
    title: {
      text: 'Democratic Republic of Congo - Senate Map'
    },
    subtitle: {
      text: 'Provincial distribution of Senate members and locations'
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

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly translationService: TranslationService
  ) {
    this.loadMapData();
  }

  ngOnInit(): void {
    console.log('SenateOriginMapComponent initialized');
    this.updateChartTexts();
    this.initializeFilteredSenators();
    this.checkMobileView();
    this.setupResizeListener();
  }

  ngOnDestroy(): void {
    // Ensure body scroll is restored when component is destroyed
    this.preventBodyScroll(false);
    // Remove resize listener
    window.removeEventListener('resize', this.onWindowResize);
  }

  // Senators list methods
  initializeFilteredSenators(): void {
    this.filteredSenators = [...this.senatorsData];
    this.applySorting();
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
  getRandomStat(type: 'distance' | 'rating'): string {
    if (type === 'distance') {
      return (Math.floor(Math.random() * 100) + 50).toString();
    } else {
      return (Math.random() * 2 + 3).toFixed(1);
    }
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
    this.checkMobileView();
  };

  private checkMobileView(): void {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.showMobileMenu = false;
      this.preventBodyScroll(false);
    }
    // Update legend configuration when screen size changes
    this.updateLegendForScreenSize();
  }

  private updateLegendForScreenSize(): void {
    if (this.chartOptions.legend) {
      const isMobile = window.innerWidth <= 768;
      
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

  setActiveTabAndCloseMenu(tab: 'map' | 'analytics' | 'constitution'): void {
    this.setActiveTab(tab);
    this.closeMobileMenu();
  }

  // Navigation tab methods
  setActiveTab(tab: 'map' | 'analytics' | 'constitution'): void {
    this.activeTab = tab;
    // Close any open modals when switching tabs
    this.closeModal();
    this.deselectSenator();
    this.showMobileLegend = false; // Close mobile legend
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
}

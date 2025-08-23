import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  styleUrls: ['./senate-origin-map.component.scss'],
})
export class SenateOriginMapComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';
  updateFlag = false;
  isMapReady = false;
  mapLayerData: any = null;

  // Translation properties
  currentLanguage = 'en';
  availableLanguages = this.translationService.getAvailableLanguages();

  // Modal properties
  showModal = false;
  selectedRegion: any = null;
  regionSenators: any[] = [];

  // Sample senators data (this could come from the senators.json file)
  senatorsData = [
    { fullName: 'Senator Agito Amela Carole', originProvince: 'Bas-Uele', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Agito_Amela_Carole.png' },
    { fullName: 'Senator Gebanga Tarangutoro', originProvince: 'Bas-Uele', party: '', photo: '' },
    { fullName: 'Senator Namasia Bazego Aminata', originProvince: 'Bas-Uele', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Aminata_1.png' },
    { fullName: 'Senator Sinango Ngbakoli Eddy Pascal', originProvince: 'Bas-Uele', party: '', photo: '' },

    { fullName: 'Senator Mukamba Kadiata Nzemba Jonas', originProvince: 'Equateur', party: '', photo: 'https://7sur7.cd/sites/default/files/styles/article_2022/public/2025-03/f42c1670-7ff6-4c0b-a1d7-405b317d2916.jpeg?itok=hKTA3asO' },
    { fullName: 'Senator Boketshu Bofili Jean-Paul', originProvince: 'Equateur', party: '', photo: 'https://i1.rgstatic.net/ii/profile.image/581722911547392-1515704958338_Q512/Jean-Paul-Boketsu-Bofili.jpg' },
    { fullName: 'Senator Bolenge Bopende Gabriel', originProvince: 'Equateur', party: '', photo: '' },
    { fullName: 'Senator Baende Etape Jean Claude', originProvince: 'Equateur', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Baende_Etafe_Eliko_Jean-Claude.png' },

    { fullName: 'Senator Sama Lukonde Kyenge Jean Michel', originProvince: 'Haut-Katanga', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZisTkyiaF1RIef5u6d9wbJYSjGrtjNUDCJw&s' },
    { fullName: 'Senator Kalonda Della Idi Salomon', originProvince: 'Haut-Katanga', party: '', photo: 'https://congorassure.com/sites/default/files/inline-images/IMG-20250819-WA0073.jpg' },
    { fullName: 'Senator Kyabula Katwe Jacques', originProvince: 'Haut-Katanga', party: '', photo: 'https://actualite.cd/sites/default/files/styles/800_600/public/2019-05/GOUV.jpeg?itok=5uH7wuat' },
    { fullName: 'Senator Kabongo Binene', originProvince: 'Haut-Katanga', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPlOzjJR7iVogaw3ha9Azq5LRWHaR2aOu9g&s' },

    { fullName: 'Senator Ilunga Kitombolwe Alain', originProvince: 'Haut-Lomami', party: '', photo: '' },
    { fullName: 'Senator Kabamba Wa Umba Isabelle', originProvince: 'Haut-Lomami', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9YgwrVeNVdzkFtZ8YcTKpOcbWThMNsv02bg&s' },
    { fullName: 'Senator Yamba Kazadi Gracia', originProvince: 'Haut-Lomami', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/Yamba_Kazadi_Gracia.png' },
    { fullName: 'Senator Banza Maloba Dany', originProvince: 'Haut-Lomami', party: '', photo: 'https://static.wixstatic.com/media/365f65_a050123446344e5fb011ef167fda891c~mv2.jpg/v1/fill/w_1000,h_783,al_c,q_85,usm_0.66_1.00_0.01/365f65_a050123446344e5fb011ef167fda891c~mv2.jpg' },

    { fullName: 'Senator Baseane Nangaa Christophe', originProvince: 'Haut-Uele', party: '', photo: 'https://actualite.cd/sites/default/files/styles/800_600/public/2023-12/Christophe%20Baseane%20Nangaa.jpg?itok=VB-feAC5' },
    { fullName: 'Senator Mangbukele Manga Dima Prospere', originProvince: 'Haut-Uele', party: '', photo: '' },
    { fullName: 'Senator Kumbodimo Kababile Anna', originProvince: 'Haut-Uele', party: '', photo: '' },
    { fullName: 'Senator Batumoko Afozunde Jean-Pierre', originProvince: 'Haut-Uele', party: '', photo: '' },

    { fullName: 'Senator Adubango Awotho Samuel', originProvince: 'Ituri', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/SAMUEL_ADUBANGO.png' },
    { fullName: 'Senator Banio Debho Daniel', originProvince: 'Ituri', party: '', photo: 'https://backup-gce-talatala.s3.amazonaws.com/media/deputy/DANIEL_BANIO.png' },
    { fullName: 'Senator Bachebandey Manzolo Noelle', originProvince: 'Ituri', party: '', photo: '' },
    { fullName: 'Senator Idi Tabani Zakaria', originProvince: 'Ituri', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxf-NBQdAr-mjJmyyw9MNxB3sjmWz1XCufnA&s' },

    { fullName: 'Senator Nkole Tshimuanga Gaston', originProvince: 'Kasai', party: '', photo: 'https://www.congo-press.com/wp-content/uploads/2021/05/nkole_tshimuanga_gaston_21_0.jpg' },
    { fullName: 'Senator Ngalamulume Bakakenga Joseph', originProvince: 'Kasai', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk37gaSNVlPCLANqQy5n9xz2aH_faSIcrGDw&s' },
    { fullName: 'Senator Muya Muboyayi Clement', originProvince: 'Kasai', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHSzTuuGAETDCCBDHwCHHJ-MbyxVnPk4ZVXA&s' },
    { fullName: 'Senator Mbingo Mvula Hubert', originProvince: 'Kasai', party: '', photo: '' },

    { fullName: 'Senator Ngindu Biduaya Cedric', originProvince: 'Kasaï Central', party: '', photo: 'https://actualite.cd/sites/default/files/styles/800_600/public/2024-06/IMG-20240625-WA0035.jpg?itok=q15JTM1b' },
    { fullName: 'Senator Mukengeshayi Kabongo Sylvain', originProvince: 'Kasaï Central', party: '', photo: 'https://le-journal.net/wp-content/uploads/2023/01/Taupin-Kabongo-560x390-1.jpg' },
    { fullName: 'Senator Muntuaba Lukuna Luabeya Jean', originProvince: 'Kasaï Central', party: '', photo: '' },
    { fullName: 'Senator Tshisekedi Kabasele Jean', originProvince: 'Kasaï Central', party: '', photo: '' },

    { fullName: 'Senator Ngoyi Kasanji Alphonse', originProvince: 'Kasaï Oriental', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGAVrJz6BXcifIWSD8ovqtSdNjeq1j49eb1Q&s' },
    { fullName: 'Senator Kabombo Mwadiamvita Guy', originProvince: 'Kasaï Oriental', party: '', photo: 'https://photos.radiookapi.net/picture/20240529121050897637_444226430_468375535558510_2083443664707242684_n.jpg?imgmax=1200' },
    { fullName: 'Senator Kalala Wa Kalala Jose', originProvince: 'Kasaï Oriental', party: '', photo: 'https://www.opinion-info.cd/sites/default/files/styles/media_interne_1280x720/public/2025-04/IMG-20250413-WA0005.jpg?itok=TH-AEz5G' },
    { fullName: 'Senator Mpanda Kabangu Jose', originProvince: 'Kasaï Oriental', party: '', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhKigrTKapR6j33DW8NRcii01iYfcv5S7KLg&s' },

    { fullName: 'Senator Vangu Ki-Nsongo', originProvince: 'Kasaï Central', party: '', photo: '' },
    { fullName: 'Senator Kinduelo Lumbu Pascal', originProvince: 'Kasaï Central', party: '', photo: '' },
    { fullName: 'Senator Budimbu Ntubuanga Didier', originProvince: 'Kasaï Central', party: '', photo: '' },
    { fullName: 'Senator Ngudianza Bayokisa Kisula Nefertiti', originProvince: 'Kasaï Central', party: '', photo: '' },

    { fullName: 'Senator Mbunguje Marembo Anne', originProvince: 'Kinshasa', party: '', photo: '' },
    { fullName: 'Senator Mulumba Kongolo Wa Kongolo Gerard', originProvince: 'Kinshasa', party: '', photo: '' },
    { fullName: 'Senator Kabasele Tubajika Micke', originProvince: 'Kinshasa', party: '', photo: '' },
    { fullName: 'Senator Kazadi Kankonde Ivan', originProvince: 'Kinshasa', party: '', photo: '' },
    { fullName: 'Senator Kabuya Tshilumba Augustin', originProvince: 'Kinshasa', party: '', photo: '' },
    { fullName: 'Senator Ngobila Mbaka Gentiny', originProvince: 'Kinshasa', party: '', photo: '' },
    { fullName: 'Senator Lunguana Matumona Jacques', originProvince: 'Kinshasa', party: '', photo: '' },
    { fullName: 'Senator Bahati Tito Arlette', originProvince: 'Kinshasa', party: '', photo: '' },

    { fullName: 'Senator Luheto Kidid Platini', originProvince: 'Kwango', party: '', photo: '' },
    { fullName: 'Senator Kapenda Kasuku Justin', originProvince: 'Kwango', party: '', photo: '' },
    { fullName: 'Senator Naa Ikamba Simon', originProvince: 'Kwango', party: '', photo: '' },
    { fullName: 'Senator Bitwisila Lusundji Willy', originProvince: 'Kwango', party: '', photo: '' },

    { fullName: '', originProvince: 'Kwilu', party: '', photo: '' },
    { fullName: '', originProvince: 'Kwilu', party: '', photo: '' },
    { fullName: '', originProvince: 'Kwilu', party: '', photo: '' },
    { fullName: '', originProvince: 'Kwilu', party: '', photo: '' },

    { fullName: '', originProvince: 'Nord-Ubangi', party: '', photo: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '', photo: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '', photo: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '', photo: '' },

    { fullName: 'Senator Lumanu Mulenda Buanan Nsefu', originProvince: 'Lomami', party: '', photo: '' },
    { fullName: 'Senator Muabilu Mbayu Mukala Pius', originProvince: 'Lomami', party: '', photo: '' },
    { fullName: 'Senator Muleka Bajikila Florence', originProvince: 'Lomami', party: '', photo: '' },
    { fullName: 'Senator Kalambayi Katshiobo Jonas', originProvince: 'Lomami', party: '', photo: '' },

    { fullName: 'Senator Naweji Yav Norbert', originProvince: 'Lualaba', party: '', photo: '' },
    { fullName: 'Senator Kanyimbu Shindany Michel', originProvince: 'Lualaba', party: '', photo: '' },
    { fullName: 'Senator Mashata Kayembe Celestin', originProvince: 'Lualaba', party: '', photo: '' },
    { fullName: 'Senator Masuka Shindany Michel', originProvince: 'Lualaba', party: '', photo: '' },

    { fullName: 'Senator Babanga Mpotiyolo Anicet', originProvince: 'Mai-Ndombe', party: '', photo: '' },
    { fullName: 'Senator Mutima Sakrini Herman', originProvince: 'Mai-Ndombe', party: '', photo: '' },
    { fullName: 'Senator Mongo Lonkonda Aime', originProvince: 'Mai-Ndombe', party: '', photo: '' },
    { fullName: 'Senator Ngambani Ngovoli Adonis', originProvince: 'Mai-Ndombe', party: '', photo: '' },

    { fullName: 'Senator Luanga Mukela Faustin', originProvince: 'Maniema', party: '', photo: '' },
    { fullName: 'Senator Afani Idrissa Mangala', originProvince: 'Maniema', party: '', photo: '' },
    { fullName: 'Senator Kalumba Mwana Ngongo Justin', originProvince: 'Maniema', party: '', photo: '' },
    { fullName: 'Senator Omona Bitika Pascal', originProvince: 'Maniema', party: '', photo: '' },

    { fullName: 'Senator Bokumwana Maposo Elise', originProvince: 'Mongala', party: '', photo: '' },
    { fullName: 'Senator Sakombi Molendo Aime', originProvince: 'Mongala', party: '', photo: '' },
    { fullName: 'Senator Lingepo Molanga Michel', originProvince: 'Mongala', party: '', photo: '' },
    { fullName: 'Senator Lihau Ebua Kalokola Jean-Pierre', originProvince: 'Mongala', party: '', photo: '' },

    { fullName: 'Senator Kaseraka Katokolyo Jean-Marie', originProvince: 'Nord-Kivu', party: '', photo: '' },
    { fullName: 'Senator Vunabandi Kanyinmigo', originProvince: 'Nord-Kivu', party: '', photo: '' },
    { fullName: 'Senator Mumbere Malhozi Papy', originProvince: 'Nord-Kivu', party: '', photo: '' },
    { fullName: 'Senator Shabani Lukoo Bihango Jacquemain', originProvince: 'Nord-Kivu', party: '', photo: '' },

    { fullName: 'Senator Lutundula Apala Penapala', originProvince: 'Sankuru', party: '', photo: '' },
    { fullName: 'Senator Kalala Masimango Rene', originProvince: 'Sankuru', party: '', photo: '' },
    { fullName: 'Senator Mpetshi Woto Bernard', originProvince: 'Sankuru', party: '', photo: '' },
    { fullName: 'Senator Lodi Emongo Jules', originProvince: 'Sankuru', party: '', photo: '' },

    { fullName: 'Senator Bulakayi Mululunganya Aristide', originProvince: 'Sud-Kivu', party: '', photo: '' },
    { fullName: 'Senator Bahati Lukwebo Modeste', originProvince: 'Sud-Kivu', party: '', photo: '' },
    { fullName: 'Senator Muhanzi Mubembe Eustache', originProvince: 'Sud-Kivu', party: '', photo: '' },
    { fullName: 'Senator Basengezi Katintima', originProvince: 'Sud-Kivu', party: '', photo: '' },

    { fullName: 'Senator Mondonge Bambulu Alexis', originProvince: 'Sud-Ubangi', party: '', photo: '' },
    { fullName: 'Senator Bussa Tonga Jean Lucien', originProvince: 'Sud-Ubangi', party: '', photo: '' },
    { fullName: 'Senator Bemba Ndokwa Francoise', originProvince: 'Sud-Ubangi', party: '', photo: '' },
    { fullName: 'Senator Boboy Mwanela Nadine', originProvince: 'Sud-Ubangi', party: '', photo: '' },

    { fullName: 'Senator Ramazani Masudi Kilele', originProvince: 'Tanganyika', party: '', photo: '' },
    { fullName: 'Senator Mwando Katempa Christine', originProvince: 'Tanganyika', party: '', photo: '' },
    { fullName: 'Senator Katumwa Mukalay Vicky', originProvince: 'Tanganyika', party: '', photo: '' },
    { fullName: 'Senator Pungwe Mbuyu Luyongola Patrice', originProvince: 'Tanganyika', party: '', photo: '' },

    { fullName: 'Senator Bamanisa Saidi Jean', originProvince: 'Tshopo', party: '', photo: '' },
    { fullName: 'Senator Nkomba Sabangu Madeleine', originProvince: 'Tshopo', party: '', photo: '' },
    { fullName: 'Senator Daruwezi Mokombe Jean-Pierre', originProvince: 'Tshopo', party: '', photo: '' },
    { fullName: 'Senator Kayala Ninga Renabelle', originProvince: 'Tshopo', party: '', photo: '' },

    { fullName: 'Senator Loando Mboyo Guy', originProvince: 'Tshuapa', party: '', photo: '' },
    { fullName: 'Senator Ekumbo Longulu Moise', originProvince: 'Tshuapa', party: '', photo: '' },
    { fullName: 'Senator Boongo Nkoy Pancrace', originProvince: 'Tshuapa', party: '', photo: '' },
    { fullName: 'Senator Isengi Ndelo Bokeka Corneille Patrice', originProvince: 'Tshuapa', party: '', photo: '' },

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
    colorAxis: { min: 0 },
    legend: { enabled: true },
    tooltip: { enabled: true },
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
  }

  // Translation methods
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  changeLanguage(language: 'en' | 'fr'): void {
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
          data: this.mapLayerData.map((feature: any, index: number) => ({
            'hc-key': feature.properties['hc-key'] || feature.properties.name,
            value: Math.floor(Math.random() * 50) + 1,
            color: '#E8F4FD',
            name: feature.properties.name
          })),
          joinBy: 'hc-key',
          states: {
            hover: {
              color: '#a4edba'
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              fontSize: '10px',
              fontWeight: 'normal'
            }
          },
          borderColor: '#606060',
          borderWidth: 1
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
    console.log('Opening modal for:', regionName, province);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRegion = null;
    this.regionSenators = [];
  }

  onImageError(event: any): void {
    // Set a default placeholder image when senator photo fails to load
    event.target.src = 'assets/images/default-senator.svg';
  }
}

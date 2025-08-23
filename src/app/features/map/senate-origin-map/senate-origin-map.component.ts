import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

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

  // Modal properties
  showModal = false;
  selectedRegion: any = null;
  regionSenators: any[] = [];

  // Sample senators data (this could come from the senators.json file)
  senatorsData = [
    { fullName: 'Senator Agito Amela Carole', originProvince: 'Bas-Uele', party: '' },
    { fullName: 'Senator Gebanga Tarangutoro', originProvince: 'Bas-Uele', party: '' },
    { fullName: 'Senator Namasia Bazego Aminata', originProvince: 'Bas-Uele', party: '' },
    { fullName: 'Senator Sinango Ngbakoli Eddy Pascal', originProvince: 'Bas-Uele', party: '' },

    { fullName: 'Senator Mukamba Kadiata Nzemba Jonas', originProvince: 'Equateur', party: '' },
    { fullName: 'Senator Boketshu Bofili Jean-Paul', originProvince: 'Equateur', party: '' },
    { fullName: 'Senator Bolenge Bopende Gabriel', originProvince: 'Equateur', party: '' },
    { fullName: 'Senator Baende Etape Jean Claude', originProvince: 'Equateur', party: '' },

    { fullName: 'Senator Sama Lukonde Kyenge Jean Michel', originProvince: 'Haut-Katanga', party: '' },
    { fullName: 'Senator Kalonda Della Idi Salomon', originProvince: 'Haut-Katanga', party: '' },
    { fullName: 'Senator Kyabula Katwe Jacques', originProvince: 'Haut-Katanga', party: '' },
    { fullName: 'Senator Kabongo Binene', originProvince: 'Haut-Katanga', party: '' },

    { fullName: 'Senator Ilunga Kitombolwe Alain', originProvince: 'Haut-Lomami', party: '' },
    { fullName: 'Senator Kabamba Wa Umba Isabelle', originProvince: 'Haut-Lomami', party: '' },
    { fullName: 'Senator Yamba Kazadi Gracia', originProvince: 'Haut-Lomami', party: '' },
    { fullName: 'Senator Banza Maloba Dany', originProvince: 'Haut-Lomami', party: '' },

    { fullName: 'Senator Baseane Nangaa Christophe', originProvince: 'Haut-Uele', party: '' },
    { fullName: 'Senator Mangbukele Manga Dima Prospere', originProvince: 'Haut-Uele', party: '' },
    { fullName: 'Senator Kumbodimo Kababile Anna', originProvince: 'Haut-Uele', party: '' },
    { fullName: 'Senator Batumoko Afozunde Jean-Pierre', originProvince: 'Haut-Uele', party: '' },

    { fullName: 'Senator Adubango Awotho Samuel', originProvince: 'Ituri', party: '' },
    { fullName: 'Senator Banio Debho Daniel', originProvince: 'Ituri', party: '' },
    { fullName: 'Senator Bachebandey Manzolo Noelle', originProvince: 'Ituri', party: '' },
    { fullName: 'Senator Idi Tabani Zakaria', originProvince: 'Ituri', party: '' },

    { fullName: 'Senator Nkole Tshimuanga Gaston', originProvince: 'Kasai', party: '' },
    { fullName: 'Senator Ngalamulume Bakakenga Joseph', originProvince: 'Kasai', party: '' },
    { fullName: 'Senator Muya Muboyayi Clement', originProvince: 'Kasai', party: '' },
    { fullName: 'Senator Mbingo Mvula Hubert', originProvince: 'Kasai', party: '' },

    { fullName: 'Senator Ngindu Biduaya Cedric', originProvince: 'Kasaï Central', party: '' },
    { fullName: 'Senator Mukengeshayi Kabongo Sylvain', originProvince: 'Kasaï Central', party: '' },
    { fullName: 'Senator Muntuaba Lukuna Luabeya Jean', originProvince: 'Kasaï Central', party: '' },
    { fullName: 'Senator Tshisekedi Kabasele Jean', originProvince: 'Kasaï Central', party: '' },

    { fullName: 'Senator Ngoyi Kasanji Alphonse', originProvince: 'Kasaï Oriental', party: '' },
    { fullName: 'Senator Kabombo Mwadiamvita Guy', originProvince: 'Kasaï Oriental', party: '' },
    { fullName: 'Senator Kalala Wa Kalala Jose', originProvince: 'Kasaï Oriental', party: '' },
    { fullName: 'Senator Mpanda Kabangu Jose', originProvince: 'Kasaï Oriental', party: '' },

    { fullName: 'Senator Vangu Ki-Nsongo', originProvince: 'Kasaï Central', party: '' },
    { fullName: 'Senator Kinduelo Lumbu Pascal', originProvince: 'Kasaï Central', party: '' },
    { fullName: 'Senator Budimbu Ntubuanga Didier', originProvince: 'Kasaï Central', party: '' },
    { fullName: 'Senator Ngudianza Bayokisa Kisula Nefertiti', originProvince: 'Kasaï Central', party: '' },

    { fullName: 'Senator Mbunguje Marembo Anne', originProvince: 'Kinshasa', party: '' },
    { fullName: 'Senator Mulumba Kongolo Wa Kongolo Gerard', originProvince: 'Kinshasa', party: '' },
    { fullName: 'Senator Kabasele Tubajika Micke', originProvince: 'Kinshasa', party: '' },
    { fullName: 'Senator Kazadi Kankonde Ivan', originProvince: 'Kinshasa', party: '' },
    { fullName: 'Senator Kabuya Tshilumba Augustin', originProvince: 'Kinshasa', party: '' },
    { fullName: 'Senator Ngobila Mbaka Gentiny', originProvince: 'Kinshasa', party: '' },
    { fullName: 'Senator Lunguana Matumona Jacques', originProvince: 'Kinshasa', party: '' },
    { fullName: 'Senator Bahati Tito Arlette', originProvince: 'Kinshasa', party: '' },

    { fullName: 'Senator Luheto Kidid Platini', originProvince: 'Kwango', party: '' },
    { fullName: 'Senator Kapenda Kasuku Justin', originProvince: 'Kwango', party: '' },
    { fullName: 'Senator Naa Ikamba Simon', originProvince: 'Kwango', party: '' },
    { fullName: 'Senator Bitwisila Lusundji Willy', originProvince: 'Kwango', party: '' },

    { fullName: '', originProvince: 'Kwilu', party: '' },
    { fullName: '', originProvince: 'Kwilu', party: '' },
    { fullName: '', originProvince: 'Kwilu', party: '' },
    { fullName: '', originProvince: 'Kwilu', party: '' },

    { fullName: '', originProvince: 'Nord-Ubangi', party: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '' },
    { fullName: '', originProvince: 'Nord-Ubangi', party: '' },

    { fullName: 'Senator Lumanu Mulenda Buanan Nsefu', originProvince: 'Lomami', party: '' },
    { fullName: 'Senator Muabilu Mbayu Mukala Pius', originProvince: 'Lomami', party: '' },
    { fullName: 'Senator Muleka Bajikila Florence', originProvince: 'Lomami', party: '' },
    { fullName: 'Senator Kalambayi Katshiobo Jonas', originProvince: 'Lomami', party: '' },

    { fullName: 'Senator Naweji Yav Norbert', originProvince: 'Lualaba', party: '' },
    { fullName: 'Senator Kanyimbu Shindany Michel', originProvince: 'Lualaba', party: '' },
    { fullName: 'Senator Mashata Kayembe Celestin', originProvince: 'Lualaba', party: '' },
    { fullName: 'Senator Masuka Shindany Michel', originProvince: 'Lualaba', party: '' },

    { fullName: 'Senator Babanga Mpotiyolo Anicet', originProvince: 'Mai-Ndombe', party: '' },
    { fullName: 'Senator Mutima Sakrini Herman', originProvince: 'Mai-Ndombe', party: '' },
    { fullName: 'Senator Mongo Lonkonda Aime', originProvince: 'Mai-Ndombe', party: '' },
    { fullName: 'Senator Ngambani Ngovoli Adonis', originProvince: 'Mai-Ndombe', party: '' },

    { fullName: 'Senator Luanga Mukela Faustin', originProvince: 'Maniema', party: '' },
    { fullName: 'Senator Afani Idrissa Mangala', originProvince: 'Maniema', party: '' },
    { fullName: 'Senator Kalumba Mwana Ngongo Justin', originProvince: 'Maniema', party: '' },
    { fullName: 'Senator Omona Bitika Pascal', originProvince: 'Maniema', party: '' },

    { fullName: 'Senator Bokumwana Maposo Elise', originProvince: 'Mongala', party: '' },
    { fullName: 'Senator Sakombi Molendo Aime', originProvince: 'Mongala', party: '' },
    { fullName: 'Senator Lingepo Molanga Michel', originProvince: 'Mongala', party: '' },
    { fullName: 'Senator Lihau Ebua Kalokola Jean-Pierre', originProvince: 'Mongala', party: '' },

    { fullName: 'Senator Kaseraka Katokolyo Jean-Marie', originProvince: 'Nord-Kivu', party: '' },
    { fullName: 'Senator Vunabandi Kanyinmigo', originProvince: 'Nord-Kivu', party: '' },
    { fullName: 'Senator Mumbere Malhozi Papy', originProvince: 'Nord-Kivu', party: '' },
    { fullName: 'Senator Shabani Lukoo Bihango Jacquemain', originProvince: 'Nord-Kivu', party: '' },

    { fullName: 'Senator Lutundula Apala Penapala', originProvince: 'Sankuru', party: '' },
    { fullName: 'Senator Kalala Masimango Rene', originProvince: 'Sankuru', party: '' },
    { fullName: 'Senator Mpetshi Woto Bernard', originProvince: 'Sankuru', party: '' },
    { fullName: 'Senator Lodi Emongo Jules', originProvince: 'Sankuru', party: '' },

    { fullName: 'Senator Bulakayi Mululunganya Aristide', originProvince: 'Sud-Kivu', party: '' },
    { fullName: 'Senator Bahati Lukwebo Modeste', originProvince: 'Sud-Kivu', party: '' },
    { fullName: 'Senator Muhanzi Mubembe Eustache', originProvince: 'Sud-Kivu', party: '' },
    { fullName: 'Senator Basengezi Katintima', originProvince: 'Sud-Kivu', party: '' },

    { fullName: 'Senator Mondonge Bambulu Alexis', originProvince: 'Sud-Ubangi', party: '' },
    { fullName: 'Senator Bussa Tonga Jean Lucien', originProvince: 'Sud-Ubangi', party: '' },
    { fullName: 'Senator Bemba Ndokwa Francoise', originProvince: 'Sud-Ubangi', party: '' },
    { fullName: 'Senator Boboy Mwanela Nadine', originProvince: 'Sud-Ubangi', party: '' },

    { fullName: 'Senator Ramazani Masudi Kilele', originProvince: 'Tanganyika', party: '' },
    { fullName: 'Senator Mwando Katempa Christine', originProvince: 'Tanganyika', party: '' },
    { fullName: 'Senator Katumwa Mukalay Vicky', originProvince: 'Tanganyika', party: '' },
    { fullName: 'Senator Pungwe Mbuyu Luyongola Patrice', originProvince: 'Tanganyika', party: '' },

    { fullName: 'Senator Bamanisa Saidi Jean', originProvince: 'Tshopo', party: '' },
    { fullName: 'Senator Nkomba Sabangu Madeleine', originProvince: 'Tshopo', party: '' },
    { fullName: 'Senator Daruwezi Mokombe Jean-Pierre', originProvince: 'Tshopo', party: '' },
    { fullName: 'Senator Kayala Ninga Renabelle', originProvince: 'Tshopo', party: '' },

    { fullName: 'Senator Loando Mboyo Guy', originProvince: 'Tshuapa', party: '' },
    { fullName: 'Senator Ekumbo Longulu Moise', originProvince: 'Tshuapa', party: '' },
    { fullName: 'Senator Boongo Nkoy Pancrace', originProvince: 'Tshuapa', party: '' },
    { fullName: 'Senator Isengi Ndelo Bokeka Corneille Patrice', originProvince: 'Tshuapa', party: '' },

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

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.loadMapData();
  }

  ngOnInit(): void {
    console.log('SenateOriginMapComponent initialized');
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
          name: 'DRC Provinces',
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
          name: 'Senate Locations',
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
            pointFormat: '<b>{point.name}</b><br/>Province: {point.custom.province}<br/>Senators: {point.custom.senators}'
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
}

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
            { lat: -5.8921, lon: 22.4454, name: 'Kananga', custom: { province: 'Kasaï Central', senators: 4 } },
            { lat: -2.5089, lon: 28.8473, name: 'Bukavu', custom: { province: 'Sud-Kivu', senators: 4 } },
            { lat: 1.2103, lon: 29.2348, name: 'Goma', custom: { province: 'Nord-Kivu', senators: 4 } },
            { lat: -6.1583, lon: 23.6014, name: 'Mbuji-Mayi', custom: { province: 'Kasaï Oriental', senators: 4 } },
            { lat: -3.3098, lon: 17.3157, name: 'Bandundu', custom: { province: 'Kwilu', senators: 4 } },
            { lat: -0.7264, lon: 29.2411, name: 'Butembo', custom: { province: 'Nord-Kivu', senators: 2 } },
            { lat: -5.0342, lon: 29.2859, name: 'Uvira', custom: { province: 'Sud-Kivu', senators: 2 } }
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
              click: function() {
                console.log('Senate location clicked:', this.name);
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
}

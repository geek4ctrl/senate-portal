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
      text: 'Senate Map'
    },
    subtitle: {
      text: 'Locations of Senate members from the Democratic Republic of Congo'
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
    // Use dynamic import to load the world map data
    import('@highcharts/map-collection/custom/world.geo.json')
      .then((worldMapData: any) => {
        console.log('World map data loaded:', worldMapData);
        this.mapLayerData = worldMapData.default;
        this.updateChartWithMapData();
      })
      .catch((error) => {
        console.error('Error loading world map data:', error);
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
          name: 'Countries',
          mapData: this.mapLayerData,
          data: this.mapLayerData.features?.map((feature: any, index: number) => ({
            'hc-key': feature.properties['hc-key'],
            value: Math.floor(Math.random() * 100),
            color: '#E8E8E8'
          })) || [],
          joinBy: 'hc-key',
          states: {
            hover: {
              color: '#a4edba'
            }
          },
          dataLabels: {
            enabled: false
          }
        },
        {
          type: 'mappoint',
          name: 'Senate Locations',
          showInLegend: true,
          marker: {
            symbol: 'circle',
            radius: 8,
            fillColor: '#FF6B6B',
            lineColor: '#FFF',
            lineWidth: 2
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
            { lat: -3.3098, lon: 17.3157, name: 'Bandundu', custom: { province: 'Kwilu', senators: 4 } }
          ] as any,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
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

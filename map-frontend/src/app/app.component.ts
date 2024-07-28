import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { fromLonLat, toLonLat } from 'ol/proj';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Feature } from 'ol';
import LineString from 'ol/geom/LineString';
import { QueryDrawingComponent } from './query-drawing/query-drawing.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Drawing } from './models/drawing';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    QueryDrawingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'map-app';
  map: Map;
  vectorSource: VectorSource;
  apiUrl = 'http://localhost:8090/api';

  constructor(private http: HttpClient,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.vectorSource = new VectorSource();
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: this.vectorSource
        })
      ],
      view: new View({
        center: fromLonLat([35, 39]),
        zoom: 6
      })
    });
    this.loadDrawings();
  }

  addDrawing(): void {
    const draw = new Draw({
      source: this.vectorSource,
      type: 'LineString'
    });
    this.map.addInteraction(draw);

    draw.on('drawend', (event) => {
      const feature = event.feature as Feature;
      const geometry = feature.getGeometry() as LineString;
      const coordinates = geometry.getCoordinates().map(coord => toLonLat(coord));

      const name = prompt('Enter name:');
      const number = parseInt(prompt('Enter number:'), 10);

      const drawing = { name, number, coordinates };

      this.http.post(`${this.apiUrl}/drawings/add`, drawing).subscribe(() => {
        alert('Drawing saved');
      });

      this.map.removeInteraction(draw);
    });
  }

  queryDrawing(): void {
    this.dialog.open(QueryDrawingComponent, {
      data: {
        apiUrl: this.apiUrl
      }
    });
  }

  loadDrawings(): void {
    this.http.get<Drawing[]>(`${this.apiUrl}/drawings/get`).subscribe(drawings => {
      drawings.forEach(drawing => {
        const coordinates = drawing.coordinates.map(coord => fromLonLat(coord));
        const feature = new Feature(new LineString(coordinates));
        this.vectorSource.addFeature(feature);
      });
    });
  }
}

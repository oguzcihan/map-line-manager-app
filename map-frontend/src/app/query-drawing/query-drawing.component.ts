import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Drawing } from '../models/drawing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-query-drawing',
  standalone: true,
  imports: [HttpClientModule, MatDialogModule,
    MatTableModule,
    MatButtonModule],
  templateUrl: './query-drawing.component.html',
  styleUrl: './query-drawing.component.scss'
})
export class QueryDrawingComponent implements OnInit{
  displayedColumns: string[] = ['name', 'number', 'coordinates'];
  dataSource = new MatTableDataSource<Drawing>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDrawings();
  }

  loadDrawings(): void {
    this.http.get<Drawing[]>(`${this.data.apiUrl}/drawings/get`).subscribe(drawings => {
      this.dataSource.data = drawings;
    });
  }
}

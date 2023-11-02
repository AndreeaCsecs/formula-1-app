import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  years: number[] = Array.from({ length: 2022 - 1950 + 1 }, (_, index) => 1950 + index);
  selectedYear: number = 2022; // Set a default year
  results: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // You can keep this code to fetch data for the default year if needed
    this.loadResults();
  }

  loadResults() {
    const url = `http://ergast.com/api/f1/${this.selectedYear}/results.json?limit=400&offset=0`;
    this.http.get(url).subscribe((data: any) => {
      this.results = data;
    });
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent {
  selectedYear: number | undefined;
  years: number[] = []; // Initialize with an empty array
  driverStandings: any[] = []; // Initialize with an empty array

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load the list of available years when the component initializes
    this.loadAvailableYears();

    // Initialize the selectedYear and load initial data
    this.selectedYear = new Date().getFullYear();
    this.loadWinners();
  }

  loadAvailableYears() {
    // Fetch a list of available years and populate the 'years' array
    this.http.get('http://ergast.com/api/f1/seasons.json?limit=100').subscribe((data: any) => {
      if (data.MRData && data.MRData.SeasonTable && data.MRData.SeasonTable.Seasons) {
        this.years = data.MRData.SeasonTable.Seasons.map((season: any) => Number(season.season));
      }
    });
  }

  loadWinners() {
    const apiUrl = `http://ergast.com/api/f1/${this.selectedYear}/driverStandings.json?limit=400&offset=0`;

    this.http.get(apiUrl).subscribe((data: any) => {
      // Extract driver standings data from the API response
      if (data.MRData && data.MRData.StandingsTable && data.MRData.StandingsTable.StandingsLists) {
        this.driverStandings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;
      }
    });
  }

  isWinner(standing: any): boolean {
    // Check if the position is '1' to identify the winner
    return standing.position === '1';
  }
  
}

import { Component, OnInit } from '@angular/core';
import {BetService} from '../bets/bet.service';
import { SingleBet } from '../bets/singlebet.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {


  constructor(private betService: BetService) { }


  dailyStats() {
    return [];
  }


  /**: DailyStats[] {
    const stats: DailyStats[] = [];
    this.dataSource.data.forEach(bet => {
      const temp = stats.findIndex(item => item.day.getDate() === bet.date.getDate());
      if (temp > -1) {
        stats[temp].dailyReturn += bet.valueReturn;
      } else {
        stats.push({dailyReturn: bet.valueReturn, day: bet.date});
      }
    });
    return stats;
  }*/

  // Doughnut
  public doughnutChartLabels: string[] = ['Wins', 'Half-Wins', 'Half-Losses', 'Losses', 'Push', 'Void', 'Awaiting'];
  public doughnutChartData: number[] = [this.getOutcomes(this.betService.getSingleBets(), 'win'),
    this.getOutcomes(this.betService.getSingleBets(), 'halfWin'),
    this.getOutcomes(this.betService.getSingleBets(), 'halfLoss'),
    this.getOutcomes(this.betService.getSingleBets(), 'loss'),
    this.getOutcomes(this.betService.getSingleBets(), 'push'),
    this.getOutcomes(this.betService.getSingleBets(), 'void'),
    this.getOutcomes(this.betService.getSingleBets(), 'awaiting')];
  public doughnutChartType = 'doughnut';


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
//    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 50,
        right: 0,
        top: 100,
        bottom: 0
      }
    }
  };

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  getNumberOfBets() {
    return this.betService.getSingleBets().length;
  }

  getOutcomes(bets: SingleBet[], outcome: string) {
    const betOutcomes = 0;
    bets.forEach(bet => {
     /* if (bet.outcome === outcome) {
        betOutcomes ++;
      }*/
    });

    return betOutcomes;
  }

  getTotal() {
    let total = 0;

    for (const bet of this.betService.getSingleBets()) {
      total += bet.valueReturn;
    }
    return total;
  }






  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}

export class DailyStats {
  dailyReturn = 0;
  day: Date;
}


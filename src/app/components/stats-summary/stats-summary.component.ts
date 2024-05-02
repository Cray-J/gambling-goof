import { Component, inject, OnInit, signal } from '@angular/core';
import { FirebaseService } from '../../core/firebase.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Outcome } from '../../shared/model/outcome.enum';
import { groupBy } from 'lodash';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

type Entry = {
  numberOfBets: number,
  outcome: keyof Outcome,
  standing: number,
  roi: number,
  winPercentage: number
}

@Component({
  selector: 'app-stats-summary',
  standalone: true,
  imports: [CardModule, ChartModule],
  templateUrl: './stats-summary.component.html',
  styleUrl: './stats-summary.component.scss'
})
export class StatsSummaryComponent implements OnInit {
  private readonly firebaseService = inject(FirebaseService);
  bets$$ = toSignal(this.firebaseService.allValues);
  values$$ = signal<Entry[] | undefined>(undefined);

  basicData: any;

  basicOptions: any;

  constructor() {
    this.firebaseService.allValues.subscribe(v => {
      console.log(this.bets$$());

      const betsRecord = [];

      const grouped = groupBy(this.bets$$(), 'outcome');

      Object.keys(grouped).forEach(groupKey => {
        console.log(groupKey, grouped[groupKey])
        const bets = grouped[groupKey];
        let standing = 0;
        let winPercentage = 0;
        let roi = 0;
        bets.forEach(bet => {
          standing += bet.balanceChange;
        });
        // @ts-ignore
        betsRecord.push({ numberOfBets: grouped[groupKey].length, outcome: groupKey, standing, winPercentage, roi});
        console.log('grouped', grouped)
      })
      this.values$$.set(betsRecord);
    });
  }
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BetSlip } from "../../shared/model/betslip.model";


@Component({
  selector: 'app-icon-cell-renderer',
  template: `
    <div class="balanceChange">
      {{betslip?.balanceChange.toFixed(2)}}
      <mat-icon *ngIf="betslip.balanceChange > 0" style="color: #71AC83">trending_up</mat-icon>
      <mat-icon *ngIf="betslip.balanceChange === 0"></mat-icon>
      <mat-icon *ngIf="betslip.balanceChange < 0" style="color: red">trending_down</mat-icon>
    </div>
  `,
  styles: [
    `
      div.balanceChange {
        display: flex;
        justify-content: center;
        gap: 16px;
        align-items: center;

        ::ng-deep .mat-icon{
          /*height:24px !important;*/
          /*width:24px !important;*/
          /*font-size:24px !important;*/
          /*padding-bottom: 4px;*/
        }
      }
    `
  ]
})
export class IconCellRendererComponent implements ICellRendererAngularComp {
  betslip: BetSlip;

  agInit(params: ICellRendererParams): void {
    this.betslip = params.data;
    console.log(params);
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  refresh(params: ICellRendererParams): boolean {
    return true;
  }
}

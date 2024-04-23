import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { BehaviorSubject, filter, take } from "rxjs";
import { BetSlip, PartBet } from "../../shared/model/betslip.model";
import { GetRowIdParams, GridOptions, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import { AgGridAngular } from "ag-grid-angular";
import moment from "moment";
import { BtnCellRendererComponent, BtnCellRendererParams } from "./BtnCellRendererComponent.component";
import { MatDialog } from "@angular/material/dialog";
import { BetDialogComponent } from "../bet-dialog/bet-dialog.component";
import { transformOutcome } from "../../core/transformations";
import { IconCellRendererComponent } from "./IconCellRenderer.component";
import { AsyncPipe } from '@angular/common';
import { StatsSummaryComponent } from '../stats-summary/stats-summary.component';
import { FirebaseService } from '../../core/firebase.service';

const ignoreCaseComparator = (valueA: string, valueB: string): number => {
  return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
};

@Component({
  selector: 'app-new-bets-table',
  templateUrl: './new-bets-table.component.html',
  styleUrls: ['./new-bets-table.component.scss'],
  imports: [
    AgGridAngular,
    AsyncPipe,
    StatsSummaryComponent
  ],
    standalone: true
})
export class NewBetsTableComponent implements OnInit {
  private readonly firebaseService = inject(FirebaseService);
  private readonly dialog = inject(MatDialog);
  sequenceDataSource$ = new BehaviorSubject<BetSlip[]>([]);

  cellClassRules = {
    "cell-pass": params => params.data.balanceChange > 0,
    "cell-neutral": params => params.data.balanceChange === 0,
    "cell-fail": params => params.data.balanceChange < 0
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  options: GridOptions = {
    // onSelectionChanged: evt => this.onRowClicked(evt),
    pagination: true,
    paginationPageSize: 15,
    suppressCellFocus: true,
    // autoGroupColumnDef: {
    //   minWidth: 300,
    //   cellRendererParams: {
    //     innerRenderer: MyInnerRenderer,
    //   },
    // },
    defaultColDef: {
      resizable: false,
      cellStyle: { padding: '10px 23px' },
      sortable: true,
      suppressMenu: true,
    },
    // getRowClass: params => {
    //   if (params.data === undefined) {
    //     return 'ag-empty-row';
    //   }
    // },
    // groupIncludeFooter: true,
    // groupIncludeTotalFooter: true,
    // autoGroupColumnDef: {
    //   cellRendererParams: {
    //     footerValueGetter: params =>  {
    //       const isRootLevel = params.node.level === -1;
    //       if (isRootLevel) {
    //         return 'Grand Total';
    //       }w
    //       return `Sub Total (${params.value})`;
    //     },
    //   }
    // },
    // isExternalFilterPresent: () => this.isExternalFilterPresent(),
    // doesExternalFilterPass: node => this.doesExternalFilterPass(node),
    columnDefs: [
      {
        field: 'date',
        autoHeight: true,
        filter: 'agDateColumnFilter',
        flex: 3,
        valueFormatter: params => this.getDate(params),
        wrapText: true,
      },
      {
        field: 'selections',
        autoHeight: true,
        comparator: ignoreCaseComparator,
        filter: 'agDateColumnFilter',
        flex: 12,
        valueFormatter: params => this.getSelections(params),
        wrapText: true
      },
      {
        field: 'stake',
        filter: 'agTextColumnFilter',
        flex: 2,
      },
      {
        field: 'odds',
        filter: 'agTextColumnFilter',
        flex: 2,
        valueFormatter: params => params.data.odds.toFixed(2)
      },
      {
        field: 'bookie',
        filter: 'agDateColumnFilter',
        flex: 2
      },
      {
        field: 'outcome',
        filter: 'agTextColumnFilter',
        cellStyle: {

        },
        flex: 2,
        valueFormatter: params => transformOutcome(params.data.outcome)
      },
      {
        field: 'balanceChange',
        cellClassRules: this.cellClassRules,
        filter: 'agTextColumnFilter',
        flex: 3,
        cellRenderer: IconCellRendererComponent
        // valueFormatter: params => renderBalance(params.data.balanceChange.toFixed(2)),
      },
      {
        field: 'edit',
        flex: 2,
        // cellStyle: { padding: '2px 23px' },
        cellRenderer: BtnCellRendererComponent,
        cellRendererParams: (
          params: ICellRendererParams & BtnCellRendererParams
        ) =>
          ({
            clicked: ($evt: MouseEvent) => {
              // this.onDelete(params.data);
              this.editBet(params.data);
              $evt.stopPropagation();
            }
          } as BtnCellRendererParams),
        sortable: false
      }
    ]
  };

  ngOnInit(): void {
    this.firebaseService.allValues.subscribe(v => {
        this.sequenceDataSource$.next(v);
        this.agGrid?.api?.refreshCells();
        this.agGrid?.api?.redrawRows();
    })
  }

  private getDate(params: ValueFormatterParams): string {
    let momentDate = moment(params.value);
    return momentDate.format("DD/MM/YYYY");
  }

  private editBet(betSlip: BetSlip) {
    this.dialog.open(BetDialogComponent, {
     width: '900',
     data: betSlip
    })
      .afterClosed()
      .pipe(take(1), filter(v => !!v))
      .subscribe((changedBetslip: BetSlip) => this.updateValue(changedBetslip));
  }

  private updateValue(newBetslip: BetSlip) {
    this.firebaseService.updateBet(newBetslip);
  }

  private getSelections(params: ValueFormatterParams<any, PartBet[]>): string {
    if (!params.value) {
      return 'N/A';
    }
    return params.value.map(val => {
      return `${val.match}: ${val.selection}`;
    }).join(', ');
  }

  getRowId(params: GetRowIdParams<BetSlip>): string {
    return `${params.data.id}`;
  }

  // renderBalance(params: GetRowIdParams<BetSlip>) {
  //   return ``
  //   <mat-icon>edit</mat-icon>
  //
  // }

}

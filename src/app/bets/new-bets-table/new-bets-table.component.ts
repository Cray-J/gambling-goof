import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, of } from "rxjs";
import { BetSlip, PartBet } from "../../shared/model/betslip.model";
import { GetRowIdParams, GridOptions, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import { DatePipe } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import { FirebaseService } from "../../firebase.service";
import moment from "moment";
import { BtnCellRendererComponent, BtnCellRendererParams } from "./BtnCellRendererComponent.component";

const ignoreCaseComparator = (valueA: string, valueB: string): number => {
  return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
};

@Component({
  selector: 'app-new-bets-table',
  templateUrl: './new-bets-table.component.html',
  styleUrls: ['./new-bets-table.component.scss']
})
export class NewBetsTableComponent implements OnInit {
  sequenceDataSource$ = new BehaviorSubject<BetSlip[]>([]);
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  options: GridOptions = {
    // onSelectionChanged: evt => this.onRowClicked(evt),
    pagination: true,
    paginationPageSize: 15,
    defaultColDef: {
      resizable: false,
      cellStyle: { padding: '10px 23px' }
    },
    // isExternalFilterPresent: () => this.isExternalFilterPresent(),
    // doesExternalFilterPass: node => this.doesExternalFilterPass(node),
    columnDefs: [
      {
        field: 'date',
        filter: 'agDateColumnFilter',
        flex: 3,
        sortable: true,
        // unSortIcon: true,
        // headerComponent: CustomHeaderComponent,
        wrapText: true,
        autoHeight: true,
        suppressMenu: true,
        // headerComponentParams: {
        //   enableMenu: true
        // },
        valueFormatter: params => this.getDate(params),
        // comparator: ignoreCaseComparator
      },
      {
        field: 'selections',
        filter: 'agDateColumnFilter',
        flex: 10,
        sortable: true,
        // unSortIcon: true,
        // headerComponent: CustomHeaderComponent,
        wrapText: true,
        autoHeight: true,
        suppressMenu: true,
        // headerComponentParams: {
        //   enableMenu: true
        // },
        valueFormatter: params => this.getSelections(params),
        // comparator: ignoreCaseComparator
      },
      {
        field: 'stake',
        filter: 'agTextColumnFilter',
        flex: 3,
        // headerComponent: CustomHeaderComponent,
        sortable: true,
        // unSortIcon: true,
        suppressMenu: true,
        // valueFormatter: params => this.getDate(params)
      },
      {
        field: 'odds',
        filter: 'agTextColumnFilter',
        // headerComponent: CustomHeaderComponent,
        // headerComponentParams: {
        //   enableMenu: true
        // },
        sortable: true,
        suppressMenu: true,
        // unSortIcon: true,
        flex: 3
      },
      {
        field: 'bookie',
        filter: 'agDateColumnFilter',
        flex: 3,
        // headerComponent: CustomHeaderComponent,
        sortable: true,
        // unSortIcon: true,
        suppressMenu: true,
        // valueFormatter: params => this.getDate(params)
      },
      {
        field: 'outcome',
        filter: 'agTextColumnFilter',
        flex: 3,
        // headerComponent: CustomHeaderComponent,
        // headerComponentParams: {
        //   enableMenu: true
        // },
        suppressMenu: true,
        sortable: true,
        // unSortIcon: true
      },
      {
        field: 'balanceChange',
        filter: 'agTextColumnFilter',
        flex: 3,
        // headerComponent: CustomHeaderComponent,
        // headerComponentParams: {
        //   enableMenu: true
        // },
        suppressMenu: true,
        sortable: true,
        // unSortIcon: true
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
              $evt.stopPropagation();
            }
          } as BtnCellRendererParams)
      }
    ]
  };
  constructor(private datePipe: DatePipe, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.firebaseService.getAllUsers().then((bets: BetSlip[]) => {
      this.sequenceDataSource$.next(bets);
    });

    // of(this.firebaseService.getAllUsers()).subscribe((bets: BetSlip[]) => {
    //   this.sequenceDataSource$.next(bets);
    // }).subscribe(this.filterField.valueChanges, () => this.triggerChange());
  }

  private getDate(params: ValueFormatterParams): string {
    let momentDate = moment(params.value);
    return momentDate.format("DD/MM/YYYY");
  }

  private getSelections(params: ValueFormatterParams<any, PartBet[]>): string {
    console.log(params)
    return params.value.map(val => {
      return `${val.match}: ${val.selection}`;
    }).join(', ');
  }

  getRowId(params: GetRowIdParams<BetSlip>): string {
    return `${params.data.id}`;
  }

}

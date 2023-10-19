import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface BtnCellRendererParams {
    clicked: ($event: MouseEvent) => void;
}
@Component({
    selector: 'app-btn-cell-renderer',
    template: `
    <div class="editButtonContainer">
        <button mat-icon-button
                matTooltip="Basic"
                class="editButton"
                aria-label="Edit selection"
                (click)="btnClickedHandler($event)">
            <mat-icon>edit</mat-icon>
        </button>
    </div>
  `,
    styles: [
        `
            .editButton ::ng-deep  .mat-icon{
                height:16px !important;
                width:16px !important;
                font-size:16px !important;
            }
      div.editButtonContainer {
        display: flex;
        justify-content: center;
      }
    `
    ]
})
export class BtnCellRendererComponent implements ICellRendererAngularComp {
    private params: (ICellRendererParams & BtnCellRendererParams) | undefined;

    agInit(params: ICellRendererParams & BtnCellRendererParams): void {
        this.params = params;
    }

    btnClickedHandler($evt: MouseEvent) {
        this.params?.clicked($evt);
    }

    // eslint-disable-next-line unused-imports/no-unused-vars
    refresh(params: ICellRendererParams): boolean {
        return true;
    }
}

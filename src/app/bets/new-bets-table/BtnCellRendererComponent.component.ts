import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ButtonModule } from 'primeng/button';

export interface BtnCellRendererParams {
    clicked: ($event: MouseEvent) => void;
}
@Component({
    selector: 'app-btn-cell-renderer',
  imports: [
    ButtonModule,
    MatIconModule,
    MatTooltip
  ],
  standalone: true,
    template: `
    <div class="editButtonContainer">
        <p-button
          icon="pi pi-file-edit"
          class="editButton"
          [text]="true"
          aria-label="Edit selection"
          (click)="btnClickedHandler($event)">
        </p-button>
    </div>
  `,
    styles: [
        `
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

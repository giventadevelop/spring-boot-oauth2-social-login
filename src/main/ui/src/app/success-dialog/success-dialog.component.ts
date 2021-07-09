  import {Component, Inject, OnInit} from '@angular/core';
  import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
  import {ConfirmDialogModel} from '../common/confirm.dialog.model.class';
  import {ConfirmDialogResult} from '../common/confirm.dialog.result.interface';

  @Component({
    selector: 'app-success-dialog',
    templateUrl: './success-dialog.component.html',
    styleUrls: ['./success-dialog.component.css']
  })
  export class SuccessDialogComponent implements OnInit {

    title: string;
    message: string;
    loadingMessage: string;
    loading = false;
    successful = false;
    phoneId: any;
    confirmDialogResult = {} as ConfirmDialogResult;

    constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel ) {

      this.title = data.title;
      this.message = data.message;
      this.loadingMessage = data.loadingMessage;
      this.phoneId = data.inPutData;

    }

    ngOnInit(): void {
    }

    onConfirm(): void {
        this.dialogRef.close(this.confirmDialogResult);
     }

  }

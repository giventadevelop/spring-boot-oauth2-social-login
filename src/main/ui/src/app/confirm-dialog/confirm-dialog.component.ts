  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from "../_services/user.service";
import {ConfirmDialogResult} from "../common/confirm.dialog.result.interface";
  import {ConfirmDialogModel} from "../common/confirm.dialog.model.class";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  loadingMessage: string;
  loading = false;
  successful = false;
  phoneId: any;
  confirmDialogResult = {} as ConfirmDialogResult;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel, private userService: UserService) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.loadingMessage = data.loadingMessage;
    this.phoneId = data.inPutData;

  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.loading = true;
    setTimeout(() => {
      this.deletePhoneNumber();
    }, 2000);
    if (!this.loading) {
      this.dialogRef.close(this.confirmDialogResult);
    }
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.confirmDialogResult.confirmStatus=true;
    this.dialogRef.close(this.confirmDialogResult);
  }

  /**
   * called from delete dialog and calles user service
   * to delete from DB
   * @param index
   */
  deletePhoneNumber() {

    if(this.phoneId){
    this.userService.deleteUserPhone(this.phoneId).subscribe(
      data => {
       // console.log('phone data json getUserById', JSON.stringify(data));
        this.confirmDialogResult.confirmStatus=true;
        this.dialogRef.close(this.confirmDialogResult);

      },
      err => {
        console.log(err.error);
        this.loadingMessage='An unexpected error occurred loading user in loadUserDetails'
      }
    );
    }else{
      // case where there is no phone id then just return and get it deleted from the array and no  backend call
      this.confirmDialogResult.confirmStatus=true;
      this.dialogRef.close(this.confirmDialogResult);
      this.loading = false;
    }
  }
}



import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {PhoneNumber} from "../common/phone.number.interface";
import {UserService} from "../_services/user.service";

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
  phoneId: any
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
    // Close the dialog, return true
    this.loading = true;
    setTimeout(() => {
    /*  this.loading = false;
      this.successful = true;*/
      this.deletePhoneNumber();
    }, 10000);
    if (!this.loading) {
      this.dialogRef.close(true);
    }
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  /**
   * called from delete dialog and calles user service
   * to delete from DB
   * @param index
   */
  deletePhoneNumber() {
    this.userService.deleteUserPhone(this.phoneId).subscribe(
      data => {
       // console.log('phone data json getUserById', JSON.stringify(data));
        this.dialogRef.close(true);

      },
      err => {
        console.log(err.error);
        this.loadingMessage='An unexpected error occurred loading user in loadUserDetails'
        // this.errorMessage = 'An unexpected error occurred loading user in loadUserDetails';
      }
    );
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string, public loadingMessage: string,public inPutData: any) {
  }
}
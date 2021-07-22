import {Component, Inject, OnInit} from '@angular/core';

import {UserIdleSessionTimeoutService}  from './_services/user-idle-session-timeout.service';
import {SessionTimeoutEventEmitterService} from './_services/session-timeout-event-emitter.service';
import {environment} from '../environments/environment';
import {AuthService} from './_services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ConfirmDialogModel} from './common/confirm.dialog.model.class';
import {SessionTimeoutDialogComponent} from './session-timeout-dialog/session-timeout-dialog.component';
import {ConfirmDialogResult} from './common/confirm.dialog.result.interface';
import {Router} from '@angular/router';
import {TokenStorageService} from './_services/token-storage.service';
import {DOCUMENT} from '@angular/common';
// import {stringify} from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/stylesheet.css','../assets/css/form.css',
              '../assets/css/ui.css','../assets/css/colorbox.css'],

})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  private logoutPathParam: string;

  inputForm: any;
  idleTimerLeft: string;
  secondTimerLeft: string;
  timeRemain: number=0;
  FULL_DASH_ARRAY = 283;
  confirmDialogResult= {} as ConfirmDialogResult;

  constructor(private router: Router, private tokenStorageService: TokenStorageService, private userIdleSessionTimeoutService: UserIdleSessionTimeoutService,private sessionTimeoutEventEmitter: SessionTimeoutEventEmitterService,
              private matDialog: MatDialog, private authService: AuthService,  @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
  //private location: Location
    // subscribe to the event emitter on logon to start the Session Timer
    if (this.sessionTimeoutEventEmitter.sessionTimeoutSubscription==undefined) {
      this.sessionTimeoutEventEmitter.sessionTimeoutSubscription = this.sessionTimeoutEventEmitter
        .invokeSessionTimeoutEmitter.subscribe((name:string) => {
          this.startSessionTimer();
      });
    }
    /* this.inputForm = this.fb.group({
       firstLevelTimer: ['', Validators.required],
       secondLevelTimer: ['', Validators.required],
     });*/

    // this.startSessionTimer();
  }

  /**
   * Draw timer circle
   */
  /*formatTimeLeft = (time: number) => {
    if (time > 0) {
      let seconds = Math.trunc(time / 1000);

      this.setCircleDasharray(seconds);

      let min = 0;
      if (seconds >= 60) {
        min = Math.trunc(seconds / 60);
        console.log(min);
        seconds -= (min * 60);
      }

      return `${min}:${seconds}`;
    }
  }*/

  setCircleDasharray = (elapsedTime: number) => {
    /*const inputValue: any = this.inputForm.value;
    const timeLimit = inputValue.firstLevelTimer * 60;

    this.timeRemain = elapsedTime / timeLimit;
    const circleDasharray = `${(
      this.timeRemain * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);*/
  }

  startSessionTimer(): void {
   /* if (this.inputForm.invalid) {
      return;
    }

    const inputValue = this.inputForm.value;
    this.initTimer(inputValue.firstLevelTimer, inputValue.secondLevelTimer);*/
     this.initTimer(30, 30);
    //   this.initTimer(environment.SESSION_TIMEOUT_DURATION, environment.SESSION_TIMEOUT_REMAINING_DURATION);
  }

  initTimer(firstTimerValue: number, secondTimerValue: number): void {
    // Timer value initialization
    this.userIdleSessionTimeoutService.USER_IDLE_TIMER_VALUE_IN_MIN = firstTimerValue;
    this.userIdleSessionTimeoutService.FINAL_LEVEL_TIMER_VALUE_IN_MIN = secondTimerValue;
    // end

    // Watcher on timer
    this.userIdleSessionTimeoutService.initilizeSessionTimeout();
    this.userIdleSessionTimeoutService.userIdlenessChecker.subscribe((status: string) => {
      this.initiateFirstTimer(status);
    });

    this.userIdleSessionTimeoutService.secondLevelUserIdleChecker.subscribe((status: string) => {
      this.initiateSecondTimer(status);
    });
  }

  initiateFirstTimer = (status: string) => {
    switch (status) {
      case 'INITIATE_TIMER':
        break;

      case 'RESET_TIMER':
        break;

      case 'STOPPED_TIMER':
        this.showSendTimerDialog();
        break;

      default:
        // this.idleTimerLeft = this.formatTimeLeft(Number(status));
        break;
    }
  }

  initiateSecondTimer = (status: string) => {
    switch (status) {
      case 'INITIATE_SECOND_TIMER':
        break;

      case 'SECOND_TIMER_STARTED':
        break;

      case 'SECOND_TIMER_STOPPED':
        this.logout();
        break;

      default:
        this.secondTimerLeft = status;
        break;
    }
  }

  showSendTimerDialog(): void {
    // const modal = document.getElementById('myModal');
    // modal.style.display = 'block';
    /*const message = `You are getting logged out due to inactivity `;
    const dialogData = new ConfirmDialogModel('sessionTimeOut',"Confirm Action", message,'',2);
    const dialogRef = this.matDialog.open(SessionTimeoutDialogComponent, {
      maxWidth: "600px",
      maxHeight: "300px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmDialogResult = dialogResult;
      console.log('closed SessionTimeoutDialogComponent ');
      if(this.confirmDialogResult){
        if(this.confirmDialogResult.confirmStatus){
          this.continue();
        }
      } else{
        this.router.navigate(["/"]);
        // this._document.defaultView.location.assign('http://localhost:4200/#/web-home?isLoggedIn=false');
        console.log('Logout  from SessionTimeoutDialogComponent ');
        // this.authService.updateLoginLogoutMessage('logoutUsingSessionTimer');
       // window.location.reload();
       //  this.logout();
      }

    });
*/



  }

  continue(): void {
   /* const modal = document.getElementById('myModal');
    modal.style.display = 'none';*/

    // stop second timer and initiate first timer again
    UserIdleSessionTimeoutService.runSecondTimer = false;
    this.userIdleSessionTimeoutService.initilizeSessionTimeout();
  }

  logout(): void {
   /* const modal = document.getElementById('myModal');
    modal.style.display = 'none';*/
    // stop all timer and end the session
    UserIdleSessionTimeoutService.runTimer = false;
    UserIdleSessionTimeoutService.runSecondTimer = false;
    this.authService.updateLoginLogoutMessage('logoutUsingSessionTimer');

  /*  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/web-home'], {queryParams: {logout: true}});*/

   /* this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/web-header']);*/

    // this.authService.updateLoginLogoutMessage('logoutUsingSessionTimer');

  }

}


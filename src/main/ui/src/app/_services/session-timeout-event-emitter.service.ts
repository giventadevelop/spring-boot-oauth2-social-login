import { Injectable,EventEmitter } from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutEventEmitterService {

  invokeSessionTimeoutEmitter = new EventEmitter();
  sessionTimeoutSubscription: Subscription;
  constructor() { }

  onLoginSessionTimeoutSubscription() {
    console.log('onLoginSessionTimeoutSubscription', "event emitted to start session time out listener" )
    this.invokeSessionTimeoutEmitter.emit();
  }
}

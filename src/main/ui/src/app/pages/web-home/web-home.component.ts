import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PageFragment} from '../../common/page.fragment.interface';
import {of, Subscription, timer} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-web-home',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.css', '../../../assets/css/stylesheet.css', '../../../assets/css/form.css',
    '../../../assets/css/ui.css', '../../../assets/css/colorbox.css']
})

export class WebHomeComponent implements OnInit {

  showLoggedOutMessage :boolean = false;
  hideLoggedOutMessage :boolean = false;
  logoutRouteQueryParam :string;
  loggedInRouteQueryParam :string;
  animateMethodTimerSubscription : Subscription;
  logoutMessageTimerSubscription : Subscription;
  routerParamSubscription : Subscription;
  timerCounter :number=0;
  pageFragment1 = {fragmentVisible: false} as PageFragment;
  pageFragment2 = {fragmentVisible: true} as PageFragment;
  pageFragment3 = {fragmentVisible: true} as PageFragment;
  pageFragment4 = {fragmentVisible: true} as PageFragment;
  pageFragments = new Array<PageFragment>();
  loginStatus: any;

  constructor(private router: ActivatedRoute, private tokenStorageService: TokenStorageService,private authService: AuthService) {
  }

  ngOnInit(): void {

    this.logoutRouteQueryParam = this.router.snapshot.queryParamMap.get('logout')
    this.loggedInRouteQueryParam = this.router.snapshot.queryParamMap.get('isLoggedIn')

    if(this.logoutRouteQueryParam && this.logoutRouteQueryParam==='true' ){
      this.hideLoggedOutMessage = true;
      this.loginStatus= 'You have successfully logged out.'
      this.tokenStorageService.signOut();
      this.fadeOutLoggedOutMsg();
    }else if (this.loggedInRouteQueryParam && this.loggedInRouteQueryParam==='true'){
      this.hideLoggedOutMessage = true;
      this.authService.updateLoginLogoutMessage('isLoggedIn');
      this.loginStatus= 'You are logged in.'
      this.tokenStorageService.clearUserLoggedOut();
      this.fadeOutLoggedOutMsg();
    }
    this.pageFragment1.fragmentVisible = true;
    this.initPageFragment();

    if(this.logoutRouteQueryParam && this.logoutRouteQueryParam==='true' ) {
      this.authService.updateLoginLogoutMessage('logout');
    }

    if(!this.logoutRouteQueryParam && ! this.loggedInRouteQueryParam ) {
      this.authService.updateLoginLogoutMessage('home');
    }

  }

  private initPageFragment() {

    this.pageFragment1.fragmentVisible = false;
    this.pageFragments.push(this.pageFragment1);
    this.pageFragments.push(this.pageFragment2);
    this.pageFragments.push(this.pageFragment3);
    this.pageFragments.push(this.pageFragment4);
  }

  getPageFragments() {
    return this.pageFragments;
  }

  /**
   * Method to enable or disable a fragment display
   * @param index
   */
  enableFragment(index: number): void {

    this.pageFragments.forEach(function(pageFragment, fragmentIndex) {
      if (Number(fragmentIndex) === index) {
        pageFragment.fragmentVisible = false;
      } else {
        pageFragment.fragmentVisible = true;
      }
    });
  }

  animateSlideFragment() {
      this.enableFragment(this.timerCounter);
      this.timerCounter++;
      if(this.timerCounter == this.pageFragments.length){
        console.log('this.timerCounter is ', this.timerCounter);
        console.log(' this.hideLoggedOutMessage ',  this.hideLoggedOutMessage );
        this.timerCounter=0;
      }
  }

  /**
   * Call to fade out the successful
   * login_logout alert message
   */
  fadeOutLoggedOutMsg() {
    setTimeout( () => {
      this.hideLoggedOutMessage = false;
    }, 4000);
  }

  /**
   * Close the login_logout alert message
   * on cross button click.
   */
  fadeOutLoggedClose() {
    this.hideLoggedOutMessage = false;
    }

  ngAfterViewInit(): void{

    this.animateMethodTimerSubscription = timer(0, 10000).pipe(
      map(() => {
        this.animateSlideFragment();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.animateMethodTimerSubscription.unsubscribe();
  }

}

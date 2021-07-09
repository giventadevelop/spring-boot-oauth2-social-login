import {Component, OnInit} from '@angular/core';
import {PageFragment} from '../../common/page.fragment.interface';
import {of, Subscription, timer} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-web-home',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.css', '../../../assets/css/stylesheet.css', '../../../assets/css/form.css',
    '../../../assets/css/ui.css', '../../../assets/css/colorbox.css']
})
export class WebHomeComponent implements OnInit {
  showLoggedOutMessage :boolean = false;
  hideLoggedOutMessage :boolean = false;
  logoutPathParam :string;
  animateMethodTimerSubscription : Subscription;
  logoutMessageTimerSubscription : Subscription;
  routerParamSubscription : Subscription;
  timerCounter :number=0;
  pageFragment1 = {fragmentVisible: false} as PageFragment;
  pageFragment2 = {fragmentVisible: true} as PageFragment;
  pageFragment3 = {fragmentVisible: true} as PageFragment;
  pageFragment4 = {fragmentVisible: true} as PageFragment;
  //var pageFragments: Array<PageFragment> ;
  // pageFragments: PageFragment[] ;
  pageFragments = new Array<PageFragment>();

  constructor(private router: ActivatedRoute, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log('in  WebHomeComponent ngOnInit ');

   let isLoggingOut = this.tokenStorageService.getUserLoggedOut();
    console.log('isLoggingOut', isLoggingOut);
    if(isLoggingOut) {
      this.hideLoggedOutMessage = true;
      this.fadeOutLoggedOutMsg();

    }

   // this.logoutPathParam = this.router.snapshot.paramMap.get('logout')
  // this.logoutPathParam = this.router.snapshot.queryParamMap.get('logout')

  /*  if(this.logoutPathParam && this.logoutPathParam==='true' ){
      this.hideLoggedOutMessage = true;
      this.fadeOutLoggedOutMsg();
      /!*this.logoutMessageTimerSubscription = timer(5000, 0).pipe(
        map(() => {
          this.fadeOutLoggedOutMsg();
        })
      ).subscribe();*!/
    }*/


      //this.fadeOutLoggedOutMsg();



    this.pageFragment1.fragmentVisible = true;
    this.initPageFragment();



   /* if(this.showLoggedOutMessage){
      this.hideLoggedOutMessage = true;
      this.logoutMessageTimerSubscription = timer(5000, 0).pipe(
        map(() => {
          this.fadeOutLoggedOutMsg();
        })
      ).subscribe();
    }*/

   /* if(this.logoutPathParam) {
      if (this.logoutPathParam == 'logout') {
        this.hideLoggedOutMessage = true;

      }
    }*/

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

   /* let isLoggingOut = this.tokenStorageService.getUserLoggedOut();
    console.log('isLoggingOut', isLoggingOut);
   if(isLoggingOut) {
     this.hideLoggedOutMessage = true;
     this.tokenStorageService.signOut();
   }*/
    /*if(this.logoutPathParam && this.logoutPathParam==='true' ){
      this.hideLoggedOutMessage = true;
    }*/

   /* if(this.logoutPathParam) {
      if (this.logoutPathParam == 'logout') {
        this.hideLoggedOutMessage = true;

      }
    }*/
      this.enableFragment(this.timerCounter);
      this.timerCounter++;
    /*if(this.timerCounter == 2){
      this.hideLoggedOutMessage = false;
    }*/
      if(this.timerCounter == this.pageFragments.length){
        console.log('this.timerCounter is ', this.timerCounter);
        console.log(' this.hideLoggedOutMessage ',  this.hideLoggedOutMessage );
       // this.hideLoggedOutMessage = false;
        this.timerCounter=0;
      }
  }

  /**
   * call to fade out on page landing
   */
  fadeOutLoggedOutMsgStep1() {

    this.routerParamSubscription = this.router
      .queryParams
      .subscribe(params => {
        // Defaults to false if no query param provided.
        console.log('params[logout] in fadeOutLoggedOutMsg ', params['logout'])
        // this.hideLoggedOutMessage = params['logout'] || false;
        if( params['logout']){
         // this.hideLoggedOutMessage=true;
         this.fadeOutLoggedOutMsg();
        }

      });

    // this.hideLoggedOutMessage = false;
   // this.hideLoggedOutMessage = false;
    // this.hideLoggedOutMessage = true;
   /* this.routerParamSubscription = this.router
      .queryParams
      .subscribe(params => {
        // Defaults to false if no query param provided.
        console.log('params[logout] ', params['logout'])
        this.hideLoggedOutMessage = params['logout'] || false;
        if( this.hideLoggedOutMessage){
       //   this.fadeOutLoggedOutMsg();
        }

      });*/

  }

  fadeOutLoggedOutMsg() {

   /* let isLoggingOut = this.tokenStorageService.getUserLoggedOut();
    console.log('isLoggingOut', isLoggingOut);
    if(isLoggingOut) {
      this.hideLoggedOutMessage = true;
      this.tokenStorageService.signOut();
    }*/
    setTimeout( () => {
      this.tokenStorageService.signOut();
      this.hideLoggedOutMessage = false;
    }, 12000);
  }


  /**
   * close button click on alert
   */
  fadeOutLoggedClose() {
    this.hideLoggedOutMessage = false;
    }

  ngAfterViewInit(): void{

    this.animateMethodTimerSubscription = timer(0, 10000).pipe(
      map(() => {
        this.animateSlideFragment();
        //  this.loadData(); // load data contains the http request
      })
    ).subscribe();

  //this.fadeOutLoggedOutMsgStep1();


   /* of(1)
      .pipe(

        tap(val => { this.hideLoggedOutMessage = true;console.log("Before " + val);}),
        delay(12000)
      )
      .subscribe(
        val => console.log(val),
        e => console.log(e),
        () =>{console.log("Complete");this.hideLoggedOutMessage = false;}
      );*/


  //this.animateSlideFragment();
   }

  ngOnDestroy(): void {
    this.animateMethodTimerSubscription.unsubscribe();
  //  this.logoutMessageTimerSubscription.unsubscribe();
   //this.routerParamSubscription.unsubscribe();
  }

}

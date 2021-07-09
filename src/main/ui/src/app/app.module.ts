import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare,faAsterisk,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { WebHomeComponent } from './pages/web-home/web-home.component';
import { WebFooterComponent } from './pages/web-footer/web-footer.component';
import { WebHeaderComponent } from './pages/web-header/web-header.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { WebServicesComponent } from './pages/web-services/web-services.component';
import { WebPricingComponent } from './pages/web-pricing/web-pricing.component';
import { WebAboutComponent } from './pages/web-about/web-about.component';
import { WebContactComponent } from './pages/web-contact/web-contact.component';
import { WebHowitworksComponent } from './pages/web-howitworks/web-howitworks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    WebHomeComponent,
    WebFooterComponent,
    WebHeaderComponent,
    SuccessDialogComponent,
    WebServicesComponent,
    WebPricingComponent,
    WebAboutComponent,
    WebContactComponent,
    WebHowitworksComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgbModule,
        BrowserAnimationsModule, MatDialogModule, MatButtonModule, MatProgressSpinnerModule
    ],

  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [AlertDialogComponent],
  exports: [
    MatButtonModule, MatDialogModule
  ]
})
export class AppModule {

  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, faAsterisk,faPlusCircle, farSquare, farCheckSquare, faStackOverflow, faGithub, faMedium);
  }

}

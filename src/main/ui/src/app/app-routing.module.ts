import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {WebHomeComponent} from './pages/web-home/web-home.component';
import {WebServicesComponent} from './pages/web-services/web-services.component';
import {WebPricingComponent} from './pages/web-pricing/web-pricing.component';
import {WebAboutComponent} from './pages/web-about/web-about.component';
import {WebContactComponent} from './pages/web-contact/web-contact.component';
import {WebHowitworksComponent} from './pages/web-howitworks/web-howitworks.component';
import {WebHeaderComponent} from './pages/web-header/web-header.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'web-home', component: WebHomeComponent },
  { path: 'web-header', component: WebHeaderComponent },
  { path: 'web-services', component: WebServicesComponent },
  { path: 'web-pricing', component: WebPricingComponent },
  { path: 'web-contact', component: WebContactComponent },
  { path: 'web-howitworks', component: WebHowitworksComponent },
  { path: 'logout', redirectTo: '/web-home'},
  /*{ path: '', component: HomeComponent }*/
  /*{ path: 'logout',  'web-home/logout' },*/
 /* { path: '', component: WebHomeComponent }*/
  /*{ path: '', component: WebHomeComponent }*/
  /*{ path: '', redirectTo: '/web-home', pathMatch: 'full' }*/
  { path: '', component: WebHomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash:true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

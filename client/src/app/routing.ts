import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewLandscapeComponent } from './new-landscape/new-landscape.component';
import { LandscapeDetailComponent } from './landscape-detail/landscape-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AtlasComponent } from './atlas/atlas.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'new', component: NewLandscapeComponent },
  { path: 'landscapes/:id', component: LandscapeDetailComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'atlas', component: AtlasComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];

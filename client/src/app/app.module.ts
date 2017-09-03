import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { FileUploadModule } from "ng2-file-upload";
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {} from '@types/googlemaps';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SessionService } from "./services/session.service";
import { LoggedinService } from './services/loggedin.service';
import { LandscapeService } from './services/landscape.service';
import { routes } from './routing';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CartographyComponent } from './cartography/cartography.component';
import { GeneralMapComponent } from './general-map/general-map.component';
import { NewLandscapeComponent } from './new-landscape/new-landscape.component';
import { LandscapeDetailComponent } from './landscape-detail/landscape-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AtlasComponent } from './atlas/atlas.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CartographyComponent,
    GeneralMapComponent,
    NewLandscapeComponent,
    LandscapeDetailComponent,
    UserProfileComponent,
    AtlasComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FileUploadModule,
    LeafletModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
  apiKey: 'AIzaSyDE604pNrwO-AYiT5gkdY3KD_o72Qbqyfw',
  libraries: ['places']
})
  ],
  providers: [SessionService, LoggedinService, LandscapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, NgModule, Injector, ApplicationRef, ComponentFactoryResolver, NgZone, ElementRef, ViewChild } from '@angular/core';
import { LandscapeService } from '../services/landscape.service';
import {BrowserModule} from '@angular/platform-browser';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-general-map',
  templateUrl: './general-map.component.html',
  styleUrls: ['./general-map.component.css']
})
export class GeneralMapComponent implements OnInit {
  BASE_URL: string = environment.apiUrl;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public formatted_address: string;
  public locations: Array<object> = [];

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private landscapeService: LandscapeService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.landscapeService.indexAtlas().subscribe(landscapes => {
      this.locations = landscapes
      console.log(this.locations);
    });
  }
  ngOnInit() {
    this.zoom = 6;
    this.latitude = 39.5;
    this.longitude = -3;
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.formatted_address = place.formatted_address;
          //this.zoom = 14;
        });
      });
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        //this.zoom = 14;
      });
    }
  }
}

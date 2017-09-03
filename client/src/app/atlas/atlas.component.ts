import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { LandscapeService } from '../services/landscape.service';
import { Observable } from 'rxjs';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import { FormControl } from "@angular/forms";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.css']
})
export class AtlasComponent implements OnInit {
  BASE_URL: string = environment.apiUrl;
  landscapes:Observable<Array<object>>;
  user:any;
  public searchControl: FormControl;

  constructor(private landscapeService: LandscapeService, private session:SessionService) { }

  ngOnInit() {
    this.searchControl = new FormControl();


    this.landscapeService.indexAtlas()
    .subscribe(
      (landscapes => {
        this.landscapes = landscapes
        console.log(this.landscapes)}
      ),
      (err => console.log(err))
    )
  }

}

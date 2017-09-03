import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandscapeService } from '../services/landscape.service';
import { Observable } from 'rxjs';
import "rxjs/add/operator/mergeMap";
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { MapService } from '../services/map.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-landscape-detail',
  templateUrl: './landscape-detail.component.html',
  styleUrls: ['./landscape-detail.component.css'],
  providers: [MapService]
})
export class LandscapeDetailComponent implements OnInit {
    BASE_URL: string = environment.apiUrl;
    landscape: any;
    show: boolean;
    showGeoInfo: boolean;
    maps: any;
    user: any;

    constructor(
      private landscapeService: LandscapeService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private session: SessionService,
      private loggedin: LoggedinService,
      private mapService: MapService

    ) {
      activeRoute.params.mergeMap(p => landscapeService.show(p.id))
        .subscribe((landscape: Object) => {
          console.log(landscape);
          this.landscape = landscape;
        });
      this.show = false;
      this.showGeoInfo = false;
    }

    ngOnInit() {
    this.session.isLoggedIn().subscribe(user => this.successCbUser(user));
  }

    showForm() {
      this.show = !this.show;
    }

    editLandscape(id, myForm) {
      this.landscapeService.update(id, myForm.value).subscribe((landscape) => console.log(landscape));
    }

    remove(id) {
      this.landscapeService.remove(id).subscribe();
      this.router.navigate(['/atlas']);
    }

    createFavourite(landscape) {
      this.landscapeService.createFavourite(this.session.user._id, landscape).subscribe(favourite => console.log(favourite));
    }

    createGeoInfo() {
      this.showGeoInfo = !this.showGeoInfo;
      this.mapService.indexMaps().subscribe(maps => {
        this.maps = maps;
        console.log(this.maps);
      });
    }

    successCbUser(val) {
    this.user = val;
  }
  }

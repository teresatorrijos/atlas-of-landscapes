import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { LandscapeService } from '../services/landscape.service';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { EXIF } from "exif-js";

@Component({
  selector: 'app-new-landscape',
  templateUrl: './new-landscape.component.html',
  styleUrls: ['./new-landscape.component.css']
})
export class NewLandscapeComponent implements OnInit {

  BASE_URL: string = environment.apiUrl;

  uploader: FileUploader = new FileUploader({
    url: `${this.BASE_URL}/api/landscapes/new`
  });

  newLandscape = {
    pdescription: '',
    tags: []
  };
  landscape: any;
  feedback: any;
  user: any;
  error: string;
  localizacion: Array<number>;
  locateDegree: any;
  file: any;
  noExif: boolean;

  constructor(private landscapeService: LandscapeService,
    private session: SessionService,
    private loggedin: LoggedinService,
    public router: Router) { }

  ngOnInit() {
    this.session.isLoggedIn().subscribe(user => this.successCbUser(user));
    this.loggedin.getEmitter().subscribe(user => this.successCbUser(user));
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.router.navigate(['/']);
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  fileChangeEvent(e: any) {
    this.file = e.target.files[0];
    EXIF.getData(this.file, () => {
      if (!EXIF.getTag(this.file, "GPSLatitude"))
        this.noExif = true;
        this.file = undefined;
    });
  }

  addTag(value) {
    this.newLandscape.tags.push(value);
  }

  submit() {
    EXIF.getData(this.file, () => {
      const lat = EXIF.getTag(this.file, "GPSLatitude");
      const latRef = EXIF.getTag(this.file, "GPSLatitudeRef");
      const lng = EXIF.getTag(this.file, "GPSLongitude");
      const lngRef = EXIF.getTag(this.file, "GPSLongitudeRef");
      const latitude = this.landscapeService.convertGms2Dec(lat[0].numerator, lat[1].numerator, (lat[2].numerator) / 100, latRef);
      const longitude = this.landscapeService.convertGms2Dec(lng[0].numerator, lng[1].numerator, (lng[2].numerator) / 100, lngRef);
      this.locateDegree = "[" + lat + " " + latRef + ", " + lng + " " + lngRef + "]";
      this.localizacion = [latitude, longitude];

      this.uploader.onBuildItemForm = (item, form) => {
        form.append('pdescription', this.newLandscape.pdescription);
        form.append('locateDegree', this.locateDegree);
        form.append('localizacion', JSON.stringify(this.localizacion));
        form.append('tags', JSON.stringify(this.newLandscape.tags));
      };
      this.uploader.uploadAll();
    });
    this.router.navigate(['/atlas']);
  }

  successCbUser(val) {
    this.user = val;
    this.error = null;

  }
  errorCb(err) {
    this.error = err;
    console.log(this.error)
    this.landscape = null;
  }

  successCb(landscape) {
    this.landscape = landscape;
    this.error = null;
    this.router.navigate(['/'])
  }
}

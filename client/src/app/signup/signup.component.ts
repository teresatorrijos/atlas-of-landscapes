import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/user/signup`
  });

  user: any;
  formInfo = {
    username: '',
    password: '',
    name: '',
    email: ''
  };
  error: string;
  feedback: any;

  constructor(private session: SessionService, public router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.router.navigate(['/']);
    }
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  signup() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('username', this.formInfo.username);
      form.append('password', this.formInfo.password);
      form.append('name', this.formInfo.name);
      form.append('email', this.formInfo.email);
    };
    this.uploader.uploadAll();
    this.router.navigate(['/']);
    console.log(`${this.formInfo.username} is logged`)
  }

  errorCb(err) {
    this.error = err;
    console.log(this.error)
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    this.loggedin.checkLogged(user);
    this.router.navigate(['/'])
  }
}

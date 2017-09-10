import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/mergeMap";
import { Router } from '@angular/router';
import { LoggedinService } from '../services/loggedin.service';
import { SessionService } from '../services/session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  BASE_URL: string = environment.apiUrl;
  color: any;
  user: any;
  userSession:any;
  show: boolean;
  error:string;

  constructor(
    private session: SessionService,
    private loggedin: LoggedinService,
    private route: ActivatedRoute,
    private router: Router) {
    this.show = false;
  }

  ngOnInit() {
    this.color = "black"
    this.route.params
     .subscribe((params) => {
       console.log(params);
       this.session.getUserProfile(params.id).subscribe(user => {
         console.log(user);
         this.user = user});
     })
     this.session.isLoggedIn().subscribe(user => this.successCbUser(user));
     this.loggedin.getEmitter().subscribe(user => this.successCbUser(user));
   }

  showForm() {
    this.show = !this.show;
  }

  // editUser(id, myForm) {
  //   this.session.update(id, myForm.value).subscribe((user) => console.log(user));
  // }
  //
  // remove(id) {
  //   this.userService.remove(id).subscribe();
  //   this.router.navigate(['']);
  // }

  successCbUser(val) {
  this.userSession = val;
  this.error = null;
  }
}

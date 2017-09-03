import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import "rxjs/add/operator/mergeMap";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {
  BASE_URL: string = environment.apiUrl;
  user: any;
  show: boolean;

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    activeRoute.params
      .mergeMap(p => userService.show(p.id))
      .subscribe(userInfo => {
        this.user = userInfo;
        console.log(userInfo)
      });
    this.show = false;
  }

  ngOnInit() { }

  showForm() {
    this.show = !this.show;
  }

  editUser(id, myForm) {
    this.userService.update(id, myForm.value).subscribe((user) => console.log(user));
  }

  remove(id) {
    this.userService.remove(id).subscribe();
    this.router.navigate(['']);
  }
}

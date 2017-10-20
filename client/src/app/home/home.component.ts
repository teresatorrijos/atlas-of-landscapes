import { Component, OnInit } from '@angular/core';
import { LoggedinService } from '../services/loggedin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private loggedin: LoggedinService) {
    loggedin.getEmitter().subscribe((user) => { this.user = user });
  }

  ngOnInit() {
  }

}

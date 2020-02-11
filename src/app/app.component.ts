import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAWFd6mW4dI9MapGM-yr5xFJIVmcINwLz8",
      authDomain: "myapp-9bbfd.firebaseapp.com"
    });
  }

}

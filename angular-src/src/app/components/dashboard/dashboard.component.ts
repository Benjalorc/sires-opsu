import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {

  }
  
  dibujarMapa(callback){
    document.querySelector("#holder").remove();
    eval(callback);
  }

}

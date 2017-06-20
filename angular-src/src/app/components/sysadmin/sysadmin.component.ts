import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sysadmin',
  templateUrl: './sysadmin.component.html',
  styleUrls: ['./sysadmin.component.css']
})
export class SysadminComponent implements OnInit {

  pleaseToggleLeft: Boolean;
  firstToggleLeft: Boolean;
  showLeftLinks: Boolean;
  
  pleaseToggleRight: Boolean;
  firstToggleRight: Boolean;
  showRightLinks: Boolean;

  constructor() { }

  ngOnInit() {
    this.pleaseToggleLeft = true;
    this.firstToggleLeft = true;
    this.showLeftLinks = false;
    
    this.pleaseToggleRight = true;
    this.firstToggleRight = true;
    this.showRightLinks = false;
  }
  
  toggleLeftAnimations(){
    if(this.pleaseToggleLeft){
      this.showLeftLinks = true;
      document.getElementById("link1").classList.toggle("link1Go");
      document.getElementById("link2").classList.toggle("link2Go");
      if(!this.firstToggleLeft){
        document.getElementById("link1").classList.toggle("link1Back");
        document.getElementById("link2").classList.toggle("link2Back");  
      }
      this.pleaseToggleLeft = false;
    }
    else{
      document.getElementById("link1").classList.toggle("link1Back");
      document.getElementById("link2").classList.toggle("link2Back");
      document.getElementById("link1").classList.toggle("link1Go");
      document.getElementById("link2").classList.toggle("link2Go");
      if(this.firstToggleLeft){ this.firstToggleLeft = false; }
      this.pleaseToggleLeft = true;
      this.showLeftLinks = false;
    }
  }
  
  
  toggleRightAnimations(){
    if(this.pleaseToggleRight){
      this.showRightLinks = true;
      document.getElementById("link3").classList.toggle("link3Go");
      document.getElementById("link4").classList.toggle("link4Go");
      document.getElementById("link5").classList.toggle("link5Go");
      document.getElementById("link6").classList.toggle("link6Go");
      if(!this.firstToggleRight){
        document.getElementById("link3").classList.toggle("link3Back");
        document.getElementById("link4").classList.toggle("link4Back");
        document.getElementById("link5").classList.toggle("link5Back");
        document.getElementById("link6").classList.toggle("link6Back");        
      }
      this.pleaseToggleRight = false;
    }
    else{
      document.getElementById("link3").classList.toggle("link3Back");
      document.getElementById("link4").classList.toggle("link4Back");
      document.getElementById("link5").classList.toggle("link5Back");
      document.getElementById("link6").classList.toggle("link6Back");
      document.getElementById("link3").classList.toggle("link3Go");
      document.getElementById("link4").classList.toggle("link4Go");
      document.getElementById("link5").classList.toggle("link5Go");
      document.getElementById("link6").classList.toggle("link6Go");
      if(this.firstToggleRight){ this.firstToggleRight = false; }
      this.pleaseToggleRight = true;
      this.showRightLinks = false;
    }
  }
  

}

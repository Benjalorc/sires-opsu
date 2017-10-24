import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';


@Component({
  selector: 'app-sysadmin',
  templateUrl: './sysadmin.component.html',
  styleUrls: ['./sysadmin.component.css'],
  animations: [
    trigger('myAwesomeAnimation', [
        state('a0', style({
            transform: 'translate(0, 0)',
        })),
        state('a1', style({
            transform: 'translate(-50%, 90%)',
        })),
        state('a2', style({
            transform: 'translate(50%, 90%)',
        })),
        state('b0', style({
            transform: 'translate(0, 0)',            
        })),
        state('b1', style({
            transform: 'translate(-100%, 25%)',
        })),
        state('b4', style({
            transform: 'translate(100%, 25%)',
        })),
        state('b2', style({
            transform: 'translate(-50%, 115%)',
        })),
        state('b3', style({
            transform: 'translate(50%, 115%)',
        })),        
        state('b5', style({
            transform: 'translate(-50%, 215%)',
        })),        
        state('b6', style({
            transform: 'translate(50%, 215%)',
        })),

        transition('a0 => a1', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(0, 0)', offset: 0}),
          style({opacity: 1, transform: 'translate(-10%, 30%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(-20%, 45%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(-30%, 60%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(-40%, 75%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(-50%, 90%)', offset: 1.0})
        ]))),
        transition('a1 => a0', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(-50%, 90%)', offset: 0}),
          style({opacity: 1, transform: 'translate(-40%, 75%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(-30%, 60%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(-20%, 45%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(-10%, 30%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(0, 0)', offset: 1})
        ]))),
        
        transition('a0 => a2', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(0, 0)', offset: 0}),
          style({opacity: 1, transform: 'translate(10%, 30%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(20%, 45%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(30%, 60%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(40%, 75%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(50%, 90%)', offset: 1.0})
        ]))),
        transition('a2 => a0', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(50%, 90%)', offset: 0}),
          style({opacity: 1, transform: 'translate(40%, 75%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(30%, 60%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(20%, 45%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(10%, 30%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(0, 0)', offset: 1})
        ]))),
        
        transition('b0 => b1', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(0, 0)', offset: 0}),
          style({opacity: 1, transform: 'translate(-20%, 5%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(-40%, 10%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(-60%, 15%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(-80%, 20%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(-100%, 25%)', offset: 1.0})
        ]))),
        transition('b1 => b0', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(-100%, 25%)', offset: 0}),
          style({opacity: 1, transform: 'translate(-80%, 20%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(-60%, 15%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(-40%, 10%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(-20%, 5%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(0, 0)', offset: 1})
        ]))),
        
        transition('b0 => b4', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(0, 0)', offset: 0}),
          style({opacity: 1, transform: 'translate(20%, 5%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(40%, 10%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(60%, 15%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(80%, 20%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(100%, 25%)', offset: 1.0})
        ]))),
        transition('b4 => b0', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(100%, 25%)', offset: 0}),
          style({opacity: 1, transform: 'translate(80%, 20%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(60%, 15%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(40%, 10%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(20%, 5%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(0, 0)', offset: 1})
        ]))),
        
        transition('b0 => b2', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(0, 0)', offset: 0}),
          style({opacity: 1, transform: 'translate(-10%, 30%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(-20%, 50%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(-30%, 70%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(-40%, 90%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(-50%, 115%)', offset: 1.0})
        ]))),
        transition('b2 => b0', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(-50%, 115%)', offset: 0}),
          style({opacity: 1, transform: 'translate(-40%, 90%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(-30%, 70%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(-20%, 50%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(-10%, 30%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(0, 0)', offset: 1})
        ]))),
        
        transition('b0 => b3', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(0, 0)', offset: 0}),
          style({opacity: 1, transform: 'translate(10%, 30%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(20%, 50%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(30%, 70%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(40%, 90%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(50%, 115%)', offset: 1.0})
        ]))),
        transition('b3 => b0', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(50%, 115%)', offset: 0}),
          style({opacity: 1, transform: 'translate(40%, 90%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(30%, 70%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(20%, 50%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(10%, 30%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(0, 0)', offset: 1})
        ]))),
        
        transition('b0 => b5', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(0, 0)', offset: 0}),
          style({opacity: 1, transform: 'translate(-10%, 60%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(-20%, 100%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(-30%, 140%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(-40%, 180%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(-50%, 215%)', offset: 1.0})
        ]))),
        transition('b5 => b0', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(-50%, 215%)', offset: 0}),
          style({opacity: 1, transform: 'translate(-40%, 180%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(-30%, 140%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(-20%, 100%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(-10%, 60%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(0, 0)', offset: 1})
        ]))),

        transition('b0 => b6', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(0, 0)', offset: 0}),
          style({opacity: 1, transform: 'translate(10%, 60%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(20%, 100%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(30%, 140%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(40%, 180%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(50%, 215%)', offset: 1.0})
        ]))),
        transition('b6 => b0', animate('250ms ease-in', keyframes([
          style({opacity: 1, transform: 'translate(50%, 215%)', offset: 0}),
          style({opacity: 1, transform: 'translate(40%, 180%)', offset: 0.2}),
          style({opacity: 1, transform: 'translate(30%, 140%)', offset: 0.4}),
          style({opacity: 1, transform: 'translate(20%, 100%)', offset: 0.6}),
          style({opacity: 1, transform: 'translate(10%, 60%)', offset: 0.8}),
          style({opacity: 1, transform: 'translate(0, 0)', offset: 1})
        ]))),
    ]),
  ]
})
export class SysadminComponent implements OnInit {

  pleaseToggleLeft: Boolean;
  firstToggleLeft: Boolean;
  showLeftLinks: Boolean;
  
  pleaseToggleRight: Boolean;
  firstToggleRight: Boolean;
  showRightLinks: Boolean;

  icon1 : String;
  icon2 : String;
  icon3 : String;
  icon4 : String;
  icon5 : String;
  icon6 : String;
  icon7 : String;
  icon8 : String;

  constructor() { }

  ngOnInit() {
    this.pleaseToggleLeft = true;
    this.firstToggleLeft = true;
    this.showLeftLinks = false;
    
    this.pleaseToggleRight = true;
    this.firstToggleRight = true;
    this.showRightLinks = false;

    this.icon1 = 'a0';
    this.icon2 = 'a0';
    this.icon3 = 'b0';
    this.icon4 = 'b0';
    this.icon5 = 'b0';
    this.icon6 = 'b0';
    this.icon7 = 'b0';
    this.icon8 = 'b0';
  }

  animateLeft(){
    this.icon1 = (this.icon1 === 'a0' ? 'a1' : 'a0');
    this.icon2 = (this.icon2 === 'a0' ? 'a2' : 'a0');

    this.icon3 = 'b0';
    this.icon4 = 'b0';
    this.icon5 = 'b0';
    this.icon6 = 'b0';
    this.icon7 = 'b0';
    this.icon8 = 'b0';
  }

  animateRight(){
    this.icon3 = (this.icon3 === 'b0' ? 'b1' : 'b0');
    this.icon4 = (this.icon4 === 'b0' ? 'b2' : 'b0');
    this.icon5 = (this.icon5 === 'b0' ? 'b3' : 'b0');
    this.icon6 = (this.icon6 === 'b0' ? 'b4' : 'b0');
    this.icon7 = (this.icon7 === 'b0' ? 'b5' : 'b0');
    this.icon8 = (this.icon8 === 'b0' ? 'b6' : 'b0');

    this.icon1 = 'a0';
    this.icon2 = 'a0';
  }

}

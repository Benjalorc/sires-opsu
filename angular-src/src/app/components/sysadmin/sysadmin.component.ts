import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
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

    eval("window.yo = this");
  }

  animateLeft(){
    this.icon1 = (this.icon1 === 'a0' ? 'a1' : 'a0');
    this.icon2 = (this.icon2 === 'a0' ? 'a2' : 'a0');

    this.icon3 = 'b0';
    this.icon4 = 'b0';
    this.icon5 = 'b0';
    this.icon6 = 'b0';
  }

  animateRight(){
    this.icon3 = (this.icon3 === 'b0' ? 'b1' : 'b0');
    this.icon4 = (this.icon4 === 'b0' ? 'b2' : 'b0');
    this.icon5 = (this.icon5 === 'b0' ? 'b3' : 'b0');
    this.icon6 = (this.icon6 === 'b0' ? 'b4' : 'b0');

    this.icon1 = 'a0';
    this.icon2 = 'a0';
  }


    firstChart(){
    let ctx = "myChart";
    
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
        },

        // Configuration options go here
        options: {
          tooltips: {
            mode: 'point'
          }
        }
    });
  }

  secondChart(){
    let ctx = "myChart"
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                beginAtZero:true
              }
          }]
        }
      }
    });
  }






}

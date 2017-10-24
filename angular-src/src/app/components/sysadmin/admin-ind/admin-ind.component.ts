import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../../../services/carreras/carreras.service';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-ind',
  templateUrl: './admin-ind.component.html',
  styleUrls: ['./admin-ind.component.css']
})
export class AdminIndComponent implements OnInit {
 

  activeChart: any;

  constructor(private carrerasService: CarrerasService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {
  
    eval("window.yo = this");
  }


  firstChart(){
    let ctx = "myChart";
    
    this.activeChart = new Chart(ctx, {
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
    this.activeChart = new Chart(ctx, {
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

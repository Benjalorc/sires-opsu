import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../../../services/carreras/carreras.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-ind',
  templateUrl: './admin-ind.component.html',
  styleUrls: ['./admin-ind.component.css']
})
export class AdminIndComponent implements OnInit {
 

  constructor(private carrerasService: CarrerasService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {
 
  }

}

import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AdminUnivComponent } from '../../sysadmin/admin-univ/admin-univ.component';

@Component({
  selector: 'app-modal-carreras',
  templateUrl: './modal-carreras.component.html',
  styleUrls: ['./modal-carreras.component.css']
})

export class ModalCarrerasComponent implements OnInit{

  @Input() carreras;
  @Input() especialidadCargada;
  @Output() carreraChange = new EventEmitter<string>();
  carreraActual = {};

	constructor(){

    }

    ngOnInit() {
    }

  @ViewChild('modalCarreras') modalCarreras: ModalDirective;
 
  showChildModal(): void {
    this.modalCarreras.show();
  }
 
  hideChildModal(): void {
    this.modalCarreras.hide();
  }

  seleccionarCarrera(codigo){
    this.enviar(codigo);
    this.hideChildModal();
  }

  enviar(codigo){
    this.carreraChange.emit(codigo);
  }

}

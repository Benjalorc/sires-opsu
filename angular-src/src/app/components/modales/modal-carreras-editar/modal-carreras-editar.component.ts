import { Component, TemplateRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UniversidadesService } from '../../../services/universidades/universidades.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-modal-carreras-editar',
  templateUrl: './modal-carreras-editar.component.html',
  styleUrls: ['./modal-carreras-editar.component.css']
})
export class ModalCarrerasEditarComponent implements OnInit{


	@Input() univ;
	@Input() carrera;
	@Output() careersChanged = new EventEmitter<any>();

	modalRef: BsModalRef;
	constructor(private modalService: BsModalService,
  				private universidadesService: UniversidadesService,
  				private flashMessage: FlashMessagesService
  			) {
	}

  ngOnInit(){}
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  actualizarCarreraEnUniversidad(){

  	this.universidadesService.actualizarCarreras(this.univ.codigo, this.carrera).subscribe(data=>{
  		if(data.success){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
            this.careersChanged.emit(data);
  		}
  		else{
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
            this.careersChanged.emit(data);
  		}
  	})

  }

}

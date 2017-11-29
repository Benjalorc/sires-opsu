import { Component, TemplateRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UniversidadesService } from '../../../services/universidades/universidades.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-modal-carreras-eliminar',
  templateUrl: './modal-carreras-eliminar.component.html',
  styleUrls: ['./modal-carreras-eliminar.component.css']
})
export class ModalCarrerasEliminarComponent implements OnInit {

	@Input() univ;
	@Input() carrera;
	@Output() careersDeleted = new EventEmitter<string>();

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

  eliminarCarreraEnUniversidad(){

  	this.universidadesService.eliminarCarrera(this.univ.codigo, this.carrera).subscribe(data=>{
  		if(data.success){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
            this.careersDeleted.emit(this.carrera);
            this.modalRef.hide();
  		}
  		else{
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
  		}
  	})

  }

}

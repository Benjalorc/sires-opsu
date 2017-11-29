import { Component, TemplateRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UniversidadesService } from '../../../services/universidades/universidades.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-modal-universidad-eliminar',
  templateUrl: './modal-universidad-eliminar.component.html',
  styleUrls: ['./modal-universidad-eliminar.component.css']
})
export class ModalUniversidadEliminarComponent implements OnInit {

	@Input() univ;
	@Output() univDeleted = new EventEmitter<string>();

	modalRef: BsModalRef;
	constructor(private modalService: BsModalService,
  				private universidadesService: UniversidadesService,
  				private flashMessage: FlashMessagesService
  			) {
	}

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  eliminarUniversidad(){

  	this.universidadesService.eliminarUniversidad(this.univ.codigo).subscribe(data=>{
  		if(data.success){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
            this.univDeleted.emit(this.univ.codigo);
            this.modalRef.hide();
  		}
  		else{
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
  		}
  	})

  }


}

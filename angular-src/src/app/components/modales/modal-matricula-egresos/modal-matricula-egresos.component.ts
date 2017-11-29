import { Component, TemplateRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-modal-matricula-egresos',
  templateUrl: './modal-matricula-egresos.component.html',
  styleUrls: ['./modal-matricula-egresos.component.css']
})
export class ModalMatriculaEgresosComponent implements OnInit {
	
	@Input() ingresos;
	@Input() ano;
	@Input() periodo;
	@Input() carrera;
	@Output() updateAccepted = new EventEmitter<boolean>();	
	modalRef: BsModalRef;

	egresos: any;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
  	console.log(this.ingresos);
  	this.egresos = this.ingresos.filter((element) =>{return (element.egresados.nuevos_retiros!= 0)||(element.egresados.nuevos_graduandos!= 0) })
    this.modalRef = this.modalService.show(template);
  }

  accept(){
	this.updateAccepted.emit(true);
  	this.modalRef.hide();
  }

  decline(){
  	this.updateAccepted.emit(false);
  	this.modalRef.hide();
  }

}

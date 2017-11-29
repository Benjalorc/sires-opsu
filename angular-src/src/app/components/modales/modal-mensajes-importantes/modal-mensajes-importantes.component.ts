import { Component, TemplateRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-modal-mensajes-importantes',
  templateUrl: './modal-mensajes-importantes.component.html',
  styleUrls: ['./modal-mensajes-importantes.component.css']
})
export class ModalMensajesImportantesComponent implements OnInit {

	
	@Input() mensaje;
	modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  okMessage(){
  	this.modalRef.hide();
  }

}

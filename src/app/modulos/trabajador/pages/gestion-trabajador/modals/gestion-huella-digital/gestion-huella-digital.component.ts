import { Component, OnInit, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Contrato } from '../../../../../../models/Contrato';

@Component({
  selector: 'app-gestion-huella-digital',
  templateUrl: './gestion-huella-digital.component.html',
  styles: []
})
export class GestionHuellaDigitalComponent implements OnInit {

  @Input() input_contrato;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
  ) { }

  contrato: any = new Contrato();

  ngOnInit() {
    this.contrato = this.input_contrato;
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

}

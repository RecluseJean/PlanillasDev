import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Mes } from '../../../../../../models/Mes';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarActualizarMesComponent } from '../confirmar-actualizar-mes/confirmar-actualizar-mes.component';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { AnomesComponent } from '../../anomes.component';
import { Año } from '../../../../../../models/Año';


@Component({
  selector: 'app-nuevo-mes',
  templateUrl: './nuevo-mes.component.html',
  styles: []
})
export class NuevoMesComponent implements OnInit, OnDestroy {

  @Input() input_mes;
  validar: boolean = true;
  mes : Mes = new Mes();
  aux: Mes = new Mes();
  modalRef:NgbModalRef;

  constructor(
    public activemodal : NgbActiveModal,
    public router: Router,
    private modalService: NgbModal
  ) { }


  ngOnInit() {
    this.mes = this.input_mes;
    this.aux = this.input_mes;
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  confirmarNuevoMes(){
    this.openModalConfirmar();
  }

  public openModalConfirmar(){
    this.modalRef = this.modalService.open(ConfirmarActualizarMesComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_mes = this.mes;
    this.modalRef.result.then((result) => {
   }, (reason) => {
      this.activemodal.close();
   });
  }

  verificarMes(diasFeriadoCalend){
    if(diasFeriadoCalend>30){
      this.mes.diasFeriadoCalend = 0;
      Swal.fire(Constantes.WARNING,'Cantidad de dias invalidos','warning');
      this.refrescar(this.router.url);
    }
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

  verificarNumero(valor) {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(tecla);
    if (!patron.test(tecla_final)) {
      Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
      return false;
    }
  }

  validarNumero(valor) {debugger
    if(valor.length > 1){
      this.mes.diasFeriadoCalend  = 6;
    }else if(+valor > 6){
      this.mes.diasFeriadoCalend  = 6;
      Swal.fire({ title: "No puede exceder los 6 días", timer: 1000, showConfirmButton: false });
    }else{
      this.mes.diasFeriadoCalend = valor;
    }
  }


}

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Año } from '../../../../../../models/Año';
import { Empresa } from '../../../../../../models/Empresa';
import { AnoMesService } from '../../../../services/anomes/anomes.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-nuevo-ano',
  templateUrl: './confirmar-nuevo-ano.component.html',
  styles: []
})
export class ConfirmarNuevoAnoComponent implements OnInit {

  @Input() input_ano;

  constructor(
    public activemodal : NgbActiveModal,
    public router: Router,
    public anomesService: AnoMesService
  ) { }

  ano:Año = new Año();
  empresa:Empresa = new Empresa;

  ngOnInit() {
    this.ano = this.input_ano;
    var tmp : any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    this.empresa.idEmpresa=tmp.idEmpresa;
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  registrarAno() {
    var tmp_ano = {
      "descripcion": this.ano.descripcion,
      "empresa": {
        "idEmpresa": this.empresa.idEmpresa
      }
    }
    this.anomesService.registrarAno(tmp_ano).subscribe((resp:any) => {
      switch(resp.estado){
        case 1: Swal.fire(Constantes.SUCCESS,resp.msg,'success');
                this.refrescar(this.router.url); break;

        case 2: Swal.fire(Constantes.WARNING,resp.msg,'warning');break;

        default:  Swal.fire(Constantes.ERROR,resp.msg,'error');
      }
      }, (err) =>{
        Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
      });
    this.activemodal.dismiss();
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }
}

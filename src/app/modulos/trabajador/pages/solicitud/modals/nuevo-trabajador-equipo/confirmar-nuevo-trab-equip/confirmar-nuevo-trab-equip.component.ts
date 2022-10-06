import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EquipoService } from '../../../../../services/equipo/equipo.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../models/Constantes';
import { Equipo } from '../../../../../../../models/Equipo';

@Component({
  selector: 'app-confirmar-nuevo-trab-equip',
  templateUrl: './confirmar-nuevo-trab-equip.component.html',
  styles: []
})
export class ConfirmarNuevoTrabEquipComponent implements OnInit {

  //@Input() input_trabajador_final;
  @Input() input_lsTrabEquip;
  @Input() input_equipo;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    private equipoService : EquipoService,
  ) { }

  //public objEquiTrabajador: any = null;
  equipo: any = new Equipo();
  lsTrabajadoresEquip: any[] = [];

  ngOnInit() {
    //this.objEquiTrabajador = this.input_trabajador_final;
    this.lsTrabajadoresEquip = this.input_lsTrabEquip;
    this.equipo.idEquipo=this.input_equipo.idEquipo;
  }

  agregarTrabEquipo(){ //console.log("dto",this.objEquiTrabajador);
    /* var tmpdto = {
      "equipo": this.objEquiTrabajador.equipo,
      "trabajador": this.objEquiTrabajador.trabajador
    } */
    var tmpdto = {
      "equipo": {
        "idEquipo": this.equipo.idEquipo
      },
      "lsTrabajador": this.lsTrabajadoresEquip
    }
    this.equipoService.insertarTrabajadorEquipo(tmpdto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      }
    }, (err) => {
      Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
    });
    this.activemodal.dismiss();
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

}

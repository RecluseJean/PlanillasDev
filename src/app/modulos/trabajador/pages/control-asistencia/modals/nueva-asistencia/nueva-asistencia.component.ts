import { Component, OnInit, Input } from '@angular/core';
import { Asistencia } from '../../../../../../models/Asistencia';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import Swal from 'sweetalert2';
import { DatePipe, Time } from '@angular/common';

@Component({
    selector: 'app-nueva-asistencia',
    templateUrl: './nueva-asistencia.component.html',
    styles: []
})
export class NuevaAsistenciaComponent implements OnInit{
    
    @Input() input_trabajador;
    @Input() input_asistencia;

    public minDate: Date 
    public maxDate: Date 
    trabajador: any;
    asistencia: Asistencia = new Asistencia();
    pdoAno: Año = new Año();
    pdoMes: Mes = new Mes();7
    pipe = new DatePipe('es-PE');
    existe: boolean;


    constructor(
        public activemodal: NgbActiveModal,
        public router : Router,
        public asistenciaService: AsistenciaService
    ) {}

    ngOnInit(){
        this.pdoAno = JSON.parse(localStorage.getItem("anoSeleccion"));
        this.pdoMes = JSON.parse(localStorage.getItem("mesSeleccion"));
        this.trabajador = this.input_trabajador;
        if(this.input_asistencia!=null){
            this.asistencia = this.input_asistencia;
            this.trabajador = this.input_asistencia.trabajador;
        }else{
            this.asistencia.fecha = new Date();
        }
        var fecha1 = `${this.pdoMes.idPdoMes}/1/${this.pdoAno.descripcion}`;
        var fecha2 = `/${this.pdoMes.idPdoMes}/${this.pdoMes.cantidadDias}/${this.pdoAno.descripcion}`;
        this.minDate = new Date(fecha1)
        this.maxDate = new Date(fecha2)
    }

    close() {
        this.activemodal.dismiss('Cancelado');
      }
    
      public refrescar(url) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate([url]));
    }

    crud(){

       if(this.input_asistencia!=null){
           this.actualizarAsistencia();
       }else{
           if(this.input_trabajador.accion==Constantes.REGISTRAR){
               this.buscarFechaSiExiste();    
           }
       }
    }

    asignarObjetos(): any{
         var tmp = {
            "idAsistencia":this.asistencia.idAsistencia,
            "fecha": this.asistencia.fecha,
            "horIniDia": this.asistencia.horIniDia,
            "horFinDia":this.asistencia.horFinDia,
            "horIniAlmu": this.asistencia.horIniAlmu,
            "horFinAlmu": this.asistencia.horFinAlmu,
            "pdoAno":this.pdoAno,
            "pdoMes":this.pdoMes,
            "trabajador": this.trabajador
        }
        return tmp;
    }

    actualizarAsistencia(){
        var tmp = this.asignarObjetos();
        this.asistenciaService.actualizarAsistencia(tmp).subscribe((resp:any)=>{
            if(resp.estado==1){
                Swal.fire(Constantes.SUCCESS,resp.msg,'success');
                this.activemodal.close();
                this.refrescar(this.router.url)
            }else{
                Swal.fire(Constantes.ERROR,resp.msg,'error');
            }   
        })
    }

    buscarFechaSiExiste(){
        var tmp = this.asignarObjetos();
        this.asistenciaService.buscarFecha(tmp).subscribe((resp:any)=>{
            if(!resp.defaultObj){
                this.existe = false;
                this.registrarAsistencia(tmp);
            }else{
                Swal.fire(Constantes.INFO,'Esta fecha ya esta registrada para el trabajador','info')
                this.existe = true;
            }
        })
    }

    registrarAsistencia(tmp){
        this.asistenciaService.registrarAsistencia(tmp).subscribe((res:any)=>{
            Swal.fire(Constantes.SUCCESS,res.mensaje,'success')
            this.activemodal.close()
        },
        (err)=>{
            this.activemodal.dismiss('error')
        })

        
    }
    
}
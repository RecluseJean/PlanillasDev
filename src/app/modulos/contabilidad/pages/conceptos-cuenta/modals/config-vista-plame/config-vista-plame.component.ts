import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../../../models/Empresa';
import { VistaPlame } from '../../../../../../models/VistaPlame';
import { ConceptoCuentaService } from '../../../../services/concepto-cuenta/concepto-cuenta.service';
import { ConfirmarVistaPlameComponent } from '../confirmar-vista-plame/confirmar-vista-plame.component';

@Component({
  selector: 'app-config-vista-plame',
  templateUrl: './config-vista-plame.component.html',
  styles: []
})
export class ConfigVistaPlameComponent implements OnInit {

  @Input() input_vista_plame;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    private modalService: NgbModal,
    public conceptoCuentaSercive: ConceptoCuentaService
  ) { }

  modalRef: NgbModalRef;
  empresa: Empresa = new Empresa();
  vistaPlame: any = new VistaPlame();
  lsVistaPlame: any[] = [];
  lsVistaPlame1: any[] = [];
  lsVistaPlame2: any[] = [];
  lsVistaPlame3: any[] = [];
  lsVistaPlame4: any[] = [];
  lsVistaPlame5: any[] = [];
  lsVistaPlame6: any[] = [];
  lsVistaPlame7: any[] = [];
  lsVistaPlame8: any[] = [];

  lsVistaPlameFinal: any[]=[];

  lsVPlame: any[] = []

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.vistaPlame = this.input_vista_plame;
    if (this.empresa != null) {
      this.listarVistaPlame();
    }


  }

  listarVistaPlame() {
    this.conceptoCuentaSercive.listarVistaPlame(this.empresa).subscribe((resp: any) => {
      this.lsVistaPlame = resp.aaData;
      console.log('lsvistaplame', resp.aaData);
      var contador = 0;
      for (const i of this.lsVistaPlame) {
        i.id = contador++;
        switch (i.conceptoPlame.agrupConcepPlame.idAgrupadorConcepPlame) {
          case 1:
            this.lsVistaPlame1.push(i);
            break;
          case 2:
            this.lsVistaPlame2.push(i);
            break;
          case 3:
            this.lsVistaPlame3.push(i);
            break;
          case 4:
            this.lsVistaPlame4.push(i);
            break;
          case 5:
            this.lsVistaPlame5.push(i);
            break;
          case 6:
            this.lsVistaPlame6.push(i);
            break;
          case 7:
            this.lsVistaPlame7.push(i);
            break;
          case 8:
            this.lsVistaPlame8.push(i);
            break;
        }

      }

      setTimeout(() => { //debugger

        for (const ls1 of this.lsVistaPlame1) {
          var checkND: any
          checkND = document.getElementById('input' + ls1.id);
          if (ls1.iFlgVer == 0) {
            checkND.checked = false;
            ls1.asignado = false;
          } else {
            ls1.asignado = true;
            checkND.checked = true;
          }
        }

        for (const ls2 of this.lsVistaPlame2) {
          var checkND: any
          checkND = document.getElementById('input2' + ls2.id);
          if (ls2.iFlgVer == 0) {
            checkND.checked = false;
            ls2.asignado = false;
          } else {
            ls2.asignado = true;
            checkND.checked = true;
          }
        }

        for (const ls3 of this.lsVistaPlame3) {
          var checkND: any
          checkND = document.getElementById('input3' + ls3.id);
          if (ls3.iFlgVer == 0) {
            checkND.checked = false;
            ls3.asignado = false;
          } else {
            ls3.asignado = true;
            checkND.checked = true;
          }
        }

        for (const ls4 of this.lsVistaPlame4) {
          var checkND: any
          checkND = document.getElementById('input4' + ls4.id);
          if (ls4.iFlgVer == 0) {
            checkND.checked = false;
            ls4.asignado = false;
          } else {
            ls4.asignado = true;
            checkND.checked = true;
          }
        }

        for (const ls5 of this.lsVistaPlame5) {
          var checkND: any
          checkND = document.getElementById('input5' + ls5.id);
          if (ls5.iFlgVer == 0) {
            checkND.checked = false;
            ls5.asignado = false;
          } else {
            ls5.asignado = true;
            checkND.checked = true;
          }
        }

        for (const ls6 of this.lsVistaPlame6) {
          var checkND: any
          checkND = document.getElementById('input6' + ls6.id);
          if (ls6.iFlgVer == 0) {
            checkND.checked = false;
            ls6.asignado = false;
          } else {
            ls6.asignado = true;
            checkND.checked = true;
          }
        }

        for (const ls7 of this.lsVistaPlame7) {
          var checkND: any
          checkND = document.getElementById('input7' + ls7.id);
          if (ls7.iFlgVer == 0) {
            checkND.checked = false;
            ls7.asignado = false;
          } else {
            ls7.asignado = true;
            checkND.checked = true;
          }
        }

        for (const ls8 of this.lsVistaPlame8) {
          var checkND: any
          checkND = document.getElementById('input8' + ls8.id);
          if (ls8.iFlgVer == 0) {
            checkND.checked = false;
            ls8.asignado = false;
          } else {
            ls8.asignado = true;
            checkND.checked = true;
          }
        }

      }, 100);
    })
  }

  cambiarAsignado(objVP, index, tipGrup) {
    debugger
    var checkND: any
    var estado: boolean //= checkND.checked;
    var ls = this.lsVistaPlame1.indexOf(objVP)
    var ls2 = this.lsVistaPlame2.indexOf(objVP)
    var ls3 = this.lsVistaPlame3.indexOf(objVP)
    var ls4 = this.lsVistaPlame4.indexOf(objVP)
    var ls5 = this.lsVistaPlame5.indexOf(objVP)
    var ls6 = this.lsVistaPlame6.indexOf(objVP)
    var ls7 = this.lsVistaPlame7.indexOf(objVP)
    var ls8 = this.lsVistaPlame8.indexOf(objVP)    

    switch (tipGrup) {
      case 1:
        checkND = document.getElementById('input' + index);
        estado = checkND.checked;
        this.lsVistaPlame1[ls].asignado = estado;        
        break;
      case 2:
        checkND = document.getElementById('input2' + index);
        estado = checkND.checked;
        this.lsVistaPlame2[ls2].asignado = estado;
        break;
      case 3:
        checkND = document.getElementById('input3' + index);
        estado = checkND.checked;
        this.lsVistaPlame3[ls3].asignado = estado;
        break;
      case 4:
        checkND = document.getElementById('input4' + index);
        estado = checkND.checked;
        this.lsVistaPlame4[ls4].asignado = estado;
        break;
      case 5:
        checkND = document.getElementById('input5' + index);
        estado = checkND.checked;
        this.lsVistaPlame5[ls5].asignado = estado;
        break;
      case 6:
        checkND = document.getElementById('input6' + index);
        estado = checkND.checked;
        this.lsVistaPlame6[ls6].asignado = estado;
        break;
      case 7:
        checkND = document.getElementById('input7' + index);
        estado = checkND.checked;
        this.lsVistaPlame7[ls7].asignado = estado;
        break;
      case 8:
        checkND = document.getElementById('input8' + index);
        estado = checkND.checked;
        this.lsVistaPlame8[ls8].asignado = estado;
        break;
    }

    //var i = this.lsVistaPlame.indexOf(objVP);
    //this.lsVistaPlame2[ls2].asignado = estado;
    //this.lsVistaPlame[index].iFlgVer = 1;
  }

  guardarConfgVistaPlame() { debugger
    /* for (let i = 0; i < this.lsVistaPlame.length; i++) {
      if (this.lsVistaPlame[i].asignado == true) {
        this.lsVistaPlame[i].iFlgVer = 1
      } else {
        this.lsVistaPlame[i].iFlgVer = 0
      }
    } */
    for (const ls1 of this.lsVistaPlame1) {
      if(ls1.asignado == true){
        ls1.iFlgVer =1
      } else {
        ls1.iFlgVer = 0
      }
      this.lsVistaPlameFinal.push(ls1);
    }

    for (const ls2 of this.lsVistaPlame2) {
      if(ls2.asignado == true){
        ls2.iFlgVer =1
      } else {
        ls2.iFlgVer = 0
      }
      this.lsVistaPlameFinal.push(ls2);
    }

    for (const ls3 of this.lsVistaPlame3) {
      if(ls3.asignado == true){
        ls3.iFlgVer =1
      } else {
        ls3.iFlgVer = 0
      }
      this.lsVistaPlameFinal.push(ls3);
    }

    for (const ls4 of this.lsVistaPlame4) {
      if(ls4.asignado == true){
        ls4.iFlgVer =1
      } else {
        ls4.iFlgVer = 0
      }
      this.lsVistaPlameFinal.push(ls4);
    }

    for (const ls5 of this.lsVistaPlame5) {
      if(ls5.asignado == true){
        ls5.iFlgVer =1
      } else {
        ls5.iFlgVer = 0
      }
      this.lsVistaPlameFinal.push(ls5);
    }

    for (const ls6 of this.lsVistaPlame6) {
      if(ls6.asignado == true){
        ls6.iFlgVer =1
      } else {
        ls6.iFlgVer = 0
      }
      this.lsVistaPlameFinal.push(ls6);
    }

    for (const ls7 of this.lsVistaPlame7) {
      if(ls7.asignado == true){
        ls7.iFlgVer =1
      } else {
        ls7.iFlgVer = 0
      }
      this.lsVistaPlameFinal.push(ls7);
    }

    for (const ls8 of this.lsVistaPlame8) {
      if(ls8.asignado == true){
        ls8.iFlgVer =1
      } else {
        ls8.iFlgVer = 0
      }
      this.lsVistaPlameFinal.push(ls8);
    }

    var empresaDTO = {
      "lsVistaPlame": this.lsVistaPlameFinal
    }
    /* var empresaDTO = {
      "lsVistaPlame": this.lsVistaPlame
    } */
    this.openModalConfirmar(empresaDTO)
  }


  public openModalConfirmar(empresaDTO) { //debugger
    this.modalRef = this.modalService.open(ConfirmarVistaPlameComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_empresaDTO = empresaDTO;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }


  close() {
    this.activemodal.dismiss('Cancelado');
  }

}

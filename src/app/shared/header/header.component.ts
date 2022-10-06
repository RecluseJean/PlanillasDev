import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../../services/service.index';

import { Router } from '@angular/router';

import { Empresa } from '../../models/Empresa';
import Constantes from '../../models/Constantes';
import Swal from 'sweetalert2';
import { Año } from '../../models/Año';
import { Mes } from '../../models/Mes';
import { SidebarService } from '../../services/shared/sidebar.service';
import { URL_SERVICIOSBACK } from '../../config/config';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    public _headerService: HeaderService,
    public _siderService: SidebarService,
    public router: Router
  ) { }

  public empresa: Empresa = new Empresa();
  public ano: Año = new Año();
  public mes: Mes = new Mes();
  public lsEmpresas: any[] = [];
  public lsAno: any[] = [];
  public lsMeses: any[] = [];
  public storageEmp: any = null;
  public storageAno: any = null;
  public storageMes: any = null;

  token: any;
  imgURL: any;

  emp:any;

  interval: any;
  contador: number = 0;

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem("InfoToken")) || '';
    this.emp = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));

    if (this.token != "") {
      if (this.token.id_perfil == 1) {
        this.listarEmpresas();
      }

      if (this.emp != null) {
        if (this.emp.logo != null && this.emp.logo.length > 10) {
          this.imgURL = URL_SERVICIOSBACK + 'empresa/uploadImage/img/' + this.emp.logo
        }
      }
    }


    this.iniciarValores();
    this.iniciarTemporizador();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  iniciarTemporizador() {
    // document.onmousemove = () => {
    //   this.contador = 0;
    // };

    document.onmousedown = () => {
      this.contador = 0;
    };

    this.interval = setInterval(() => {
      this.contador++;
      if (this.contador == Constantes.tiempoSegundos) {
        clearInterval(this.interval)
        this.logout();
        Swal.fire(Constantes.WARNING, Constantes.msgInactividad, "warning");
      }
    }, 1000)
  }

  public listarEmpresas(): any {
    this._headerService.listarEmpresa().subscribe(resp => {
      if (resp.estado == 1) {
        this.lsEmpresas = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  public listarAno() {
    this._headerService.listarAno(this.empresa).subscribe(resp => {
      if (resp.estado == 1) {
        this.lsAno = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  public listarMeses() {
    this._headerService.listarMeses().subscribe(resp => {
      if (resp.estado == 1) {
        this.lsMeses = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  setEmpresa(event) {
    if (event != null) {
      for (let emp of this.lsEmpresas) {
        if (emp.idEmpresa == event) {
          localStorage.setItem('objEmpresaSeleccion', JSON.stringify(emp));
          localStorage.removeItem('anoSeleccion');
          localStorage.removeItem('mesSeleccion');
          this.refrescar(this.router.url)
        }
      }

    } else {
      localStorage.removeItem('objEmpresaSeleccion');
      localStorage.removeItem('anoSeleccion');
      localStorage.removeItem('mesSeleccion');
      this.refrescar(this.router.url)
    }
    this.listarAno();
  }

  setAno(event) {
    if (event != null) {
      for (let ano of this.lsAno) {
        if (ano.idPdoAno == event) {
          localStorage.setItem('anoSeleccion', JSON.stringify(ano));
          localStorage.removeItem('mesSeleccion');
          this.refrescar(this.router.url)
        }
      }
    } else {
      localStorage.removeItem('anoSeleccion');
      localStorage.removeItem('mesSeleccion');
      this.refrescar(this.router.url)
    }
    this.listarMeses();
  }

  setMes(event) {
    if (event != null) {
      for (let mes of this.lsMeses) {
        if (mes.idPdoMes == event) {
          localStorage.setItem('mesSeleccion', JSON.stringify(mes));
          this.refrescar(this.router.url)
        }
      }
    } else {
      localStorage.removeItem('mesSeleccion');
      this.refrescar(this.router.url)
    }
  }

  iniciarValores() {
    this.storageEmp = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    if (this.storageEmp != null) {
      this.empresa.idEmpresa = this.storageEmp.idEmpresa;
      this.listarAno();
      this.storageAno = JSON.parse(localStorage.getItem('anoSeleccion'));
      if (this.storageAno != null) {
        this.ano.idPdoAno = this.storageAno.idPdoAno;
        this.listarMeses();
        this.storageMes = JSON.parse(localStorage.getItem('mesSeleccion'));
        if (this.storageMes != null) {
          this.mes.idPdoMes = this.storageMes.idPdoMes;
        }
      }
    }
  }

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

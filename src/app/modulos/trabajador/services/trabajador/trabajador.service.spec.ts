import { TestBed, inject, async } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { TrabajadorService } from './trabajador.service';




describe('TrabajadorService',()=>{
    var actualTipoDoc, actualPais, actualEstadoCivil, actualDepartamento, actualProvincia ,
    actualDistrito, actualTipoZona, actualNivelEdu, actualOcupacion, actualAfp, actualEps, actualRegSalud,
    actualSituacion, actualRegLaboral,actualTipoContrato,actualCentroCosto, actualCategoria, actualCargo,
      actualAreaDepEmp, actualPuesto, actualTipoPago, actualBanco, actualSctr,actualTrabajador, mockResponse

    const empresa = ConstantesDatosPrueba.empresa1;
    const trabajador = ConstantesDatosPrueba.Trabajador1;
    const mockResponseTipoDoc = ConstantesDatosPrueba.ResponseWrapperListaTipoDoc;
    const mockResponsePais = ConstantesDatosPrueba.ResponseWrapperListaPais;
    const mockResponseEstadoCivil = ConstantesDatosPrueba.ResponseWrapperListaEstdCivil;
    const mockResponseDepa = ConstantesDatosPrueba.ResponseWrapperListaDepa;
    const mockResponseProv = ConstantesDatosPrueba.ResponseWrapperListaProv;
    const mockResponseDist = ConstantesDatosPrueba.ResponseWrapperListaDistrito;
    const mockResponseTipZon = ConstantesDatosPrueba.ResponseWrapperListaTipoZona;
    const mockResponseNivEdu = ConstantesDatosPrueba.ResponseWrapperListaNivelEdu;
    const mockResponseOcup = ConstantesDatosPrueba.ResponseWrapperListaOcup;
    const mockResponseAfp = ConstantesDatosPrueba.ResponseWrapperListaAfp;
    const mockResponseEps = ConstantesDatosPrueba.ResponseWrapperListaEps;
    const mockResponseRegSal = ConstantesDatosPrueba.ResponseWrapperListaRegSal;
    const mockResponseSit = ConstantesDatosPrueba.ResponseWrapperListaSituac;
    const mockResponseRegLab = ConstantesDatosPrueba.ResponseWrapperListaRegLab;
    const mockResponseTipCont = ConstantesDatosPrueba.ResponseWrapperListaTipCont;
    const mockResponseCenCost = ConstantesDatosPrueba.ResponseWrapperListaCenCost;
    const mockResponseCate = ConstantesDatosPrueba.ResponseWrapperListaCategoria;
    const mockResponseCarg = ConstantesDatosPrueba.ResponseWrapperListaCargo;
    const mockResponseAreaDepEmp = ConstantesDatosPrueba.ResponseWrapperListaAreaDepEmp;
    const mockResponsePuesto = ConstantesDatosPrueba.ResponseWrapperListaPuesto;
    const mockResponseTipPag = ConstantesDatosPrueba.ResponseWrapperListaTipPago;
    const mockResponseBan = ConstantesDatosPrueba.ResponseWrapperListaBanco;
    const mockResponseSctr = ConstantesDatosPrueba.ResponseWrapperListaSctr;
    const mockResponseTrab = ConstantesDatosPrueba.ResponseWrapperCRUDTrab;

    beforeEach(async(()=> {

        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule,
                    RouterTestingModule
                ],

          providers: [TrabajadorService],

          declarations: [ ]
        })
        .compileComponents();
      }));

      describe('Obtener ResponseWraper de ListarTipoDoc con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/tipoDoc';
          _trabajadorService.listarTipoDoc()
          .subscribe(
            (res) => {
             actualTipoDoc = res;
            }
          );
          const req = httpMock.expectOne(url);
          req.flush(mockResponseTipoDoc);
          expect(actualTipoDoc).toEqual(mockResponseTipoDoc);
          expect(req.request.method).toBe('GET');
        })
      );
      });

      describe('Obtener ResponseWraper de ListarPais con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/pais';
          _trabajadorService.listarPais()
          .subscribe(
            (res) => {
             actualPais = res;
            }
          );
          const req = httpMock.expectOne(url);
          req.flush(mockResponsePais);
          expect(req.request.method).toBe('GET');
          expect(actualPais).toEqual(mockResponsePais);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarEstadoCivil con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/estadoCivil';
          _trabajadorService.listarEstadoCivil()
          .subscribe(
            (res) => {
              actualEstadoCivil = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseEstadoCivil);
          expect(req.request.method).toBe('GET');
          expect(actualEstadoCivil).toEqual(mockResponseEstadoCivil);
        })
      );
      });

      describe('Obtener ResponseWraper de ListarDepartamentos con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/departamento';
          _trabajadorService.listarDepartamento()
          .subscribe(
            (res) => {
              actualDepartamento = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseDepa);
          expect(req.request.method).toBe('GET');
          expect(actualDepartamento).toEqual(mockResponseDepa);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarProvincia con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/provincia/porDepartamento';

          _trabajadorService.listarProvincia({"idDepartamento": 1,"descripcion": "AMAZONAS"})
          .subscribe(
            (res) => {
              actualProvincia = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseProv);
          expect(req.request.method).toBe('POST');
          expect(actualProvincia).toEqual(mockResponseProv);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarDistrito con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/distrito/porProvincia';

          _trabajadorService.listarDistrito({"idProvincia": 1, "descripcion": "BAGUA"})
          .subscribe(
            (res) => {
              actualDistrito = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseDist);
          expect(req.request.method).toBe('POST');
          expect(actualDistrito).toEqual(mockResponseDist);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarTipoZona con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/tipoZona';

          _trabajadorService.listarTipoZona()
          .subscribe(
            (res) => {
              actualTipoZona = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTipZon);
          expect(req.request.method).toBe('GET');
          expect(actualTipoZona).toEqual(mockResponseTipZon);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarNiveEdu con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/nivelEdu';

          _trabajadorService.listarNivelEdu()
          .subscribe(
            (res) => {
              actualNivelEdu = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseNivEdu);
          expect(req.request.method).toBe('GET');
          expect(actualNivelEdu).toEqual(mockResponseNivEdu);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarOcupacion con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/ocupacion';

          _trabajadorService.listarOcupacion()
          .subscribe(
            (res) => {
              actualOcupacion = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseOcup);
          expect(req.request.method).toBe('GET');
          expect(actualOcupacion).toEqual(mockResponseOcup);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarAfp con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/afp/listarXEmpresa';

          _trabajadorService.listarAfp(empresa)
          .subscribe(
            (res) => {
              actualAfp = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseAfp);
          expect(req.request.method).toBe('POST');
          expect(actualAfp).toEqual(mockResponseAfp);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarEps con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/eps/listar';

          _trabajadorService.listarEps()
          .subscribe(
            (res) => {
              actualEps = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseEps);
          expect(req.request.method).toBe('GET');
          expect(actualEps).toEqual(mockResponseEps);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarEps con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/eps/listar';

          _trabajadorService.listarEps()
          .subscribe(
            (res) => {
              actualEps = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseEps);
          expect(req.request.method).toBe('GET');
          expect(actualEps).toEqual(mockResponseEps);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarRegSalud con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/regSalud';

          _trabajadorService.listarRegSalud()
          .subscribe(
            (res) => {
              actualRegSalud = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseRegSal);
          expect(req.request.method).toBe('GET');
          expect(actualRegSalud).toEqual(mockResponseRegSal);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarSituacion con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/situacion';

          _trabajadorService.listarSituacion()
          .subscribe(
            (res) => {
              actualSituacion = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseSit);
          expect(req.request.method).toBe('GET');
          expect(actualSituacion).toEqual(mockResponseSit);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarRegimenLaboral con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/regimenLaboral';

          _trabajadorService.listarRegLaboral()
          .subscribe(
            (res) => {
              actualRegLaboral = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseRegLab);
          expect(req.request.method).toBe('GET');
          expect(actualRegLaboral).toEqual(mockResponseRegLab);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarTipoContrato con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/tipoContrato';

          _trabajadorService.listarTipoContrato()
          .subscribe(
            (res) => {
              actualTipoContrato = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTipCont);
          expect(req.request.method).toBe('GET');
          expect(actualTipoContrato).toEqual(mockResponseTipCont);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarCentroCosto con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/centroCosto/porEmpresa';

          _trabajadorService.listarCentroCosto(empresa)
          .subscribe(
            (res) => {
              actualCentroCosto = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseCenCost);
          expect(req.request.method).toBe('POST');
          expect(actualCentroCosto).toEqual(mockResponseCenCost);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarCategoria con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/categoria/listar';

          _trabajadorService.listarCategoria(empresa)
          .subscribe(
            (res) => {
              actualCategoria = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseCate);
          expect(req.request.method).toBe('POST');
          expect(actualCategoria).toEqual(mockResponseCate);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarCargo con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/cargo/listarPorCategoria';

          _trabajadorService.listarCargo({"idCategoria":1})
          .subscribe(
            (res) => {
              actualCargo = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseCarg);
          expect(req.request.method).toBe('POST');
          expect(actualCargo).toEqual(mockResponseCarg);

        })
      );
      });

  describe('Obtener ResponseWraper de ListarAreaDepEmp con POST del Back', () => {
    it('Objeto ResponseWraper esperado',
      inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
        const url = 'http://localhost:2000/api/areaDepartamentoEmpresa/listarAreaDepartamentoEmpresa';

        _trabajadorService.listarAreaDepEmp(empresa)
          .subscribe(
            (res) => {
              actualAreaDepEmp = res;
            }
          );

        const req = httpMock.expectOne(url);
        req.flush(mockResponseAreaDepEmp);
        expect(req.request.method).toBe('POST');
        expect(actualAreaDepEmp).toEqual(mockResponseCate);

      })
    );
  });

  describe('Obtener ResponseWraper de ListarPuesto con POST del Back', () => {
    it('Objeto ResponseWraper esperado',
      inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
        const url = 'http://localhost:2000/api/puestoAreaEmpresa/listarPuesto';

        _trabajadorService.listarPuesto({ "iidAreaDepartamentoEmpresa": 1 })
          .subscribe(
            (res) => {
              actualPuesto = res;
            }
          );

        const req = httpMock.expectOne(url);
        req.flush(mockResponsePuesto);
        expect(req.request.method).toBe('POST');
        expect(actualPuesto).toEqual(mockResponseCarg);

      })
    );
  });

      describe('Obtener ResponseWraper de ListarTipoPago con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/tipoPago';

          _trabajadorService.listarTipoPago()
          .subscribe(
            (res) => {
              actualTipoPago = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTipPag);
          expect(req.request.method).toBe('GET');
          expect(actualTipoPago).toEqual(mockResponseTipPag);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarBancos con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/banco';

          _trabajadorService.listarBanco()
          .subscribe(
            (res) => {
              actualBanco = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseBan);
          expect(req.request.method).toBe('GET');
          expect(actualBanco).toEqual(mockResponseBan);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarSctr con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/sctr/listar';

          _trabajadorService.listarSctr()
          .subscribe(
            (res) => {
              actualSctr = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseSctr);
          expect(req.request.method).toBe('GET');
          expect(actualSctr).toEqual(mockResponseSctr);

        })
      );
      });

      describe('Obtener ResponseWraper de InsertarTrabajador con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/trabajador/registrar';

          _trabajadorService.insertarTrabajador(trabajador)
          .subscribe(
            (res) => {
              actualTrabajador = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('POST');
          expect(actualTrabajador).toEqual(mockResponseTrab);

        })
      );
      });

      describe('Obtener ResponseWraper de ModificarTrabajador con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/trabajador/modificar';

          _trabajadorService.actualizarTrabajador(trabajador)
          .subscribe(
            (res) => {
              actualTrabajador = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('PUT');
          expect(actualTrabajador).toEqual(mockResponseTrab);

        })
      );
      });

      describe('Obtener ResponseWraper de ListarTrabajadorPorComprobante con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/trabajador/porEmpresayTipoComprobante/1';

          _trabajadorService.listarTrabajadorPorComprobante(empresa,1)
          .subscribe(
            (res) => {
              actualTrabajador = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('POST');
          expect(actualTrabajador).toEqual(mockResponseTrab);

        })
      );
      });

      describe('¨Prueba metodo generarContrato ', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/contrato/generarContrato';

          _trabajadorService.generarContrato(trabajador)
          .subscribe(
            (res) => {
              mockResponse = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('POST');
          expect(mockResponse).toEqual(mockResponseTrab);

        })
      );
      });

      describe('¨Prueba metodo descargarContrato ', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/contrato/descargarWord/file';
          const file = new ArrayBuffer(5000);
          _trabajadorService.descargarContrato('file')
          .subscribe(
            (res) => {
              mockResponse = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(file);
          expect(req.request.method).toBe('GET');
          expect(mockResponse).toEqual(file);

        })
      );
      });


      describe('¨Prueba metodo subirContrato ', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/contrato/subirWord/1';

          var file = new File([""],'file.txt')
          _trabajadorService.subirContrato(file,1)
          .subscribe(
            (res) => {
              mockResponse = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('POST');
          expect(mockResponse).toEqual(mockResponseTrab);

        })
      );
      });

      describe('¨Prueba metodo registrarDH ', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/derechohabientes/registrar';

          _trabajadorService.registrarDH({})
          .subscribe(
            (res) => {
              mockResponse = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('POST');
          expect(mockResponse).toEqual(mockResponseTrab);
        })
      );
      })

      describe('¨Prueba metodo listarXTrab ', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/derechohabientes/listarxTrab';

          _trabajadorService.listarXTrab({})
          .subscribe(
            (res) => {
              mockResponse = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('POST');
          expect(mockResponse).toEqual(mockResponseTrab);
        })
      );
      })

      describe('¨Prueba metodo darBajaDH ', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/derechohabientes/darBaja';

          _trabajadorService.darBajaDH({})
          .subscribe(
            (res) => {
              mockResponse = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('POST');
          expect(mockResponse).toEqual(mockResponseTrab);
        })
      );
      })

      describe('¨Prueba metodo subirArchivo ', () => {
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, TrabajadorService], (httpMock: HttpTestingController, _trabajadorService: TrabajadorService) => {
          const url = 'http://localhost:2000/api/derechohabientes/subirArchivo/1';

          var file = new File([""],'file.txt')
          _trabajadorService.subirArchivo(file,1)
          .subscribe(
            (res) => {
              mockResponse = res;
            }
          );

          const req = httpMock.expectOne(url);
          req.flush(mockResponseTrab);
          expect(req.request.method).toBe('POST');
          expect(mockResponse).toEqual(mockResponseTrab);

        })
      );
      });

});

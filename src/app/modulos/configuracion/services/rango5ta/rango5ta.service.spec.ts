import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Rango5taService } from './rango5ta.service';
import constRango5ta from 'src/app/mocks/services/rango5taContaste';

describe("Empresa Service", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [Rango5taService]
        }).compileComponents();
    }));

/*     describe("Rango5taService", () => {
        it("Listar Empresas", inject(
            [HttpTestingController, Rango5taService],
            (httpMock: HttpTestingController, ranService: Rango5taService) => {
                const url = 'http://localhost:2000/api/rango5ta/porEmpresa';

                ranService.listarRango5ta().subscribe((resp: any) => {
                    expect(resp).toEqual(constRango5ta.lsRango5ta);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('GET');
                req.flush(constRango5ta.lsRango5ta)
            }
        ));
    }); */

/*     describe("Rango5taService", () => {
        it("Listar Tipo Empresas", inject(
            [HttpTestingController, Rango5taService],
            (httpMock: HttpTestingController, ranService: Rango5taService) => {
                const url = 'http://localhost:2000/api/tipoEmpresa/listar';

                ranService.listarTipoEmpresa().subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.lsTipoEmp);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('GET');
                req.flush(constEmpresa.lsTipoEmp)
            }
        ));
    }); */

/*     describe("Rango5taService", () => {
        it("Listar Regimen Tributarios", inject(
            [HttpTestingController, Rango5taService],
            (httpMock: HttpTestingController, ranService: Rango5taService) => {
                const url = 'http://localhost:2000/api/regimenTributario/listar';

                ranService.listarRegTributario().subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.lsRegTrib);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('GET');
                req.flush(constEmpresa.lsRegTrib)
            }
        ));
    }); */

/*     describe("Rango5taService", () => {
        it("Registrar Empresa", inject(
            [HttpTestingController, Rango5taService],
            (httpMock: HttpTestingController, ranService: Rango5taService) => {
                const url = 'http://localhost:2000/api/empresa/registrar';
                var tmp_cat = {
                    "empresa": {
                        "razonSocial": "Partner Tech Sac",
                        "ruc": "12121212121",
                        "estado": 1,
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0
                    },
                    "regTributario": {

                        "idRegTrib": 1,
                        "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                    },

                    "tipoEmpresa": {
                        "idTipoEmp": 3,
                        "descripcion": "MEDIANA EMPRESA"
                    }
                }
                ranService.registrarEmpresa(tmp_cat).subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.regEmpresa);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constEmpresa.regEmpresa)
            }
        ));
    }); */

    describe("Rango5taService", () => {
        it("Actualizar Empresa", inject(
            [HttpTestingController, Rango5taService],
            (httpMock: HttpTestingController, ranService: Rango5taService) => {
                const url = 'http://localhost:2000/api/empresa/modificar';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 5,
                        "razonSocial": "Partner Tech SAC",
                        "ruc": "12121212121",
                        "estado": 1,
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0
                    },
                    "regTributario": {

                        "idRegTrib": 1,
                        "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                    },

                    "tipoEmpresa": {
                        "idTipoEmp": 3,
                        "descripcion": "MEDIANA EMPRESA"
                    }
                }
                ranService.actualizarRango5ta(tmp_cat).subscribe((resp: any) => {
                    expect(resp).toEqual(constRango5ta.actRango5ta);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('PUT');
                req.flush(constRango5ta.actRango5ta)
            }
        ));
    });


/*     describe("Rango5taService", () => {
        it("Eliminar Empresa", inject(
            [HttpTestingController, Rango5taService],
            (httpMock: HttpTestingController, ranService: Rango5taService) => {
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 4
                    }
                }
                const url = 'http://localhost:2000/api/empresa/' + tmp_cat.empresa.idEmpresa;
                ranService.eliminarEmpresa(tmp_cat.empresa).subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.eliEmpresa);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('DELETE');
                req.flush(constEmpresa.eliEmpresa)
            }
        ));
    }); */

});
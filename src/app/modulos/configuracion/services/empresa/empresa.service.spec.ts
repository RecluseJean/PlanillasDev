import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EmpresaService } from './empresa.service';
import constEmpresa from '../../../../mocks/empresaConstante';

describe("Empresa Service", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EmpresaService]
        }).compileComponents();
    }));

    describe("EmpresaService", () => {
        it("Listar Empresas", inject(
            [HttpTestingController, EmpresaService],
            (httpMock: HttpTestingController, empService: EmpresaService) => {
                const url = 'http://localhost:2000/api/empresa/listar';

                empService.listarEmpresa().subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.lsEmpresa);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('GET');
                req.flush(constEmpresa.lsEmpresa)
            }
        ));
    });

/*     describe("EmpresaService", () => {
        it("Listar Tipo Empresas", inject(
            [HttpTestingController, EmpresaService],
            (httpMock: HttpTestingController, empService: EmpresaService) => {
                const url = 'http://localhost:2000/api/tipoEmpresa/listar';

                empService.listarTipoEmpresa().subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.lsTipoEmp);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('GET');
                req.flush(constEmpresa.lsTipoEmp)
            }
        ));
    }); */

    describe("EmpresaService", () => {
        it("Listar Regimen Tributarios", inject(
            [HttpTestingController, EmpresaService],
            (httpMock: HttpTestingController, empService: EmpresaService) => {
                const url = 'http://localhost:2000/api/regimenTributario/listar';

                empService.listarRegTributario().subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.lsRegTrib);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('GET');
                req.flush(constEmpresa.lsRegTrib)
            }
        ));
    });

    describe("EmpresaService", () => {
        it("Registrar Empresa", inject(
            [HttpTestingController, EmpresaService],
            (httpMock: HttpTestingController, empService: EmpresaService) => {
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
                empService.registrarEmpresa(tmp_cat).subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.regEmpresa);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constEmpresa.regEmpresa)
            }
        ));
    });

    describe("EmpresaService", () => {
        it("Actualizar Empresa", inject(
            [HttpTestingController, EmpresaService],
            (httpMock: HttpTestingController, empService: EmpresaService) => {
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
                empService.actualizarEmpresa(tmp_cat).subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.actEmpresa);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('PUT');
                req.flush(constEmpresa.actEmpresa)
            }
        ));
    });


    describe("EmpresaService", () => {
        it("Eliminar Empresa", inject(
            [HttpTestingController, EmpresaService],
            (httpMock: HttpTestingController, empService: EmpresaService) => {
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 4
                    }
                }
                const url = 'http://localhost:2000/api/empresa/' + tmp_cat.empresa.idEmpresa;
                empService.eliminarEmpresa(tmp_cat.empresa).subscribe((resp: any) => {
                    expect(resp).toEqual(constEmpresa.eliEmpresa);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('DELETE');
                req.flush(constEmpresa.eliEmpresa)
            }
        ));
    });

});
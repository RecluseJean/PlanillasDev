import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AfpService } from './afp.service';
import constAfp from "../../../../mocks/afpConstante";

describe("AFPs Service", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AfpService]
        }).compileComponents();
    }));

    describe("AfpService", () => {
        it("Listar AFPs", inject(
            [HttpTestingController, AfpService],
            (httpMock: HttpTestingController, afpService: AfpService) => {
                const url = 'http://localhost:2000/api/afp/listarXEmpresa';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 1
                    }
                }
                afpService.listarAfp(tmp_cat.empresa).subscribe(resp => {
                    expect(resp).toEqual(constAfp.lsAfps);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constAfp.lsAfps)

            }
        ));
    });

    describe("AfpService", () => {
        it("Registrar AFPs", inject(
            [HttpTestingController, AfpService],
            (httpMock: HttpTestingController, afpService: AfpService) => {
                const url = 'http://localhost:2000/api/afp/modificar';
                var tmp_cat = {
                    "afp": {
                        "idAfp": 1,
                        "descripcion": "Segura",
                        "comSobFlu": 0.0,
                        "comSobFluMix": 0.0,
                        "comAnuSobSal": 0.0,
                        "primaSeguro": 0.0,
                        "apoOblFndPen": 0.3
                    },
                    "empresa": {
                        "idEmpresa": 1
                    }
                }
                afpService.actualizarAfp(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constAfp.modAfp);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constAfp.modAfp)

            }
        ));
    });

    describe("AfpService", () => {
        it("Modificar AFPs", inject(
            [HttpTestingController, AfpService],
            (httpMock: HttpTestingController, afpService: AfpService) => {
                const url = 'http://localhost:2000/api/afp/registrar';
                var tmp_cat = {
                    "afp": {
                        "descripcion": "Segura",
                        "comSobFlu": 0.0,
                        "comSobFluMix": 0.0,
                        "comAnuSobSal": 0.0,
                        "primaSeguro": 0.0,
                        "apoOblFndPen": 0.0,
                    },
                    "empresa": {
                        "idEmpresa": 1
                    }
                }
                afpService.registrarAfp(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constAfp.regAfp);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constAfp.regAfp)

            }
        ));
    });


    describe("AfpService", () => {
        it("Eliminar AFPs", inject(
            [HttpTestingController, AfpService],
            (httpMock: HttpTestingController, afpService: AfpService) => {
                var tmp_cat = {
                    "afp": {
                        "idAfp":1
                    }
                }
                const url = "http://localhost:2000/api/afp/"+ tmp_cat.afp.idAfp;
                afpService.eliminarAfp(tmp_cat.afp.idAfp).subscribe((resp:any) => {
                    expect(resp).toEqual(constAfp.eliAdfp);
                });
                // const req = httpMock.expectOne(url);
                // expect(req.request.method).toBe('DELETE');
                // req.flush(constAfp.eliAdfp);
            }
        ));
    });

});
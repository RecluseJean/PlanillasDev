import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ParametroService } from './parametro.service';
import constParam from "../../../../mocks/parametroConstante";

describe("Parametro Service", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ParametroService]
        }).compileComponents();
    }));

    describe("ParametroService", () => {
        it("Listar Parametros", inject(
            [HttpTestingController, ParametroService],
            (httpMock: HttpTestingController, parmService: ParametroService) => {
                const url = 'http://localhost:2000/api/parametro/porempresa';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 1
                    }
                }
                parmService.listarParametrosEmpresa(tmp_cat.empresa).subscribe(resp => {
                    expect(resp).toEqual(constParam.lsParam);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constParam.lsParam)

            }
        ));
    });

    describe("ParametroService", () => {
        it("Actualizar Parametros", inject(
            [HttpTestingController, ParametroService],
            (httpMock: HttpTestingController, parmService: ParametroService) => {
                const url = 'http://localhost:2000/api/parametro/actualizar';
                var tmp_cat = {
                    "parametro":{
                        "idParametro": 27,
                        "descripcion": "Salario Minimo Vital",
                        "codigo": "SALMINVIT",
                        "valor": "930",
                        "estado": 1,
                        "grupo": "EMPRESA",
                        "nombre": "Salario Minimo Vital"
                    },
                    "empresa":{
                        "idEmpresa":1
                    }
                }
                parmService.actualizarParametro(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constParam.actParam);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constParam.actParam)

            }
        ));
    });

});
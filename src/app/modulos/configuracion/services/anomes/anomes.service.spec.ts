import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AnoMesService } from './anomes.service';
import constAnoMes from "../../../../mocks/anomesConstante";

describe("AnoMes Service", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AnoMesService]
        }).compileComponents();
    }));

    describe("SctrService", () => {
        it("Registrar Año", inject(
            [HttpTestingController, AnoMesService],
            (httpMock: HttpTestingController, anoMesService: AnoMesService) => {
                const url = 'http://localhost:2000/api/anomes/registrar';

                var tmp_cat = {
                    "descripcion": 2050,
                    "empresa": {
                        "idEmpresa": 1,
                        "razonSocial": "Partner Tech",
                        "ruc": "12121212121",
                        "estado": 1,
                        "fechaRegistro": "2020-01-08T16:30:45.766+0000",
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0,
                        "regTrib": {
                            "idRegTrib": 1,
                            "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                        },
                        "limiteAutorizacion": null,
                        "tipoEmp": {
                            "idTipoEmp": 3,
                            "descripcion": "MEDIANA EMPRESA"
                        }
                    }
                }

                anoMesService.registrarAno(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constAnoMes.regAnoMes);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constAnoMes.regAnoMes)

            }
        ));
    });

    describe("SctrService", () => {
        it("Listar Meses", inject(
            [HttpTestingController, AnoMesService],
            (httpMock: HttpTestingController, anoMesService: AnoMesService) => {
                const url = 'http://localhost:2000/api/anomes/listarMeses';

                anoMesService.listarMeses().subscribe(resp => {
                    expect(resp).toEqual(constAnoMes.lsMeses);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('GET')
                req.flush(constAnoMes.lsMeses)

            }
        ));
    });

    describe("SctrService", () => {
        it("Modificar Meses", inject(
            [HttpTestingController, AnoMesService],
            (httpMock: HttpTestingController, anoMesService: AnoMesService) => {
                const url = 'http://localhost:2000/api/anomes/modificarMes';
                var tmp_cat = {
                    "idPdoMes": 1,
                    "descripcion": "ENERO",
                    "abrev": "ENE",
                    "diasFeriadoCalend": 2
                }
                anoMesService.actualizarMes(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constAnoMes.actMes);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('PUT')
                req.flush(constAnoMes.actMes)

            }
        ));
    });

});
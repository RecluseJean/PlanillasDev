import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { SctrService } from './sctr.service';
import constSctr from "../../../../mocks/sctrConstante";

describe("SCTR Service", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SctrService]
        }).compileComponents();
    }));

    describe("SctrService", () => {
        it("Listar Sctrs", inject(
            [HttpTestingController, SctrService],
            (httpMock: HttpTestingController, sctrService: SctrService) => {
                const url = 'http://localhost:2000/api/sctr/listar';

                sctrService.listarSctr().subscribe(resp => {
                    expect(resp).toEqual(constSctr.lsSctr);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('GET')
                req.flush(constSctr.lsSctr)

            }
        ));
    });

    describe("SctrService", () => {
        it("Registrar Sctr", inject(
            [HttpTestingController, SctrService],
            (httpMock: HttpTestingController, sctrService: SctrService) => {
                const url = 'http://localhost:2000/api/sctr/insertar';
                var tmp_cat = {
                    "descripcion": "Ninguno",
                    "tipo": 0
                }

                sctrService.insertarSctr(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constSctr.regSctr);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constSctr.regSctr)

            }
        ));
    });

    describe("SctrService", () => {
        it("Actualizar Sctr", inject(
            [HttpTestingController, SctrService],
            (httpMock: HttpTestingController, sctrService: SctrService) => {
                const url = 'http://localhost:2000/api/sctr/actualizar';
                var tmp_cat = {
                    "idSctr": 11,
                    "descripcion": "Ninguno",
                    "tipo": 0
                }
                sctrService.actualizarSctr(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constSctr.actSctr);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constSctr.actSctr)

            }
        ));
    });

    describe("SctrService", () => {
        it("Eliminar Sctr", inject(
            [HttpTestingController, SctrService],
            (httpMock: HttpTestingController, sctrService: SctrService) => {
                var tmp_cat = {
                    "idSctr": 11
                }
                const url = 'http://localhost:2000/api/sctr/'+tmp_cat.idSctr;
                sctrService.eliminarSctr(tmp_cat).subscribe((resp:any) => {
                    expect(resp).toEqual(constSctr.eliSctr);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('DELETE')
                req.flush(constSctr.eliSctr)

            }
        ));
    });
});
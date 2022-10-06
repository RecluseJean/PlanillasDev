import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {

    let pipe: TruncatePipe;

    beforeEach(() => {
        pipe = new TruncatePipe();
    })

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('Deberia truncar el texto en un limite de 20 agregando tres puntos al final    ',()=>{
        var textTruncate = pipe.transform('Empresa de Recursos Humanos S.A.C Lince 5874',['20', '...']);
        expect(textTruncate).toEqual('Empresa de Recursos ...');
    })
});
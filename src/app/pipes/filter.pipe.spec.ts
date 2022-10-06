import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
    let pipe: FilterPipe;
    let lsTrabajador: any[] = [
        {
            'trabajador':{
                'nroDoc':'89652587',
                'apePater':'Zuñiga',
                'apeMater': 'Mirtha',
                'nombres': 'Ana Rosa'
            }
        },
        {
            'trabajador':{
                'nroDoc':'643152800',
                'apePater':'Cardenas',
                'apeMater': 'Bartolo',
                'nombres': 'Juan Jose'
            }
        },
        {
            'trabajador':{
                'nroDoc':'08649732',
                'apePater':'Morales',
                'apeMater': 'Brenis',
                'nombres': 'Junior Angel'
            }
        }
    ]

    beforeEach(()=>{
        pipe = new FilterPipe();
    })
    
    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });
    
    it('Deberia ordenar por nombres y retornar Morales si se busca por nombre',()=>{
        const postFilter: String = 'Morales';
        const postBoolean = false;
        let resp: any [] = pipe.transform(lsTrabajador,postFilter,postBoolean);
        expect(resp[0]).toEqual(lsTrabajador[2]);
    })

    it('Deberia retornar toda la lista igual si no se ingresa ningun buscador',()=>{
        const postFilter : String = '';
        const postBoolean = true;
        let resp: any[] = pipe.transform(lsTrabajador,postFilter,postBoolean);
        expect(resp).toEqual(lsTrabajador);
    })

    it('Deberia ordenar por nroDoc y retornar Cardenas si se busca por nrDoc',()=>{
        const postFilter: String = '643152800';
        const postBoolean = true;
        let resp: any [] = pipe.transform(lsTrabajador,postFilter,postBoolean);
        expect(resp[0]).toEqual(lsTrabajador[1]);
    })
  });
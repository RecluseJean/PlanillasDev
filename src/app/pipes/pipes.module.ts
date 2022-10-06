import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';
import { FilterPipe, FilterPerfilPipe, FilterPostulantePipe } from './filter.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    TruncatePipe,
    FilterPipe,
    FilterPerfilPipe,
    FilterPostulantePipe,

  ],
  exports: [
    TruncatePipe,
    FilterPipe,
    FilterPerfilPipe,
    FilterPostulantePipe,
  ]
})
export class PipesModule { }

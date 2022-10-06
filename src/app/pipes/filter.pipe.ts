import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(value: any[], postFilter: String, postBoolean: boolean ): any[] {

    const resultPost: any [] = [];
    if(postFilter == ""){
      return value;
    } else if (postBoolean == true){
      for (const post of value) {
        if (post.trabajador.nroDoc.toLocaleLowerCase().indexOf(postFilter.toLocaleLowerCase()) > -1) {
          resultPost.push(post);
        }
      }
    } else {
      for (const post of value) {
        const nomCompleto = post.trabajador.apePater + " " + post.trabajador.apeMater + " " + post.trabajador.nombres;
        if (nomCompleto.toLocaleLowerCase().indexOf(postFilter.toLocaleLowerCase()) > -1) {
          resultPost.push(post);
        }
      }
    }
    return resultPost;
  }
}

@Pipe({
  name: 'filterPerfil'
})
export class FilterPerfilPipe implements PipeTransform {

  transform(value: any[], namePerfil: String): any[] {

    const resultPost: any[] = [];
    if (namePerfil == "") {
      return value
    } else {
      for (const post of value) {
        if (post.descripcion.toLocaleLowerCase().indexOf(namePerfil.toLocaleLowerCase()) > -1) {
          resultPost.push(post);
        }
      }
      return resultPost;
    }
  }

}

@Pipe({
  name: 'filterPostulante'
})
export class FilterPostulantePipe implements PipeTransform {
  
  transform(value: any[], postFilter: string, postBoolean: boolean ): any[] { //debugger

    const resultPost: any [] = [];
    if(postFilter == ""){
      return value;
    } else if (postBoolean == true){
      for (const post of value) {
        const nrdoc : string= ""+post.postulante.nroDocumento
        if (nrdoc.toLocaleLowerCase().indexOf(postFilter) > -1) {
          resultPost.push(post);
        }
      }
    } else {
      for (const post of value) {
        const nomCompleto = post.postulante.ape_paterno + " " + post.postulante.ape_materno + " " + post.postulante.nombres;
        if (nomCompleto.toLocaleLowerCase().indexOf(postFilter.toLocaleLowerCase()) > -1) {
          resultPost.push(post);
        }
      }
    }
    return resultPost;
  }
}


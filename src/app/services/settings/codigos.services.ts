
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { URL_SERVICIOSBACK } from '../../config/config';
declare var swal: any;
@Injectable()
export class CodigosService {

  constructor(
    public http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
   
   }
  
  
}


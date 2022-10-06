


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {       
  constructor() {}

  token: any;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent |HttpEvent<any>> {
    const re = 'api/';  
    this.token = JSON.parse(localStorage.getItem('InfoToken')) || '';

    if (request.url.search(re) === -1 ) {
        request = request.clone({
          setHeaders: {
           
            Authorization:  `Basic `+ btoa('planillas123:planillas')
          }
        });
    
    }else{
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer `+this.token.access_token
        }
      });
    }        

    return next.handle(request);
  }
}
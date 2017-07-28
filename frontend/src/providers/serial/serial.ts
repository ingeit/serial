import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SerialProvider {

  constructor(public http: Http) {
  }

  enviarSerial(hexa){

      return new Promise((resolve, reject) => {

          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          
          this.http.post(`http://192.168.1.177:3000/enviar`, JSON.stringify(hexa), {headers: headers})
            .map(res => res.json())
            .subscribe(res => {
              console.log(res);
              resolve(res);
            }, (err) => {
              console.log(err);
              reject(err);
            });
      });
  }
  

}

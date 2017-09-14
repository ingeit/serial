import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { SerialProvider } from '../../providers/serial/serial';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket:any
  chat_input:string;
  chats = [];
  @ViewChild('mesa1') mesa1: any;
  @ViewChild('mesa2') mesa2: any;
  @ViewChild('mesa3') mesa3: any;
  @ViewChild('mesa4') mesa4: any;

  constructor(public navCtrl: NavController,
              public serialProv:SerialProvider) {

    this.socket = io('http://192.168.1.189:3000');

    this.socket.on('message', (msg) => {
      let mensaje = msg;
      console.log("message", mensaje);
      switch (mensaje)
      {
        case '1':
          this.mesa1.nativeElement.style.background = 'red';
          break;
        case '2':
          this.mesa2.nativeElement.style.background = 'red';
          break;
        case '3':
          this.mesa3.nativeElement.style.background = 'red';
          break;
        case '4':
          this.mesa4.nativeElement.style.background = 'red';
          break;
        default:
          this.mesa1.nativeElement.style.background = 'red';
          break;
      }
      //this.chats.push(mensaje);
    });

  }

  send(msg) {

    let hex ={
      'valor': msg
    }

    if(msg != ''){
        this.serialProv.enviarSerial(hex);
    }
    this.chat_input = '';
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { SerialProvider } from '../../providers/serial/serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket:any
  chat_input:string;
  chats = [];

  constructor(public navCtrl: NavController,
              public serialProv:SerialProvider) {

    this.socket = io('http://192.168.1.177:3000');

    this.socket.on('message', (msg) => {
      let mensaje = msg;
      console.log("message", mensaje);
      this.chats.push(mensaje);
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

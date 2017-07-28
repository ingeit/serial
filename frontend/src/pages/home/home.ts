import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket:any
  chat_input:string;
  chats = [];

  constructor(public navCtrl: NavController) {
    this.socket = io('http://192.168.1.177:3000');

    this.socket.on('message', (msg) => {
      let mensaje = msg;
      console.log("message", mensaje);
      this.chats.push(mensaje);
    });

  }

  send(msg) {
      if(msg != ''){
          this.socket.emit('message', msg);
      }
      this.chat_input = '';
  }

}

import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import 'web-animations-js/web-animations.min';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { SerialProvider } from '../../providers/serial/serial';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('addButton', [
        state('idle', style({
            transform: 'scale(1)'
        })),
        state('adding', style({
            transform: 'scale(1.3)',
            fontWeight: 'bold'
        })),
        transition('idle <=> adding', animate('300ms linear')),
        transition('void => *', [
            style({transform: 'translateX(200%)'}),
            animate('300ms ease-in-out')
        ])
    ])
]
})
export class HomePage {
  socket:any
  chat_input:string;
  chats = [];
  @ViewChild('mesa1') mesa1: any;
  @ViewChild('mesa2') mesa2: any;
  @ViewChild('mesa3') mesa3: any;
  @ViewChild('mesa4') mesa4: any;
  mesa1Cuenta:any = 0;
  mesa1Estado:any = 'idle';
  mesa2Cuenta:any = 0;
  mesa3Cuenta:any = 0;
  mesa4Cuenta:any = 0;

  constructor(public navCtrl: NavController,
              public serialProv:SerialProvider) {

    this.socket = io('http://192.168.1.145:3000');

    this.socket.on('message', (msg) => {
      let mensaje = msg;
      console.log("message", mensaje);
      switch (mensaje)
      {
        case '1':
          this.mesa1.nativeElement.style.background = 'red';
          this.mesa1Cuenta++;
          this.mesa1Estado = 'adding';
          break;
        case '2':
          this.mesa2.nativeElement.style.background = 'red';
          this.mesa2Cuenta++;
          break;
        case '3':
          this.mesa3.nativeElement.style.background = 'red';
          this.mesa3Cuenta++;
          break;
        case '4':
          this.mesa4.nativeElement.style.background = 'red';
          this.mesa4Cuenta++;
          break;
        default:
          this.mesa1.nativeElement.style.background = 'red';
          this.mesa1Cuenta++;
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

  finAnimacion(){
    this.mesa1Estado = 'idle';
  }

}

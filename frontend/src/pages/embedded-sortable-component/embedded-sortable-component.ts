import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'embedded-sortable',
  templateUrl: 'embedded-sortable-component.html',
})
export class EmbeddedSortableComponent {
    dragOperation: boolean = false;
    cuadriculaMesa:any = new Array(10);

    
    
    containers: Array<Container> = [
        new Container(1, 'Container 1', [new Widget('1'), new Widget('2')]),
        new Container(2, 'Container 2', [new Widget('3'), new Widget('4')]),
        new Container(3, 'Container 3', [new Widget('5'), new Widget('6')])
    ];

    mesasGeneradas: Array<Mesa> = [
        new Mesa(1,4),
        new Mesa(2,4),
        new Mesa(3,4),
        new Mesa(4,4),
    ];
    
    constructor(){
        for (var k = 0; k < 10; k++) {
            this.cuadriculaMesa[k] = new Array(10);
        }

        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                let id = i + "" + j
                this.cuadriculaMesa[i][j]= new ConteinerMesa(parseInt(id),null);
            }
        }

        console.log(this.cuadriculaMesa)

    }
    
mostrar(){
    console.log('se solto algo')
}
  
  widgets: Array<Widget> = [];
  addTo($event: any) {
      if ($event) {
          this.widgets.push($event.dragData);
      }
  }
}

class Container {
constructor(public id: number, public name: string, public widgets: Array<Widget>) {}
}

class Widget {
constructor(public name: string) {}
}

class Mesa {
    constructor(public numero: number, public size: number) {}
}

class ConteinerMesa {
    constructor(public id: number, public mesa: Mesa) {}
}


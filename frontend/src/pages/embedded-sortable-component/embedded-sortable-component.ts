import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'embedded-sortable',
  templateUrl: 'embedded-sortable-component.html',
})
export class EmbeddedSortableComponent {
    cuadriculaMesa:any = new Array(10);

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
                // this.cuadriculaMesa[i][j]= new ConteinerMesa(parseInt(id),null);
                this.cuadriculaMesa[i][j]= new Mesa(null,null);
            }
        }

        console.log(this.cuadriculaMesa)

    }
    
mostrar(data,x,y){
    console.log('se solto algo',data.dragData,x,y)
    this.cuadriculaMesa[x][y] = data.dragData;
}
  
}

class Mesa {
    constructor(public numero: number, public size: number) {}
}

// class ConteinerMesa {
//     constructor(public id: number, public mesa: Mesa) {}
// }


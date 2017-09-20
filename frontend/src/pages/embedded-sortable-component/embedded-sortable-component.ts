import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'embedded-sortable',
  templateUrl: 'embedded-sortable-component.html',
})
export class EmbeddedSortableComponent {
    cuadriculaMesa:any = new Array(10);
    numeroMesa:any = 1;
    posicionDrag:any = [0,0];

    constructor(){
        for (var k = 0; k < 10; k++) {
            this.cuadriculaMesa[k] = new Array(10);
        }

        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                let id = i + "" + j
                // this.cuadriculaMesa[i][j]= new ConteinerMesa(parseInt(id),null);
                this.cuadriculaMesa[i][j]= new Mesa(parseInt(id),4);
            }
        }
    }
    
    agregarMesa(x,y){
        this.cuadriculaMesa[x][y]= new Mesa(this.numeroMesa,4);
        this.numeroMesa++;
    }
<<<<<<< HEAD
    this.cuadriculaMesa[this.poscionDeIncio[0]].push(new Mesa(null,4));
    console.log('nuevo array',data)

}

inicio(x,y){
    console.log('inicio drag',x,y)
    this.poscionDeIncio[0] = x;
    this.poscionDeIncio[1] = y;
}

obtenerIndexEmpty(data){
    let index;
    for(let i=0;i < data.length;i++){
        if(data[i].numero === null){
            console.log('espacio vacio')
            index = i;
            return index;
        }
=======

    dragStart(x,y){
        console.log('comenzo drag',x,y)
        this.posicionDrag[0] = x;
        this.posicionDrag[1] = y;
    }
    trasnferData(data,x,y){
        console.log('tranferido',data,x,y)
        this.cuadriculaMesa[x][y] = data.dragData;
        this.cuadriculaMesa[this.posicionDrag[0]][this.posicionDrag[1]]= new Mesa(null,4);
>>>>>>> 8cee43715da1fafdec0b193a126e694a97ea5713
    }
}

class Mesa {
    constructor(public numero: number, public size: number) {}
}



import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'embedded-sortable',
  templateUrl: 'embedded-sortable-component.html',
})
export class EmbeddedSortableComponent {
    cuadriculaMesa:any = new Array(10);
    
    constructor(){
        for (var k = 0; k < 10; k++) {
            this.cuadriculaMesa[k] = new Array(10);
        }

        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                let id = i + "" + j
                // this.cuadriculaMesa[i][j]= new ConteinerMesa(parseInt(id),null);
                this.cuadriculaMesa[i][j]= new Mesa(null,4,i);
            }
        }

        console.log(this.cuadriculaMesa)

    }
    
mostrar(data,x,y){
    console.log('se solto algo',data,x,y)
    let index = this.obtenerIndexEmpty(data);
    if(data.length > 10){
        data.splice(index, 1);
    }
    
    console.log('nuevo array',data)
}

obtenerIndexEmpty(data){
    let index;
    for(let i=0;i < data.length;i++){
        if(data[i].numero === null){
            index = i;
            return index;
        }
    }
}
add(){
    this.cuadriculaMesa[0][0]= new Mesa(1,4,0);
}
  
}

class Mesa {
    constructor(public numero: number, public size: number,public columuna:number) {}
}

// class ConteinerMesa {
//     constructor(public id: number, public mesa: Mesa) {}
// }


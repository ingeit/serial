var SerialPort = require("serialport"); 
var serialPort = new SerialPort('/dev/tty.usbserial', {
    baudrate: 9600,
});

exports.iniciar = function(socket){

    serialPort.on("open", function () {
        console.log('open');
        var primerByte = 1;
        var trama = [];
        var tamTrama = 0;
        serialPort.on('data', function(data) {
            console.log(data); 
            // var datos = parseInt(new Int32Array(data).toString());
            // if(primerByte === 1){
            //     primerByte = 0;
            //     if(datos === 0) tamTrama = 2;
            //     else tamTrama = 21;
            //     console.log("tamaño trama ",tamTrama);
            //     trama.push(datos);
            // }else{
            //     trama.push(datos);
            //     tamTrama = tamTrama - 1;
            //     if(tamTrama === 0){
            //         primerByte = 1;
            //         console.log(trama);
            //         trama = [];
            //     }
            // }
            // socket.emit('message', view.toString());
            // console.log(view.toString());
            // console.log(data);
        });
    });


    socket.on('connection', function(connection) {
        console.log('User Connected');
        connection.on('message', function(msg){
            socket.emit('message', msg);
        });
    });
}


exports.enviar = function(req, res, next){

    serialPort.write(req.body.valor,'hex', function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
        res.json('Se escribio correctamente');
    });

}





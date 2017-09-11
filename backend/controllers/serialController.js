const SerialPort = require('serialport');
const ByteLength = SerialPort.parsers.ByteLength;
const Delimiter = SerialPort.parsers.Delimiter;
const Readline = SerialPort.parsers.Readline;
// const port = new SerialPort('/dev/tty.usbserial',{
const port = new SerialPort('COM3',{
    baudRate: 115200,
});
const parser = port.pipe(new Delimiter({ delimiter: new Buffer([0xFF,0xFE])}));


var secEnvio = 0;
var secRecepcion = 0;
var cuenta = 0;
var puedoEnviar = 0;

exports.iniciar = function(socket){

    port.on("open", function () {
        console.log('open');

        //pollingEnvio();

        //hex('holacomoestaskev');
        var buffer = Buffer.from([0x01, 0x00, 0x01, 0x71, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x73, 0x00, 0xFF, 0xFE]);
        port.write(buffer,'hex', function(err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });

        parser.on('data', function(data) {
            console.log(data);
            controlTrama(data);// checkea si ACK o DATO.
            console.log('tamaño del array',data.length)
            console.log('traman numero',cuenta)
            cuenta++;
            // socket.emit('message', view.toString());
        });
    });



    // socket.on('connection', function(connection) {
    //     console.log('User Connected');
    //     connection.on('message', function(msg){
    //         socket.emit('message', msg);
    //     });
    // });
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

function pollingEnvio(){
    setTimeout(function(){
        if(puedoEnviar === 1){
            console.log('dato enviado');
        }
        pollingEnvio();
    },20);
}

function controlTrama(data){
    var trama   = new Int32Array(data);
    trama = trama.toString();
    console.log(trama);

    if(data.length === 3){
        puedoEnviar = 1;
    }else{
        if(controlCRC(data)){
            console.log('trama correcta, listo para responder');
            enviarACK(data);
            
        }else{
            console.log('CRC incorrecto')
        }
    }
}

function enviarACK(data){

    var nSeq = "0x"+data[1];
    var buffer = Buffer.from([0x00, nSeq, nSeq,0xFF, 0xFE]);
    console.log('armando ack: ', buffer);
    port.write(buffer,'hex', function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('ack enviado: ', buffer);
    });

}

function controlCRC(data){
    var crc = 0;
    var crcTrama = data[19] + data[20]*256;
    for(i=0;i<19;i++){
        crc = crc + data[i];
    }
    console.log('CRC calculado',crc)
    console.log('CRC trama',crcTrama)
    if(crc === crcTrama){
        return true;
    }else{
        return false;
    }
}

function hex(str) {
    var arr = [];
    var crcCreado=0;
    arr.push(1);
    arr.push(0);
    arr.push(3);
    for (var i = 0, l = str.length; i < l; i ++) {
            var ascii = str.charCodeAt(i);
            arr.push(ascii);
    }

    console.log(arr);

    // for(var j = 0, l = arr.length; j < l; j ++){
    //     crcCreado = crcCreado + ascii[i];
    // }
    // console.log('CRC creado',crcCreado)
    // arr.push(255);
    // arr.push(255);
    // arr.push(255);
    return new Buffer(arr);
}

function pausecomp(millis) 
{
    var date = new Date();
    var curDate = null;

    do { curDate = new Date(); } 
    while(curDate-date < millis);
} 




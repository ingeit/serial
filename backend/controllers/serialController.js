const SerialPort = require('serialport');
const ByteLength = SerialPort.parsers.ByteLength;
const Delimiter = SerialPort.parsers.Delimiter;
const Readline = SerialPort.parsers.Readline;
// const port = new SerialPort('/dev/tty.usbserial',{
const port = new SerialPort('COM3',{
    baudRate: 115200,
});
const parser = port.pipe(new Delimiter({ delimiter: new Buffer([0xFF,0xFE])}));

//Variables Globales
var numSecEnvio = 0;
var numSecRecepcion = 0;
var cuenta = 0;
var puedoEnviar = 0;
var reintentos=0;

exports.iniciar = function(socket){

    port.on("open", function () {
        console.log('open');

        //pollingEnvio();
        parser.on('data', function(data) {
            if(controlTrama(data)){
                socket.emit('message', data);
            }// checkea si ACK o DATO.
        });
    });

    socket.on('connection', function(connection) {
        console.log('User Connected');
        connection.on('message', function(msg){
            socket.emit('message', msg);
        });
    });
}

function controlTrama(data){
    var trama   = new Int32Array(data);
    trama = trama.toString();
    console.log('trama recibida',data);

    if(controlCRC(data)){
        console.log('CRC Correcto, por checkear Num Secuencia');
        if(controlNumSec(data)){
            console.log('Numero de Secuencia Correcto')
            return true;
        }else{
            console.log('Numero de Secuencia INCORRECTO')
            reintentos++;
            console.log('Reintentos: ',reintentos);
            if(reintentos === 3){
                acoplarNumSec(data);
            }
            return false;
        }
    }else{
        console.log('CRC incorrecto')
        return false;
    }
}


function controlCRC(data){
    var crcAux = 0;
    var crcTrama;
    if(data.length === 3){
        crcTrama = data[2];
        for(i=0;i<2;i++){
            crcAux = crcAux + data[i];
        }
    }else{
        crcTrama = data[19] + data[20]*256;
        for(i=0;i<19;i++){
            crcAux = crcAux + data[i];
        }
    }    
    console.log('CRC calculado',crcAux)
    console.log('CRC trama',crcTrama)
    if(crcAux === crcTrama){
        return true;
    }else{
        return false;
    }
}

function controlNumSec(data){
    var numSecTrama = data[1];
    if(data.length === 3){ // Pregunto si es un ACK o un dato recibido.
        if(numSecTrama === numSecEnvio){
            numSecEnvio++;
            if(numSecEnvio > 255){
                numSecEnvio = 0; // Con esto hago el over flow de 255 a 0
            }
            puedoEnviar = 1;
            return true;
        }else{
            return false;
        }
    }else{
        if(numSecTrama === numSecRecepcion){
            enviarACK();
            numSecRecepcion++;
            if(numSecRecepcion > 255){
                numSecRecepcion = 0; // Con esto hago el over flow de 255 a 0
            }
            return true;
        }else{
            return false;
        }
    }
}

function enviarACK(){
    var nSeq = "0x"+numSecRecepcion.toString(16);
    console.log('numero de secuencia a hex ', nSeq);
    var crc = nSeq; // es igual, es simbolico
    var buffer = Buffer.from([0x00, nSeq, crc,0xFF, 0xFE]);
    // console.log('armando ack: ', buffer);
    port.write(buffer,'hex', function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('ack enviado: ', buffer);
    });
}

function acoplarNumSec(data){
    console.log('Numero de Recepcion: ',numSecRecepcion);
    numSecRecepcion = data[1];
    console.log('Numero de recepcion actualizado: ',numSecRecepcion);
    reintentos = 0;
}

exports.enviar = function(req, res, next){
    var nSeq = "0x"+numSecEnvio;    
    
    var buffer = Buffer.from([0x01, nSeq, 0x01, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0xFF, 0xFE]);

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




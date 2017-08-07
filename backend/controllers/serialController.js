const SerialPort = require('serialport');
const ByteLength = SerialPort.parsers.ByteLength;
const Delimiter = SerialPort.parsers.Delimiter;
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/tty.usbserial',{
    baudRate: 115200,
});
const parser = port.pipe(new Delimiter({ delimiter: new Buffer([0xFF,0xFF])}));


var secEnvio = 0;
var secRecepcion = 0;
var cuenta = 0;
var puedoEnviar = 0;

exports.iniciar = function(socket){

    port.on("open", function () {
        console.log('open');

        pollingEnvio();

        parser.on('data', function(data) {
            var trama   = new Int32Array(data);
            trama = trama.toString();
            controlTrama(data);
            console.log('tamaño del array',data.length)
            console.log('traman numero',cuenta)
            console.log(trama)
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

function controlTrama(trama){
    if(trama.length === 3){
        puedoEnviar = 1;
    }
}


function pausecomp(millis) 
{
    var date = new Date();
    var curDate = null;

    do { curDate = new Date(); } 
    while(curDate-date < millis);
} 




const SerialPort = require('serialport');
const ByteLength = SerialPort.parsers.ByteLength;
const Delimiter = SerialPort.parsers.Delimiter;
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/tty.usbserial',{
    baudRate: 115200,
});
// const parser = port.pipe(new ByteLength({length: 3}));

const parser = port.pipe(new Delimiter({ delimiter: new Buffer([0xc8])}));

// const parser = port.pipe(new Readline({ delimiter: '200' }));
exports.iniciar = function(socket){
    port.on("open", function () {
        console.log('open');
        var primerByte = 1;
        var trama = [];
        var tamTrama = 0;

        parser.on('data', function(data) {
            var byte   = new Int32Array(data);
            byte = byte.toString();
            console.log('trama numero',primerByte)
            console.log('tamaño del array',data.length)
            console.log(byte)
            // console.log(byte[0])
            // console.log(byte[2])
            // console.log(byte[4])
            primerByte++;
            // if(primerByte === 1){
            //     primerByte = 0;
            //     if(byte === 0) tamTrama = 2;
            //     else tamTrama = 21;
            //     console.log("tamaño trama ",tamTrama);
            //     trama.push(byte);
            // }else{
            //     trama.push(byte);
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





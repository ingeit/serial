var SerialPort = require("serialport"); 
var serialPort = new SerialPort('/dev/tty.usbserial', {
    baudrate: 9600,
});

exports.iniciar = function(socket){

    serialPort.on("open", function () {
        console.log('open');
        serialPort.on('data', function(data) {
            var view   = new Int32Array(data);
            socket.emit('message', view.toString());
            console.log(view.toString());
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
        res.send('Se escribio correctamente');
    });

}





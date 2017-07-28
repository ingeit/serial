var SerialPort = require("serialport"); 
var socket = require('socket.io'),
    http = require('http'),
    server = http.createServer(),
    socket = socket.listen(server);

var serialPort = new SerialPort('/dev/tty.usbserial', {
  baudrate: 9600,
});

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

server.listen(3000, function(){
    console.log('Server started');
});
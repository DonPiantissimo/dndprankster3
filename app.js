/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var
        gameport = process.env.PORT || 4004,
        io = require('socket.io'),
        express = require('express'),
        http = require('http'),
        app = express(),
        server = http.createServer(app),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })) 

app.use(bodyParser.json());





server.listen(gameport);



app.get('/', function (req, res) {
    res.sendFile('/index.html', {root: __dirname});
});

app.get('/*', function (req, res, next) {
    res.sendFile(__dirname + '/' + req.params[0]);
});



var sio = io.listen(server);



app_server = require('./server.js');
var data = {lv:1, safety:false};
var mes="";
var parts;

app.post('/', function(req, res) {
	console.log('spin');
		data.lv = parseInt(req.body.level);
                if (req.body.HumbleSpin == "on") data.safety = true;
		else data.safety = false;
                if (data.lv>0 && data.lv<20) {
                    mes=app_server.onMessage(data);
                    console.log('emitting '+mes);
                    
                }
		else 
                    mes = "error";
		sio.emit('result', mes);
});

sio.sockets.on('connection', function (client) {
    client.emit('onconnected', {});
    console.log('connected');
    
		sio.emit('result', mes);
    	client.on('spin', function(msg) {
		console.log('spin');
		parts = msg.split('|');
		data.lv = parseInt(parts[0]);
                data.safety = (parts[1]=="true");
                if (data.lv>0 && data.lv<20) {
                    mes=app_server.onMessage(data);
                    console.log('emitting '+mes);
                    
                }
		else 
                    mes = "error";
		sio.emit('result', mes);
	});
    client.on('disconnect', function () {

        //notify of disconnection
        console.log('\t socket.io:: client disconnected ');



    });
});

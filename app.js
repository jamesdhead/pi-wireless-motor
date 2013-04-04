var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, io = require('socket.io');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

//---------------------------------------

var sys = require('sys')
var exec = require('child_process').exec;
var child;

var execute = function(command, cb) {
	exec(command, function(error, stdout, stderr) {
		if (stderr.length > 0) {
			sys.print("Executing "+command+" yields STDERR:\n"+stderr);
		}
		if (error !== null) {
			console.log("Execution error ("+command+")"+error);
		}
		
		if (typeof cb !== "undefined") {
			cb(stdout);
		}
	});
}
var unexportGPIO = function(port) {
	execute('echo "'+port+'" > /sys/class/gpio/unexport');
};
var exportGPIO = function(port) {
	execute('echo "'+port+'" > /sys/class/gpio/export');
};
var setDirection = function (port, direction) {
	execute('echo "'+direction+'" > /sys/class/gpio/gpio'+port+'/direction');
};
var setValue = function (port, value) {
	execute('echo "'+value+'" > /sys/class/gpio/gpio'+port+'/value');
};

var motorLeft = { pin1: 14, pin2: 15 };
var motorRight = { pin1: 23, pin2: 24 };

var server = http.createServer(app);
server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
	
	exportGPIO(motorLeft.pin1);
	exportGPIO(motorLeft.pin2);
	exportGPIO(motorRight.pin1);
	exportGPIO(motorRight.pin2);
	setDirection(motorLeft.pin1, "out");
	setDirection(motorLeft.pin2, "out");
	setDirection(motorRight.pin1, "out");
	setDirection(motorRight.pin2, "out");
	
	io = io.listen(server);
	io.sockets.on('connection', function (socket) {
		console.log("connected");
		socket.emit('ready', { empty: 'data' });
		socket.on('feed', function (data) {
			console.log(data);
			
			setValue(motorLeft.pin1, data.left.pin1);
			setValue(motorLeft.pin2, data.left.pin2);
			setValue(motorRight.pin1, data.right.pin1);
			setValue(motorRight.pin2, data.right.pin2);
		});
	});
});
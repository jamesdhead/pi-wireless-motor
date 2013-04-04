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

exportGPIO(2);
setDirection(2, "out");
setValue(2, 1);

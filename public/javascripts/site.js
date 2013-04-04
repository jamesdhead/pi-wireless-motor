var socket = io.connect('http://192.168.2.23:3000');
socket.on('ready', function () {
	console.log("ready")
});

$(document).ready(function() {
	var sendFeed = function (left, right) {
		socket.emit('feed', { left: left, right: right });
	};
	var set = function(identifier, cb) {
		$("#"+identifier).click(cb);
	};
	
	set("top", function() {
		sendFeed({ pin1: 1, pin2: 0 }, { pin1: 0, pin2: 1 });
	});
	set("left", function() {
		sendFeed({ pin1: 1, pin2: 0 }, { pin1: 1, pin2: 0 });
	});
	set("stop", function() {
		sendFeed({ pin1: 0, pin2: 0 }, { pin1: 0, pin2: 0 });
	});
	set("right", function() {
		sendFeed({ pin1: 0, pin2: 1 }, { pin1: 0, pin2: 1 });
	});
	set("bottom", function() {
		sendFeed({ pin1: 0, pin2: 1 }, { pin1: 1, pin2: 0 });
	});
	
	$(window).keypress(function(e) {
		if (e.keyCode == 106) {
			// j
			left.pin1 = 1;
			left.pin2 = 0;
			right.pin1 = 1;
			right.pin2 = 0;
			updateFeed();
			console.log('left')
		} else if (e.keyCode == 107) {
			// k
			left.pin1 = 0;
			left.pin2 = 1;
			right.pin1 = 1;
			right.pin2 = 0;
			updateFeed();
			console.log('back')
		} else if (e.keyCode == 108) {
			// l
			left.pin1 = 0;
			left.pin2 = 1;
			right.pin1 = 0;
			right.pin2 = 1;
			updateFeed();
			console.log('right')
		} else if (e.keyCode == 105) {
   			// i
			left.pin1 = 1;
			left.pin2 = 0;
			right.pin1 = 0;
			right.pin2 = 1;
			updateFeed();
			console.log('forward')
   		} else if (e.keyCode == 111) {
   			left.pin1 = 0;
			left.pin2 = 0;
			right.pin1 = 0;
			right.pin2 = 0;
			updateFeed();
			console.log('stop')
   		}
		e.preventDefault();
		return false;
	})
	
	var left = { pin1: 0, pin2: 0 };
	var right = { pin1: 0, pin2: 0 };
	var updateFeed = function() {
		sendFeed(left, right);
	}
	
	set("l1on", function() {
		left.pin1 = 1;
		updateFeed();
	})
	set("l1off", function() {
		left.pin1 = 0;
		updateFeed();
	})
	set("l2on", function() {
		left.pin2 = 1;
		updateFeed();
	})
	set("l2off", function() {
		left.pin2 = 0;
		updateFeed();
	})
	set("r1on", function() {
		right.pin1 = 1;
		updateFeed();
	})
	set("r1off", function() {
		right.pin1 = 0;
		updateFeed();
	})
	set("r2on", function() {
		right.pin2 = 1;
		updateFeed();
	})
	set("r2off", function() {
		right.pin2 = 0;
		updateFeed();
	})
});

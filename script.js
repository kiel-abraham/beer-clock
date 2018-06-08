/*global $ */

var data, array, hub;

$(document).ready(function(){
	$.ajaxSetup({ async: false });
	$.getJSON("timezones.json", function(result){
		data = result;
	});
	
	var time = new Date($.now());
	var utc = time.getUTCHours();
	var fivePM = 17;
	//console.log(time.getHours() + ":" + time.getMinutes());
	//console.log(time.getUTCHours() + ":" + time.getUTCMinutes());
	var client = time.getHours();
	var actual = (client - utc) + (fivePM - client);
	
	var format, x, y, z;
	var update;
	if (actual > 12) {
		update = actual - 24;
	} else if (actual < -12) {
		update = actual + 24;
	} else {
		update = actual;
	}
	var num = update.toString();
	var length = num.length;
	
	if (num == "0") {
		format = "UTC±00:00";
	} else if (num.search("-") == 0) {
		y = num.slice(1, length);
		if (length == 2) {
			x = "0";
			z = x.concat(y);
		} else {
			z = y;
		}
		format = "UTC-" + z + ":00";
	} else {
		y = num;
		if (y.length == 1) {
			x = "0";
			z = x.concat(y);
		} else {
			z = y;
		}
		format = "UTC+" + z + ":00";
	}
	
	$.each(data, function (index) {
		$.each(data[index], function (key, value) {
			if (value === format) {
				array = data[index].places;
			}
		});
	});
	
	Array.prototype.shuffle = function() {
	    var input = this;
	    for (var i = input.length-1; i >=0; i--) {
	        var randomIndex = Math.floor(Math.random()*(i+1));
	        var itemAtIndex = input[randomIndex];
	        input[randomIndex] = input[i];
	        input[i] = itemAtIndex;
	    }
	    return input;
	};
	hub = array.shuffle();
});


var count = 0;

$(".run").click(function () {
	
	$("#subtitle").addClass("hidden");
	$(this).text("Show other...");
	$(this).addClass("btn-sm");
	$("#result").removeClass("hidden");
	
	if (count + 1 == hub.length) {
		$(this).removeClass("run");
		$(this).text("Reload");
	}
	if (count < hub.length) {
		$("#place").text(hub[count].name);
		$("#img").attr("alt", hub[count].name + " flag");
		$("#img").attr("src", hub[count].flag);
	} else {
		$(this).attr("href", window.location.reload());
	}
	count++;
});



 

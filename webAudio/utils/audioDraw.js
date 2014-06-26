define(function() {
	function drawTimeDomain(canvas, timeDomain) {
		var drawContext = canvas.getContext("2d");
		drawContext.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < timeDomain.length; i++) {
		  var value = timeDomain[i];
		  var percent = value / 256;
		  var height = canvas.height * percent;
		  var offset = canvas.height - height - 1;
		  var barWidth = canvas.width / 1024; // the half the FFT size (analyser.frequencyBinCount)
		  drawContext.fillStyle = 'black';
		  drawContext.fillRect(i * barWidth, offset, 1, 1);
		}
	};

	function drawFrequencyDomain(canvas, freqDomain) {
		var drawContext = canvas.getContext("2d");
		drawContext.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < 1024; i++) {
			var value = freqDomain[i];
			var percent = value / 256;
			var height = canvas.height * percent;
			var offset = canvas.height - height - 1;
			var barWidth = canvas.width / 1024; // the half the FFT size (analyser.frequencyBinCount)
			var hue = i / 1024 * 360;
			drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
			drawContext.fillRect(i * barWidth, offset, barWidth, height);
		}
	};
	return {
		drawTimeDomain : drawTimeDomain,
		drawFrequencyDomain :drawFrequencyDomain
	};
});

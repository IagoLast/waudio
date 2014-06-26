define(function() {
	function processAudio (audioContext, mediaStreamSource, timeCallback, freqCallback) {
		var analyser = audioContext.createAnalyser();
		analyser.fftSize = 2048;
		var rafID = null;
		var buflen = 2048;
		var timeDomain = new Uint8Array( buflen );
		var freqDomain = new Uint8Array(analyser.frequencyBinCount);
		var MINVAL = 134;  // 128 == zero.  MINVAL is the "minimum detected signal" level.

		var start = function () {
		    mediaStreamSource.connect( analyser );
		    update();
		};

		var update = function () {
			analyser.getByteTimeDomainData(timeDomain);
			analyser.getByteFrequencyData(freqDomain);

			if(timeCallback) {
				timeCallback(timeDomain);
			}
			if (freqCallback){
				freqCallback(freqDomain);
			}
			
			if (!window.requestAnimationFrame) {
				window.requestAnimationFrame = window.webkitRequestAnimationFrame;
			}
			rafID = window.requestAnimationFrame( update );
		};

		start();
	};

	return {
		processAudio : processAudio
	};
});

define([
"./utils/*",
"./effects/reverb",
"./effects/delay",
],

function(utils, reverb, delay) {
	var usermedia = utils.usermedia,
		audioProcess = utils.audioProcess,
		audioDraw = utils.audioDraw,
		tuna = utils.tuna;

	var contextClass = (window.AudioContext || 
		window.webkitAudioContext || 
		window.mozAudioContext || 
		window.oAudioContext || 
		window.msAudioContext);
	if (contextClass) {
		var context = new contextClass();
	} else {
		alert("Your Browser doesn't support web Audio.");
	}

	return {
		context : context,
		getAudioStream : usermedia.getAudioStream,
		processAudio : audioProcess.processAudio,
		drawTimeDomain : audioDraw.drawTimeDomain,
		drawFrequencyDomain : audioDraw.drawFrequencyDomain,
		getPitch : function(timeDomain, callback){ 
			tuna.getPitch(this.context.sampleRate, timeDomain, callback);
		},
		getNoteName : function(timeDomain, callback){
			tuna.getNoteName(this.context.sampleRate, timeDomain, callback);
		},
		Delay : function(opts) {
			return delay.Delay(this.context, opts);
		},
		Reverb : function(opts){
			return reverb.reverb(this.context, opts);
		},
	};
});
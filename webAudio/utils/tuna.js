define(function() {
	
	function noteNameFromPitch(pitch) {
		var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
		return noteStrings[noteNumberFromPitch(pitch) % 12];
	};

	function noteNumberFromPitch( pitch ) {
		var noteNum = 12 * (Math.log( pitch / 440 )/Math.log(2) );
		return Math.round( noteNum ) + 69;
	};

	function frequencyFromNoteNumber( note ) {
		return 440 * Math.pow(2,(note-69)/12);
	};

	function centsOffFromPitch( pitch, note ) {
		return ( 1200 * Math.log( pitch / frequencyFromNoteNumber( note ))/Math.log(2) );
	};

	function getNoteName(sampleRate, buf, callback){
		getPitch(sampleRate, buf, function(pitch) {
			callback(noteNameFromPitch(pitch));
		});
	}
	function getPitch( sampleRate, buf, callback ) {
		var MIN_SAMPLES = 4;	// corresponds to an 11kHz signal
		var MAX_SAMPLES = 1000; // corresponds to a 44Hz signal
		var SIZE = 1000;
		var best_offset = -1;
		var best_correlation = 0;
		var rms = 0;

		var confidence = 0;
		var currentPitch = 0;

		if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
			return;  // Not enough data

		for (var i=0;i<SIZE;i++) {
			var val = (buf[i] - 128)/128;
			rms += val*val;
		}
		rms = Math.sqrt(rms/SIZE);

		for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
			var correlation = 0;

			for (var i=0; i<SIZE; i++) {
				correlation += Math.abs(((buf[i] - 128)/128)-((buf[i+offset] - 128)/128));
			}
			correlation = 1 - (correlation/SIZE);
			if (correlation > best_correlation) {
				best_correlation = correlation;
				best_offset = offset;
			}
		}
		if ((rms>0.01)&&(best_correlation > 0.01)) {
			confidence = best_correlation * rms * 10000;
			currentPitch = sampleRate/best_offset;
		}
		if (confidence > 10) {
			callback(currentPitch); 
		}
	}
	return {
		getPitch : getPitch,
		getNoteName : getNoteName
	};
});



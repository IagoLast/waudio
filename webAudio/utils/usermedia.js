define(function() {
	function getAudioStream(callback){
		try {
			navigator.getUserMedia = navigator.getUserMedia ||
									 navigator.webkitGetUserMedia ||
									 navigator.mozGetUserMedia;
			navigator.getUserMedia({audio:true}, callback, function error() {
				alert('Stream generation failed.');
			});
		} catch (e) {
			alert('getUserMedia threw exception :' + e);
		}
	}

	return { getAudioStream : getAudioStream };
});
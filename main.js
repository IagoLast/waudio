require(["webAudio/wa"], function(wa) {
		var pitchH2 = document.getElementById("note");
		var canvas1 = document.getElementById("canvas1");
		var canvas2 = document.getElementById("canvas2");
		var delay = wa.Delay();
		var reverb = wa.Reverb();
		

		function drawPitch(pitch) {
				pitchH2.innerHTML = pitch;
		};

		wa.getAudioStream(
			function gotStream(stream) {
				var mediaStreamSource = wa.context.createMediaStreamSource(stream);
				mediaStreamSource.connect(delay);
				delay.connect(reverb.input)
				reverb.connect(wa.context.destination)
				mediaStreamSource.connect(wa.context.destination);

				delay.connect(wa.context.destination);
				wa.processAudio(wa.context, mediaStreamSource, 
					function (timeDomain){
						wa.drawTimeDomain(canvas1, timeDomain);
						wa.getNoteName(timeDomain, drawPitch);
					},
					function (freqDomain) {
						wa.drawFrequencyDomain(canvas2, freqDomain);
					}
				);
			});
});


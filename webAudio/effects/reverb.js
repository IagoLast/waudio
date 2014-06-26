define(function(){

	function SimpleReverb (context, opts) {
	    this.input = context.createConvolver();
	    this.output = this.input;
	    var opts = opts || {};
	    var seconds   = opts.seconds  || 3;
	    var decay     = opts.decay    || 2;
	    var reverse   = opts.reverse  || 0;
		var rate = context.sampleRate;
		var length = rate * seconds;
		var decay = decay;

		var impulse = context.createBuffer(2, length, rate);
		var impulseL = impulse.getChannelData(0);
		var impulseR = impulse.getChannelData(1);
		var n, i;

		for (i = 0; i < length; i++) {
			n = reverse ? length - i : i;
			impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
			impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
		}

		this.input.buffer = impulse;

		this.connect = function connect(dest){
  			this.output.connect( dest.input ? dest.input : dest );
  		};

		this.disconnect = function disconnect(){
  			this.output.disconnect();
  		};
  	};
    
	function reverb(audioContext, opts){
		return new SimpleReverb(audioContext, opts);
	};

	return {
		reverb : reverb
	};
});
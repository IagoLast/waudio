define(function(){

	function Delay (context, opts) {
	    var opts = opts || {};
		var seconds = opts.seconds || 0.5;
		this.input =  context.createDelay();
		
		this.input.delayTime.value = parseFloat(seconds);
		
		this.output = this.input;

		this.connect = function connect(dest){
  			this.output.connect( dest.input ? dest.input : dest );
  		};

		this.disconnect = function disconnect(){
  			this.output.disconnect();
  		};

	};

	function createDelay(context, opts){
		return new Delay(context, opts);
	};

	return {
		Delay : createDelay
	};
});
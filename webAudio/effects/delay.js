define(function(){

	function Delay (context, opts) {
	    var opts = opts || {};
		var seconds = opts.seconds || 0.5;
		var delay =  context.createDelay();
		delay.delayTime.value = parseFloat(seconds);
		return delay;
	};

	return {
		Delay : Delay
	};
});
define([
"./usermedia",
"./audioProcess",
"./audioDraw",
"./tuna"
], 
// Facade for all utils.
function(usermedia, audioProcess, audioDraw, tuna){
	return {
		usermedia : usermedia,
		audioProcess : audioProcess,
		audioDraw : audioDraw,
		tuna : tuna
	};
});
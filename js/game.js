// window/global scope
var rush = rush || {}

window.onload = function() {
	// entry point
	console.log("entry point");
	rush.game = new rush.Game();
}
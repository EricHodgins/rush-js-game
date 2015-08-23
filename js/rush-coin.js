var rush = rush || {}
// Gameobject to setup inheritance 
rush.Coin = (function() {
	function Coin() {
		this.initialize();
	}

	var p = Coin.prototype = new rush.GameObject();


	// reference the super initialize before
	// overriding the initialize method.
	p.GameObject_initialize = p.initialize;
	p.initialize = function() {
		this.GameObject_initialize();
		this.category = "coin";

		this.width = 10;
		this.height = 10;

		this.regX = this.width/2;
		this.regY = this.height;

		var shape = rush.CommonShapes.rectangle({
			width: this.width,
			height: this.height,
			fillColor: "#15AE01" // dark green
		});

		this.addChild(shape);

	}


	return Coin;
})();
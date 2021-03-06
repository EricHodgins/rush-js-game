var rush = rush || {}

rush.Platform = (function() {
	function Platform(width) {
		this.initialize();
	}

	var p = Platform.prototype = new rush.GameObject();
	//p.category = "platform";

	p.GameObject_initialize = p.initialize;
	p.initialize = function(width) {
		this.GameObject_initialize();
		this.width = width || 120;
		this.height = 12;

		this.category = "platform";
		
		// draw a shape to represent the platform
		var shape = new rush.CommonShapes.rectangle({
			width: this.width,
			height: this.height
		});
		this.addChild(shape);
	}

	return Platform;
})();
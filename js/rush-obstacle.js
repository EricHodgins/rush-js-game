var rush = rush || {};

rush.Obstacle = (function() {
	function Obstacle() {
		this.initialize();
	}

	var p = Obstacle.prototype = new rush.GameObject();

	//p.category = "obstacle";

	// p.width = 20;
	// p.height = 10;


	p.GameObject_initialize = p.initialize;
	p.initialize = function() {
		this.GameObject_initialize();

		// Dimensions
		this.width = 20;
		this.height = 10;

		this.category = "obstacle";

		// put registration points to the bottom center
		this.regX = this.width/2;
		this.regY = this.height;

		//draw a red square to represent the obstacle
		var shape = new rush.CommonShapes.rectangle({
			width: this.width,
			height: this.height,
			fillColor: "#F00"
		});


		this.addChild(shape);
	}

	return Obstacle;

})();
var rush = rush || {}

rush.Hero = (function() {
	function Hero() {
		this.initialize();	
	}

	var p = Hero.prototype = new rush.MovableGameObject();

	// super initialize
	p.MovableGameObject_initialize = p.initialize;
	p.initialize = function() {
		this.MovableGameObject_initialize();

		this.category = "hero";
		this.width = 5;
		this.height = 20;

		var shape = rush.CommonShapes.rectangle({
			width: this.width,
			height: this.height,
			fillColor: "orange",
		});

		this.addChild(shape);
																	/// -------
		// put registration (anchor) point to the middle of the feet    |__o__|  the o is the anchor point
		this.regX = this.width/2;
		this.regY = this.height;

		// collison point
		this.collisionPoints = [
			new createjs.Point(this.width/2, this.height), // bottom center
			new createjs.Point(this.width, this.height/2) // right middle
		];


		// make hero run 
		this.addEventListener("tick", this.tick.bind(this));
	}

	p.jump = function() {
		if (this.onGround) {
			this.velocity.y = -7;
		}
	}

	p.MovableGameObject_tick = p.tick;
	p.tick = function() {
		this.MovableGameObject_tick();
		this.velocity.x = 3;
	}


	return Hero;
	
})();
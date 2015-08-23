var rush = rush || {}

rush.MovableGameObject = (function() {
	function MovableGameObject() {
		this.initialize();	
	}

	var p = MovableGameObject.prototype = new rush.GameObject();

	p.GameObject_initialize = p.initialize;
	p.initialize = function() {
		this.GameObject_initialize();

		// To do: moving logic later, such as gravity
		this.velocity = new createjs.Point(0, 0);

		// how fast it goes downward
		this.dropSpeed = 0.5;

		// is this game object standing on any ground?
		this.onGround = false;

		// Give hearbeat to MoveableGameObject
		console.log(this.velocity.y);

		this.addEventListener("tick", this.tick.bind(this));

	}

	p.tick = function() {
		// apply gravity
		this.velocity.y += this.dropSpeed;
		this.velocity.y = Math.min(this.velocity.y, 5); // max is 5.
	}


	return MovableGameObject;
	
})();
var rush = rush || {}
rush.Game = function() {
	// constructor
	function RushGame() {
		console.log("Rush game starting");
		this.canvas = document.getElementById("game-canvas");

		// Easeljs stage
		this.stage = new createjs.Stage(this.canvas);

		// Camera
		this.camera = new createjs.Container();
		this.stage.addChild(this.camera);

		// Create heartbeat for our game loop.
		var self = this;
		createjs.Ticker.setFPS(40);
		createjs.Ticker.addEventListener("tick", this.tick.bind(this));
		
		this.initGame();
	}

	var p = RushGame.prototype;

	p.initGame = function() {
		var lastPlatformX = 50;
		var lastPlatformY = 150;

		for (var i = 0; i < 30; i++) {
			var platform = new rush.Platform(120);

			platform.x = lastPlatformX;
			// -40 ~ +40 from the last y position
			platform.y = Math.random() * 80 - 40 + lastPlatformY;

			// we need to limit the max and min y to a range.
			// the range is 80-250
			platform.y = Math.max(80, Math.min(250, platform.y));

			this.camera.addChild(platform);

			var gapBetweenPlatforms = Math.random() * 32;
			lastPlatformX += platform.width + gapBetweenPlatforms;
			lastPlatformY = platform.y;

			// let's put an obstacle on platform
			if (Math.random() > 0.5 && i >= 1) {
				var obstacle = new rush.Obstacle();
				obstacle.x = platform.x + platform.width/2;
				obstacle.y = platform.y;
				this.camera.addChild(obstacle);
			} else {
				// put coins on platform
				var coin = new rush.Coin();
				coin.x = platform.x + platform.width/2;
				coin.y = platform.y;
				this.camera.addChild(coin);
			}
		}


		var hero = this.hero = new rush.Hero();
		hero.x = 100;
		hero.y = 100;
		this.camera.addChild(hero);

		this.stage.on("stagemousedown", function() {
			hero.jump();
		});
	}


	p.tick = function(event) {
		this.updateView();
		this.moveGameObjects();
		this.moveCamera();
		this.resolveCollision();
	}

	p.moveCamera = function() {
		this.camera.x -= this.hero.velocity.x;
	}

	p.moveGameObjects = function() {
		for (var i = 0, len=this.camera.children.length; i < len; i++) {
			var gameObject = this.camera.children[i];
			if (gameObject.velocity) {
				gameObject.x += gameObject.velocity.x;
				gameObject.y += gameObject.velocity.y;
			}
		}
	}



	p.heroHitsPlatform = function(point) {
		// get distance b/w target point and game object
		var distanceY = -point.y;
		if (this.hero.velocity.y > 0) {
			this.hero.y += distanceY;
			this.hero.velocity.y = 0;
		}

		this.hero.onGround = true;

	}
	
	p.resolveCollision = function() {
		// check collison b/w platform and hero
		this.hero.onGround = false;
		this.gameObjectHitHero("platform", (this.heroHitsPlatform).bind(this));

		this.gameObjectHitHero("obstacle", function() {
			console.log("Hero hits obstacle..ouch!");
		});

		// check collision b/w coin and hero
		this.gameObjectHitHero("coin", function() {
			console.log("Hero collects coin");
		});	
	}
	

	// detect if given category of game object hits the hero
	// call the hitCallBack function if true
	p.gameObjectHitHero = function(category, hitCallback) {
		for (var i = 0, len=this.camera.children.length; i < len; i++) {
			var gameObject = this.camera.children[i];

			// check collision b/w platform and hero
			if (gameObject.category === category) {
				// loop all collsion points
				for (var j in this.hero.collisionPoints) {
					var collisionPoint = this.hero.collisionPoints[j];
					var point = this.hero.localToLocal(collisionPoint.x, collisionPoint.y, gameObject);
					if (gameObject.hitpoint(point)) {
						hitCallback(point, gameObject);
					}
				}
			}
		}
	}




	p.updateView = function() {
		this.stage.update();
	}

	return RushGame;
}();
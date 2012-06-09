	/*------------------- 
a player entity
-------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
	
		/**
 * helper function for platform games
 * make the entity move left of right
 * @param {Boolean} left will automatically flip horizontally the entity sprite
 */
doWalk : function(left) {
    this.flipX(left);
    this.vel.x += (left) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
},
 
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 		this.startX = x;
		this.startY = y;
        // set the walking & jumping speed
        this.setVelocity(3, 15);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
 
        if (me.input.isKeyPressed('left')) {
            this.doWalk(true);
        } else if (me.input.isKeyPressed('right')) {
            this.doWalk(false);
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('jump')) {
			if(this.doJump()) {
            me.audio.play("jump");
			}
        }
 
        // check & update player movement
        this.updateMovement();
 
 		// check for collision
    var res = me.game.collide(this);
 
    if (res) {
        // if we collide with an enemy

		
        if (res.obj.type == me.game.ENEMY_OBJECT) {
            // check if we jumped on it
            if ((res.y > 0) && ! this.jumping) {
                // bounce
				me.audio.play("stomp");
                this.forceJump();
            } else {
                // let's flicker in case we touched an enemy
                this.flicker(45);
				
				 
				 /*Para devolver al inicio
				 this.pos.x = this.startX;
				  this.pos.y = this.startY;*/
            }
        }
	
    }
	
		if (this.pos.y >= 480){

			me.game.viewport.fadeIn("#000", 500);
			this.pos.x = this.startX;
			this.pos.y = this.startY-202;
		}
	
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            this.parent(this);
            return true;
        }
        return false;
    }
	

});


/*----------------
 a Coin entity
------------------------ */
var CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
		
		// do something when collide
    me.audio.play("cling");
		// give some score
    me.game.HUD.updateItemValue("score", 1);
       // make sure it cannot be collected "again"
    this.collidable = false;
    // remove it
    me.game.remove(this);
    }
 
});

/* --------------------------
an enemy Entity
------------------------ */
var EnemyEntity_2 = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "caucho_indio";
        settings.spritewidth = 52;
 
        // call the parent constructor
        this.parent(x, y, settings);
 
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite
 
        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // walking & jumping speed
        this.setVelocity(2, 4);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
		
            this.flicker(25, function()
			{
				 this.collidable = false;
				 me.game.HUD.updateItemValue("score", 10);
   				 // remove it
   				 me.game.remove(this);
				});
        }
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not visible
        if (!this.visible)
            return false;
 
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            this.doWalk(this.walkLeft);
        } else {
            this.vel.x = 0;
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            this.parent(this);
            return true;
        }
        return false;
    }
});



/* --------------------------
an enemy Entity
------------------------ */
var EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "wheelie_right";
        settings.spritewidth = 52;
 
        // call the parent constructor
        this.parent(x, y, settings);
 
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite
 
        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // walking & jumping speed
        this.setVelocity(2, 4);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
		
            this.flicker(25, function()
			{
				 this.collidable = false;
				 me.game.HUD.updateItemValue("score", 10);
   				 // remove it
   				 me.game.remove(this);
				});
        }
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not visible
        if (!this.visible)
            return false;
 
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            this.doWalk(this.walkLeft);
        } else {
            this.vel.x = 0;
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            this.parent(this);
            return true;
        }
        return false;
    }
});


/*-------------- 
a score HUD Item
--------------------- */
 
var ScoreObject = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
    },
 
    /* -----
 
    draw our score
 
    ------ */
    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
 
});





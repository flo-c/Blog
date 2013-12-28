window.main = {
	
	touchStartHandler : function(evt) {
		evt.preventDefault(true);
		var touch = evt.changedTouches;
		if ((touch != null) && (touch.length > 0)) {
			this.startX = touch[0].screenX;
			if (this.display.menuVisible) {
				this.menuLeftPosition = 0;
			}
			else {
				this.menuLeftPosition = - this.menuWidth;
			}
		}
	},
	
	touchMoveHandler : function(evt) {
		evt.preventDefault(true);
		var touch = evt.changedTouches;
		if ((this.startX != null) && (touch != null) && (touch.length > 0)) {
			var moveX = touch[0].screenX;
			var diff = moveX - this.startX;
			var menuCurrentPosition = this.menuLeftPosition + diff;
			if ((- this.menuWidth <= menuCurrentPosition) && (menuCurrentPosition <= 0)) {
				var menu = document.getElementById('menu');
				menu.style.left = menuCurrentPosition + "px";
			}
		}
	},
	
	touchEndHandler : function(evt) {
		evt.preventDefault(true);
		var touch = evt.changedTouches;
		if ((this.startX != null) && (touch != null) && (touch.length > 0)) {
			var moveX = touch[0].screenX;
			var diff = moveX - this.startX;
			var menuCurrentPosition = this.menuLeftPosition + diff;
			var menu = document.getElementById('menu');
			if (menuCurrentPosition < (- this.menuWidth / 2)) {
				this.display.menuVisible = false;
				this.displayMenu(menu, false);
			}
			else {
				this.display.menuVisible = true;
				this.displayMenu(menu, true);
			}
		}
	},
	
	displayMenu : function(menu, display) {
		var rule = this.getMenuDisplayAnimation(display);
		this.addAnimationToMenu(menu, rule.animation, rule.duration, display);
	},
	
	getMenuDisplayAnimation : function(display) {
		var animation = '@-webkit-keyframes displayMenuAccount {\n' + 
			'from {left : ' + menu.style.left + ';}\n' + 
			'to {left : ' + (display ? '0px' : ((-this.menuWidth) + 'px')) + ';}\n' +
			'}';
		var distance = display ? (-this.getMenuLeftPosition(menu)) : (this.getMenuLeftPosition(menu) + this.menuWidth);
		var duration = (distance * 500) / this.menuWidth ;
		return {'animation' : animation,
				'duration' : duration};
	},
	
	getMenuLeftPosition : function(menu) {
		var length = menu.style.left;
		length = length.substring(0, length.indexOf("px"));
		return parseInt(length, 10);
	},
	
	addAnimationToMenu : function(menu, rule, time, display) {
		if( document.styleSheets && document.styleSheets.length) {
			var i = 0;
			var j = 0;
			var found = false;
			var currentStyleSheet = null;
			while ((i < document.styleSheets.length) && !found) {
				currentStyleSheet = document.styleSheets[i];
				if (currentStyleSheet.rules && currentStyleSheet.rules.length) {
					j = 0;
					while ((j < currentStyleSheet.rules.length) && !found) {
						if (currentStyleSheet.rules[j].name === "displayMenuAccount") {
							found = true;
						}
						j++;
					}
				}
				i++;
			}
			if (found) {
				currentStyleSheet.deleteRule(j-1);
				currentStyleSheet.insertRule(rule, j-1);
			}
			else {
				document.styleSheets[i-1].addRule(rule);
			}
		}
		else {
			var s = document.createElement( 'style' );
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
			s.innerHTML = rule;
		}
		menu.addEventListener("webkitAnimationEnd", this.menuDisplayed.bind(this, {'display' : display}), false);
		menu.style.webkitAnimation = 'displayMenuAccount ' + time + 'ms linear 1';
	},
	
	menuDisplayed : function(args, evt) {
		var menu = document.getElementById('menu');
		menu.style.left = (args.display ? 0 : -this.menuWidth) + 'px';
		menu.style.webkitAnimation = '';
	},
	
	initialize : function() {
		// Set output div height
		this.display = {
			menuVisible : true
		};
		var outputDiv = document.getElementById('output');
		// Set main display height
		var mainContainerDiv = document.getElementById('swipingcontainer');
		var headerDiv = document.getElementById('headercontainer');
		var menuDiv = document.getElementById('menu');
		mainContainerDiv.style.height = (outputDiv.clientHeight - headerDiv.clientHeight) + "px";
		menuDiv.style.height = (outputDiv.clientHeight - headerDiv.clientHeight) + "px";
		this.menuWidth = menuDiv.clientWidth;
		// AddEventListener
		mainContainerDiv.addEventListener("touchstart", this.touchStartHandler.bind(this), false);
		mainContainerDiv.addEventListener("touchmove", this.touchMoveHandler.bind(this), false);
		mainContainerDiv.addEventListener("touchend", this.touchEndHandler.bind(this), false);
	}
	
};
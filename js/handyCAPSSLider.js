/*! handyCAPSSLider - v0.1.0 - 2014-04-29
* Copyright (c) 2014 handyCAPS; Licensed MIT */


var handyCAPSSlider = {

	classify: function(cName) {

		if (cName.indexOf('.') === 0) {
			return cName;
		}

		return '.' + cName;
	},

	setClasses: function() {
		this.container 	= this.classify(this.container);
		this.item 			= this.classify(this.item);
		this.caption 		= this.classify(this.caption);
	},

	getItems: function() {
		return document.querySelectorAll(this.container + ' ' + this.item);
	},

	countItems: function() {
		var items = this.getItems();

		return items.length;
	},

	getBullets: function() {
		var slideCount = this.countItems(),
		allBullets = '',
		bullet = "<div class='bullet' style='display: inline-block; border-radius: 50%;";
		bullet += "width: " + this.bulSize + ';';
		bullet += "height: " + this.bulSize + ';';
		bullet += " background-color: " + this.bulColor + ';';
		bullet += "'></div>";

		for (var i = 0; i < slideCount; i++) {
			allBullets += bullet;
		}

		return allBullets;
	},

	placeBullets: function() {
		var bullets = this.getBullets(),
		holster = document.createElement('div');

		holster.className = 'holster';

		document.querySelector(this.container).appendChild(holster);

		holster.innerHTML = bullets;
	},

	getCapHeight: function() {

		if (this.cMHeight === undefined) {
			return "height: " + this.capHeight + ";";
		} else {
			return "min-height: " + this.cMHeight + ";";
		}
	},

	getCSS: function() {
		// Border-box all the things
		var css = this.container + "," + this.container + " * {box-sizing: border-box; -moz-box-sizing: border-box;}";
		// Basic styling for container
		css += this.container + "{ overflow: hidden; position: relative; white-space: nowrap; font-size: 0;";
		// Optional styling
		css += "width: " + this.itemWidth + ";";
		css += "height:" + this.itemHeight + ";";

		css += "}";

		// Basic styling for items
		css += this.container + ' ' + this.item + "{ position: relative; display: inline-block; width: 100%; vertical-align: middle;font-size: 16px; font-size: 1rem; white-space: normal;";

		css += "}";

		// Styling the images
		css += this.container + ' ' + this.item + " img { width: 100%;";
		css += "height: " + this.itemHeight + ";";

		css += "}";

		// Basic styling for captions
		css += this.container + ' ' + this.caption + " { position: absolute; bottom: 0; padding: 0.25em 0.5em;";

		css += this.getCapHeight();

		css += "background-color: " + this.capColor + ";";
		css += "color: " + this.cTxtColor + ";";
		css += "font-size: " + this.cFontSize + ";";

		css += "}";

		// Resetting some styling
		css += this.container + " > div {font-size: 16px; font-size: 1rem; white-space: normal;}";
		css += this.container + " p { margin: 0;}";
		css += this.container + " h2,";
		css += this.container + " h3 {margin: 0 0 0.5em;}";

		return css;
	},

	placeHeadStyles: function() {
		var head = document.head || document.getElementsByTagName('head')[0],
		styles = document.createTextNode(this.getCSS()),
		style = document.createElement('style');

		style.appendChild(styles);

		head.appendChild(style);
	},

	init: function(paras) {

		var params = paras || {};

		// Basic settings
		this.container 	= params.container 		|| 'slider-container';
		this.item 			= params.item 				|| 'slider-item';
		this.caption 		= params.caption 			|| 'slider-caption';
		// Making sure everything gets a working classname
		this.setClasses();

		// Styling settings
		this.itemWidth	= params.itemWidth		|| '100%';
		this.itemHeight	=	params.itemHeight		|| 'auto';

		this.capHeight	= params.captionHeight	|| '33.333%';
		this.cMHeight		= params.capMinHeight;
		this.capColor		= params.captionColor		|| 'rgba(0,0,0,0.4)';
		this.cTxtColor 	= params.capTextColor		|| '#FFF';
		this.cFontSize	= params.capFontSize		|| '16px';

		this.bulSize 		= params.bulletSize 	|| '16px';
		this.bulColor		= params.bulletColor	|| '#7f8c8d';

		// Placing basic css in the head
		this.placeHeadStyles();

		this.placeBullets();

	}

};


function HandyCAPSSlider(cont)  {

	this.every = function (time,cb) {

		this.timerid = window.setInterval(cb.bind(this), parseInt(time, 10));

	};

	this.classify = function(cName) {

		if (cName.indexOf('.') === 0) {
			return cName;
		}

		return '.' + cName;
	};

	this.setClasses = function() {
		this.container 	= this.classify(this.container);
		this.item 			= this.classify(this.item);
		this.caption 		= this.classify(this.caption);
	};

	this.getItems = function() {
		return document.querySelectorAll(this.container + ' ' + this.item);
	};

	this.countItems = function() {
		var items = this.getItems();

		return items.length;
	};

	this.nameItems = function(item, name) {
		var items = document.querySelectorAll(this.container + ' ' + item);

		for (var i = 0; i < items.length; i++) {
			items[i].className += " " + name + parseInt(i + 1, 10);
		}
	};

	this.getBullets = function() {
		var slideCount = this.countItems(),
		allBullets = '',
		bullet = "<div class='bullet' style='display: inline-block; border-radius: 50%;";
		bullet += "margin: 0 " + (parseInt(this.bulSize, 10) / 4).toString() + 'px;';
		bullet += "width: " + this.bulSize + ';';
		bullet += "height: " + this.bulSize + ';';
		bullet += " background-color: " + this.bulColor + ';';
		bullet += "'></div>";

		for (var i = 0; i < slideCount; i++) {
			allBullets += bullet;
		}

		return allBullets;
	};

	this.placeBullets = function() {
		var bulletHolster = document.createElement("div"),
		bullets = this.getBullets(),
		targets = document.querySelectorAll(this.container);

		bulletHolster.className = 'bullet-holster';
		var bs = bulletHolster.style;
		bs.margin = (parseInt(this.bulSize, 10) / 1.5).toString() + 'px auto';
		bs.textAlign = 'center';
		bs.overflow = 'hidden';

		for (var i = 0; i < targets.length; i++) {
			targets[i].appendChild(bulletHolster);
		}

		var holsters = document.querySelectorAll(this.container + ' .bullet-holster');

		for (var j = 0; j < holsters.length; j++) {
			holsters[j].innerHTML = bullets;
		}

	};

	this.getCapHeight = function() {

		if (this.cMHeight === undefined) {
			return "height: " + this.capHeight + ";";
		} else {
			return "min-height: " + this.cMHeight + ";";
		}
	};

	this.getCSS = function() {
		// Border-box all the things
		var css = this.container + "," + this.container + " * {box-sizing: border-box; -moz-box-sizing: border-box;}";
		// Basic styling for container
		css += this.container + "{ overflow: hidden; position: relative; white-space: nowrap; font-size: 0;";
		// Optional styling
		css += "width: " + this.itemWidth + ";";

		css += "}";

		// Basic styling for items
		css += this.container + ' ' + this.item + "{ position: relative; display: inline-block; width: 100%; font-size: 16px; font-size: 1rem; white-space: normal; transition: 0.5s";

		css += "}";

		// Styling the images
		css += this.container + ' ' + this.item + " img { width: 100%; vertical-align: middle;";
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
	};

	this.placeHeadStyles = function() {
		var head = document.head || document.getElementsByTagName('head')[0],
		styles = document.createTextNode(this.getCSS()),
		style = document.createElement('style');

		style.appendChild(styles);

		head.appendChild(style);
	};

	this.moveSlide = function () {
		console.log(this.i);
		var slide = this.getItems(),
		one = this.i,
		two = parseInt(this.i + 1, 10);
		slide[one].style.transform = 'translateX(-100%)';
		slide[two].style.transform = 'translateX(-100%)';

		this.i++;

		if (this.i >= this.countItems() - 1) {
			window.clearInterval(this.timerid);
			console.log('Yes');
		}
	};

	this.init = function(paras) {

		var params = paras || {};

		// Basic settings
		this.container 	= params.container 		|| cont || 'slider-container';
		this.item 			= params.item 				|| 'slider-item';
		this.caption 		= params.caption 			|| 'slider-caption';
		// Making sure everything gets a working classname
		this.setClasses();

		// Naming all the slider items
		this.nameItems(this.item, 'slide');

		// Styling settings
		this.itemWidth	= params.itemWidth		|| '100%';
		this.itemHeight	=	params.itemHeight		|| 'auto';

		this.capHeight	= params.captionHeight	|| '33.333%';
		this.cMHeight		= params.capMinHeight;
		this.capColor		= params.captionColor		|| 'rgba(0,0,0,0.4)';
		this.cTxtColor 	= params.capTextColor		|| '#FFF';
		this.cFontSize	= params.capFontSize		|| '16px';

		this.bullets 		= params.bullets === undefined || true ? true : false;
		this.bulSize 		= params.bulletSize 	|| '16px';
		this.bulColor		= params.bulletColor	|| '#7f8c8d';

		// Placing basic css in the head
		this.placeHeadStyles();

		if (this.bullets) {
			this.placeBullets();
		}

		this.i = 0;

		this.every(1000, this.moveSlide);

	};

}

var handyCAPSSlider = new HandyCAPSSlider();
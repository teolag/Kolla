var Kolla = (function() {
	var

	margin = 20,
	enlarge = false,

	KEY_ESC = 27,
	KEY_LEFT = 37,
	KEY_RIGHT = 39,



	show = function(path) {
		console.log("show image", path);
		Dimmer.show();
		Preview.show(path);
		Sensor.activate();
		//document.body.style.overflow = "hidden";
	},

	close = function() {
		console.log("CLOSE");
		Dimmer.hide();
		Preview.hide();
		Sensor.deactivate();
		//document.body.style.overflow = "auto";
	},

	findAndInit = function() {
		var singleImages = document.querySelectorAll('.kolla-single-image');
		console.log("init Kolla", singleImages);
		for(var i=0; i<singleImages.length; i++) {
			console.log("init single image", singleImages[i]);
			singleImages[i].addEventListener("click", function(e) {
				var gallery = new Gallery(e.target);
				gallery.showIndex(0);
			}, false);
		}

		var galleries = document.querySelectorAll(".kolla-gallery");
		for(var i=0; i<galleries.length; i++) {
			console.log("init gallery", galleries[i]);

			galleries[i].addEventListener("click", function(e) {

				if(e.button != 0) return;
				var galleryDiv = this;
				var path = e.target.dataset.path;
				if(!path) return;

				var images = galleryDiv.querySelectorAll('.kolla-image');

				var gallery = new Gallery(images);

				for(var i=0; i<images.length; i++) {
					if(e.target === images[i]) {
						console.log("show image " + (i+1) + " of " + images.length);
						break;
					}
				}

				gallery.showIndex(i);

			} , false);
		}
	},


	Preview = (function() {
		var img, left, top, scale, fitScale;

		function create() {
			if(img) {
				img.removeEventListener('webkitTransitionEnd', removeAfterFadeOut, false);
			} else {
				img = new Image();
				img.classList.add("preview");
				addEventListener("resize", resize);
			}
		}

		function show(path) {
			create();
			img.src=path;
			img.onload = onload;
			document.body.appendChild(img);
		}

		function onload(e) {
			calculateBestFit();
			scale = fitScale;
			center();
			img.classList.add("visible");
			img.style.transform = "scale("+scale+","+scale+")";
		}

		function calculateBestFit() {
			fitScale = Math.min((innerWidth-2*margin)/img.width, (innerHeight-2*margin)/img.height);

			if(!enlarge && fitScale>1) {
				fitScale = 1;
			}

		}

		function center() {
			left = innerWidth/2 - img.width/2;
			top = innerHeight/2 - img.height/2;

			img.style.left = left + "px";
			img.style.top = top + "px";
		}

		function resize() {
			if(scale===fitScale) {
				calculateBestFit();
				scale = fitScale;
				img.style.transform = "scale("+scale+","+scale+")";
			}
			center();
		}

		function hide() {
			img.classList.remove("visible");
			img.style.transform = "";
			img.addEventListener('webkitTransitionEnd', removeAfterFadeOut, false);
		}

		function removeAfterFadeOut(e) {
			if(!img) return;
			img.parentNode.removeChild(img);
			img = null;
			removeEventListener("resize", resize);
		}

		return {
			show: show,
			hide: hide
		}
	}()),


	Dimmer = (function() {
		var dim;

		function create() {
			if(dim) {
				dim.removeEventListener('webkitTransitionEnd', removeAfterFadeOut, false);
			} else {
				dim = document.createElement("div");
				dim.classList.add("dimmer");
				document.body.appendChild(dim);
			}
		}

		function show() {
			create();
			setTimeout(function() {
				dim.classList.add("visible");
			},10);
		}

		function hide() {
			dim.classList.remove("visible");
			dim.addEventListener('webkitTransitionEnd', removeAfterFadeOut, false);
		}

		function removeAfterFadeOut(e) {
			dim.parentNode.removeChild(dim);
			dim = null;
		}

		return {
			show: show,
			hide: hide
		}
	}());

	Gallery = function(images) {
		if(!images) return;
		if(images instanceof Node) this.images = [images];
		else this.images = images;
		this.index = 0;
		this.open = false;
		this.sensor = null;
	};

	Gallery.prototype = {
		showIndex: function(i) {
			this.index = i;
			var path = this.images[i].dataset.path;
			console.log("Show index", i, "image "+(i+1)+" of "+this.images.length);

			if(!this.open) {
				Dimmer.show();
				this.open = true;
				this.sensor = document.createElement("div");
				this.sensor.classList.add("sensor");
				this.sensor.addEventListener("click", this.close.bind(this), false);
				document.body.appendChild(this.sensor);

				this.keyHandlerBinding = this.keyHandler.bind(this);
				this.mouseWheelBinding = this.mouseWheelHandler.bind(this);
				document.addEventListener("keydown", this.keyHandlerBinding, false);
				document.addEventListener("mousewheel", this.mouseWheelBinding, false);
			}
			Preview.show(path);
		},

		close: function() {
			Dimmer.hide();
			Preview.hide();
			this.sensor.parentNode.removeChild(this.sensor);
			this.sensor = null;
			document.removeEventListener("keydown", this.keyHandlerBinding, false);
			document.removeEventListener("mousewheel", this.mouseWheelBinding, false);
			this.open = false;
		},

		keyHandler: function(e) {
			switch(e.keyCode) {
				case KEY_ESC:
					this.close();
				break;
				case KEY_LEFT:
					this.previous()
				break;
				case KEY_RIGHT:
					this.next()
				break;
			}
		},

		mouseWheelHandler: function(e) {
			if(e.wheelDeltaY>0) {
				this.previous();
			} else {
				this.next();
			}
		},

		next: function() {
			if(this.index === this.images.length-1) return;
			this.showIndex(this.index+1);
		},

		previous: function() {
			if(this.index===0) return;
			this.showIndex(this.index-1);
		}
	};

	document.addEventListener("DOMContentLoaded", findAndInit, false);

	return {
		show: show,
		close: close
	};

}());
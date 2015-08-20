var Kolla = (function() {
	var

	margin = 20,
	enlarge = false,

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
	};


	var Sensor = (function() {
		var div;

		function activate() {
			if(div) {

			} else {
				div = document.createElement("div");
				div.classList.add("sensor");
				div.addEventListener("click", close, false);
				document.body.appendChild(div);
			}
		}

		function deactivate() {
			div.parentNode.removeChild(div);
			div = null;
		}

		return {
			activate: activate,
			deactivate: deactivate
		}
	}());


	var Preview = (function() {
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
	}());


	var Dimmer = (function() {
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


	return {
		show: show,
		close: close
	};

}());
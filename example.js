var images = [
	{"original":"http://30.media.tumblr.com/tumblr_lrjcwcCfd11qfyzelo1_1280.jpg", "thumb":"http://30.media.tumblr.com/tumblr_lrjcwcCfd11qfyzelo1_250.jpg"},
	{"original":"http://25.media.tumblr.com/tumblr_m3yxaxsHN41qg73i1o1_1280.jpg", "thumb":"http://25.media.tumblr.com/tumblr_m3yxaxsHN41qg73i1o1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_m1k5fb7Gf41r6b7kmo1_500.jpg", "thumb":"http://24.media.tumblr.com/tumblr_m1k5fb7Gf41r6b7kmo1_250.jpg"},
	{"original":"http://25.media.tumblr.com/tumblr_m064w4fhtV1qgjltdo1_1280.jpg", "thumb":"http://25.media.tumblr.com/tumblr_m064w4fhtV1qgjltdo1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_ma7os6g8cy1qe6buzo1_1280.jpg", "thumb":"http://24.media.tumblr.com/tumblr_ma7os6g8cy1qe6buzo1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_mbc1vdTMRB1qejbiro1_1280.jpg", "thumb":"http://24.media.tumblr.com/tumblr_mbc1vdTMRB1qejbiro1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_m0tbycXV641qgjltdo1_1280.jpg", "thumb":"http://24.media.tumblr.com/tumblr_m0tbycXV641qgjltdo1_250.jpg"},
	{"original":"http://25.media.tumblr.com/tumblr_lx8muhLzwl1qa4nk7o1_500.jpg", "thumb":"http://25.media.tumblr.com/tumblr_lx8muhLzwl1qa4nk7o1_250.jpg"},
	{"original":"http://29.media.tumblr.com/ZabOTt2mpekailt4a6jQnCj7o1_400.jpg", "thumb":"http://29.media.tumblr.com/ZabOTt2mpekailt4a6jQnCj7o1_250.jpg"},
	{"original":"http://25.media.tumblr.com/tumblr_lzqxhuFzva1r6b7kmo1_500.jpg", "thumb":"http://25.media.tumblr.com/tumblr_lzqxhuFzva1r6b7kmo1_250.jpg"},
	{"original":"http://29.media.tumblr.com/tumblr_lu0jxvSVO21r4xjo2o1_r1_1280.jpg", "thumb":"http://29.media.tumblr.com/tumblr_lu0jxvSVO21r4xjo2o1_r1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_m1k48yKjfz1r4hwixo1_400.jpg", "thumb":"http://24.media.tumblr.com/tumblr_m1k48yKjfz1r4hwixo1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_ly61ngxdDT1qzpwi0o1_1280.jpg", "thumb":"http://24.media.tumblr.com/tumblr_ly61ngxdDT1qzpwi0o1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_m02prljjoW1qjev1to1_500.jpg", "thumb":"http://24.media.tumblr.com/tumblr_m02prljjoW1qjev1to1_250.jpg"},
	{"original":"http://29.media.tumblr.com/Jjkybd3nSf6sqpej00UkqKSIo1_400.jpg", "thumb":"http://29.media.tumblr.com/Jjkybd3nSf6sqpej00UkqKSIo1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_m4iei31RmX1qd477zo1_1280.jpg", "thumb":"http://24.media.tumblr.com/tumblr_m4iei31RmX1qd477zo1_250.jpg"},
	{"original":"http://27.media.tumblr.com/tumblr_lzk93mYEYl1r7r30ho1_500.gif", "thumb":"http://27.media.tumblr.com/tumblr_lzk93mYEYl1r7r30ho1_250.gif"},
	{"original":"http://24.media.tumblr.com/tumblr_m44s85Hr5L1qd5euro1_1280.jpg", "thumb":"http://24.media.tumblr.com/tumblr_m44s85Hr5L1qd5euro1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_m4sk1dZyOY1qd477zo1_1280.jpg", "thumb":"http://24.media.tumblr.com/tumblr_m4sk1dZyOY1qd477zo1_250.jpg"},
	{"original":"http://24.media.tumblr.com/tumblr_m2hgoksFII1qejbiro1_1280.jpg", "thumb":"http://24.media.tumblr.com/tumblr_m2hgoksFII1qejbiro1_250.jpg"}
];


var gallery = document.getElementById("gallery");
gallery.addEventListener("click", galleryClick, false);


var antal = images.length;
antal = 3;

for(var i=0; i<antal; i++) {
	var thumb = new Image();
	thumb.src = images[i].thumb;
	thumb.dataset.path = images[i].original;
	gallery.appendChild(thumb);
}







function galleryClick(e) {
	var path = e.target.dataset.path;
	if(!path) return;

	Kolla.show(path);
}

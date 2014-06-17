//                    urs    leo    sex    can    sna    cra    boo    vir    com
var stars_xs = Array( -800, -800, -1400, -1500, -1500, -1100,     0,     0,  -200);
var stars_ys = Array(    0, -450,  -450,  -100,  -500,  -500,     0,  -500,     0);

function initStarSky() {
	// $("#star_sky").css("marginLeft", stars_xs[0]);
	// $("#star_sky").css("marginTop",  stars_ys[0]);
	// var col = $("[ctype='cons_pic']");
	// col.each(
	// 	function(index) {
	// 		var c = $(col[index]);
	// 		$(c.children()[0]).css("opacity", 0);
	// 		$(c.children()[1]).css("opacity", 0);
	// 	}
	// );
	// consIndex = -1;
	onEnterStarSky();
	// switchToConstellation(consIndex);
}

function onEnterStarSky() {
	$("#star_sky").css("marginLeft", stars_xs[0]);
	$("#star_sky").css("marginTop",  stars_ys[0]);
	var col = $("[ctype='cons_pic']");
	col.each(
		function(index) {
			var c = $(col[index]);
			$(c.children()[0]).css("opacity", 0);
			$(c.children()[1]).css("opacity", 0);
		}
	);
	consIndex = -1;
}

var constelCooloff = 500;
var consIndex = 0;
var lastConsIndex = 0;
function switchToConstellation(index) {
	$("#star_sky").animate({marginLeft: stars_xs[index], marginTop: stars_ys[index]}, constelCooloff);
	var lastOne = $("[ctype='cons_pic'][cdata='" + (lastConsIndex + 1) + "']").filter(":first");
	var nextOne = $("[ctype='cons_pic'][cdata='" + (index + 1) + "']").filter(":first");
	$(lastOne.children()[0]).animate({opacity: 0.0}, constelCooloff * 2);
	$(lastOne.children()[1]).animate({opacity: 0.0}, constelCooloff * 2);
	$(nextOne.children()[0]).animate({opacity: 1.0}, constelCooloff * 2);
	$(nextOne.children()[1]).delay(constelCooloff).animate({opacity: 1.0}, constelCooloff * 2);
}

var nextConstellation = _.debounce(function() {
	lastConsIndex = consIndex;
	consIndex++;
	consIndex = consIndex > 8 ? 8 : consIndex;
	switchToConstellation(consIndex);
}, constelCooloff);

var prevConstellation = _.debounce(function() {
	if (consIndex == -1) return;
	lastConsIndex = consIndex;
	consIndex--;
	consIndex = consIndex < 0 ? 0 : consIndex;
	switchToConstellation(consIndex);
}, constelCooloff);


/* Coordinates */

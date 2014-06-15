var cc; // Canvas
var cctx; // Canvas Context
var shadowImage; // Shadow image
var targetImage; // Target image

var shadowSpeed = 2;
var catchMinx = 50, catchMiny = 50, catchMaxx = 500, catchMaxy = 300;
var shadowx, shadowy, catchTargetx, catchTargety;
var nshadowx, nshadowy;
var vx, vy, va;

var targetFrameDone;

function drawShadow(x, y, a) {
	cctx.save();
	cctx.translate(x, y);
	cctx.rotate(a);
	cctx.drawImage(shadowImage, -shadowImage.width / 2, -shadowImage.height / 2);
	cctx.restore();
}

function drawTarget(x, y) {
	cctx.drawImage(targetImage, x - targetImage.width / 2, y - targetImage.height / 2);
}

function initCatch(width, height) {
	cc = $("#catchCanvas");
	cc.attr("width", width);
	cc.attr("height", height);
	catchMaxx = width - 50;
	catchMaxy = height - 50;

	cc = cc.get(0);
	cctx = cc.getContext("2d");

	shadowImage = document.createElement("img");
	shadowImage.src = "images/catch/shadow.png";

	targetImage = document.createElement("img");
	targetImage.src = "images/catch/target.png";

	onEnterCatch();
	setInterval(refreshCatchCanvas, 25);
}

function onEnterCatch() {

	$("#catch_frame").css("opacity", 0);
	$("#catch_frame").attr("height", 359);
	$("#catch_frame").css("marginLeft", -156);
	cctx.clearRect(0, 0, cc.width, cc.height);

	genNextShadowXY();
	shadowx = nshadowx;
	shadowy = nshadowy;
	updateShadowXY();
	refreshCatchCanvas();
	targetFrameDone = false;
}

function dist(x1, y1, x2, y2) {
	var dx = x1 - x2;
	var dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy);
}

function len(dx, dy) {
	return Math.sqrt(dx * dx + dy * dy);
}

function genRandom(from, to) {
	return from + Math.random() * (to - from);
}

function getAngle(dx, dy) {
	var a = 0;
	if(dx == 0) {
		a = dy > 0 ? 0 : Math.PI;
	} else if(dx > 0) {
		a = Math.PI / 2 - Math.atan(dy / dx);
	} else {
		a = Math.PI * 3 / 2 + Math.atan(- dy / dx);
	}
	return a;
}

function genNextShadowXY() {
	nshadowx = genRandom(catchMinx, catchMaxx);
	nshadowy = genRandom(catchMiny, catchMaxy);
}

function updateShadowXY() {
	if (dist(shadowx, shadowy, nshadowx, nshadowy) < 1) {
		genNextShadowXY();
		vx = nshadowx - shadowx;
		vy = nshadowy - shadowy;
		va = getAngle(vx, -vy);
		var vl = len(vx, vy);
		vx = vx * shadowSpeed / vl;
		vy = vy * shadowSpeed / vl;
	} else {
		shadowx += vx;
		shadowy += vy;
	}
}

function refreshCatchCanvas() {
	if (targetFrameDone) return;
	updateShadowXY();

	cctx.clearRect(0, 0, cc.width, cc.height);
	drawShadow(shadowx, shadowy, va);
	drawTarget(catchTargetx, catchTargety);
}

function dumpShadow() {
	console.log(shadowx + "," + shadowy);
}


var catchMinMousex = -2, catchMaxMousex = 4;
var catchMinMousey = -1.5, catchMaxMousey = 2.5;
requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	
	if (mousex == 0 && mousey == 0) {
		catchTargetx = -100;
		catchTargety = -100;
	} else {
		catchTargetx = catchMinx + (catchMaxx - catchMinx) * (mousex - catchMinMousex) / (catchMaxMousex - catchMinMousex);
		catchTargety = catchMaxy - (catchMaxy - catchMiny) * (mousey - catchMinMousey) / (catchMaxMousey - catchMinMousey);
	}
})

function grabThat() {
	if (targetFrameDone) return;
	if (dist(catchTargetx, catchTargety, shadowx, shadowy) < 50) {
		$("#catch_frame").animate({opacity: 1.0, height: 718, marginLeft: -333}, 500, function() {
			cctx.clearRect(0, 0, cc.width, cc.height);
		});
		// $("#catch_frame").animate({height: 718}, 500);
		// $("#catch_frame").animate({marginLeft: -333}, 500);
		targetFrameDone = true;
	}
}



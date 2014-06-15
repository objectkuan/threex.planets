var outdoorTarget;

var outdoorMinx = 50, outdoorMiny = 50, outdoorMaxx = 500, outdoorMaxy = 300;
var shadowx, shadowy, outdoorTargetx, outdoorTargety;

var outdoorIndex = 0;

function initOutdoor(width, height) {
	$("[ctype='outdoor_pic']").attr("width", width);
	$("[ctype='outdoor_pic']").attr("height", height);

	$("[ctype='outdoor_pic']").css("opacity", 0);
	$("[ctype='outdoor_pic'][cdata='0']").css("opacity", 1);

	outdoorMaxx = width;
	outdoorMaxy = height;

	outdoorTarget = $("#outdoorTarget");
	setInterval(updateOutdoorTarget, 25);
}

function updateOutdoorTarget() {
	outdoorTarget.css("left", outdoorTargetx);
	outdoorTarget.css("top", outdoorTargety);
	
	if (outdoorTargetx >= 340 && outdoorTargetx <= 740) {
		if (outdoorTargety >= 100 && outdoorTargety <= 180) {
			$("#outdoorIndexItem12").css("display", "");
			$("#outdoorIndexItem22").css("display", "none");
			$("#outdoorIndexItem32").css("display", "none");
		} else if (outdoorTargety >= 250 && outdoorTargety <= 330) {
			$("#outdoorIndexItem12").css("display", "none");
			$("#outdoorIndexItem22").css("display", "");
			$("#outdoorIndexItem32").css("display", "none");
		} else if (outdoorTargety >= 400 && outdoorTargety <= 480) {
			$("#outdoorIndexItem12").css("display", "none");
			$("#outdoorIndexItem22").css("display", "none");
			$("#outdoorIndexItem32").css("display", "");
		} else {
			$("#outdoorIndexItem12").css("display", "none");
			$("#outdoorIndexItem22").css("display", "none");
			$("#outdoorIndexItem32").css("display", "none");
		}
	} else {
		$("#outdoorIndexItem12").css("display", "none");
		$("#outdoorIndexItem22").css("display", "none");
		$("#outdoorIndexItem32").css("display", "none");
	}
}

var outdoorCooloff = 500;
var switchToOutdoor = _.debounce(function(index) {
		console.log(outdoorIndex);
	if (outdoorIndex == 0) {
		$("[ctype='outdoor_pic'][cdata='" + index + "']").animate({opacity: 1.0}, 500);
		$("[ctype='outdoor_pic'][cdata='" + outdoorIndex + "']").css("opacity", "0");
	} else if (index == 0) {
		$("[ctype='outdoor_pic'][cdata='0']").css("opacity", "1");
		$("[ctype='outdoor_pic'][cdata='" + outdoorIndex + "']").animate({opacity: 0.0}, 500);
	}
	outdoorIndex = index;
}, outdoorCooloff);


function tabOutdoor() {
	if(outdoorIndex > 0) {
		switchToOutdoor(0);
	} else if (outdoorTargety >= 100 && outdoorTargety <= 180) {
		switchToOutdoor(1);
	} else if (outdoorTargety >= 250 && outdoorTargety <= 330) {
		switchToOutdoor(2);
	} else if (outdoorTargety >= 400 && outdoorTargety <= 480) {
		switchToOutdoor(3);
	}
}

var outdoorMinMousex = -2, outdoorMaxMousex = 4;
var outdoorMinMousey = -1.5, outdoorMaxMousey = 2.5;
requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec - 1000 / 60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	
	if (mousex == 0 && mousey == 0) {
		outdoorTargetx = -1000;
		outdoorTargety = -1000;
	} else {
		outdoorTargetx = outdoorMinx + (outdoorMaxx - outdoorMinx) * (mousex - outdoorMinMousex) / (outdoorMaxMousex - outdoorMinMousex);
		outdoorTargety = outdoorMaxy - (outdoorMaxy - outdoorMiny) * (mousey - outdoorMinMousey) / (outdoorMaxMousey - outdoorMinMousey);
	}
});


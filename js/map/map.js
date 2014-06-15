function initMap(width, height) {
	$("#map_video").attr("width", width);
	$("#map_video").attr("height", height);
}

/*
0: stop at 0
1: playing to mid
2: stop at mid
3: playing to end
*/
var curMapStat;

function stopMapAt0() {
	$("#map_video").get(0).currentTime = 0;
	$("#map_video").get(0).pause();
	curMapStat = 0;
}

var mapCooloff = 500;
var slideMap = _.debounce(function() {
	if (curMapStat == 0) {
		curMapStat = 1;
		setTimeout(function() { $("#map_video").get(0).pause(); curMapStat = 2; }, 1000);
		$("#map_video").get(0).play();
	} else if (curMapStat == 1) {
	} else if (curMapStat == 2) {
		curMapStat = 3;
		$("#map_video").get(0).play();
	}
}, mapCooloff);


function playMapVideo() {
	$("#map_video").currentTime = 0;
	$("#map_video").get(0).play();
}

function stopMapVideo() {
	$("#map_video").get(0).pause();
}
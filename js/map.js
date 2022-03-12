/**
 * 조회할 맵 목록
 */
//map 1
var map;	// 맵 객체
var btnArea;	// 지도 내 다시하기 버튼 영역
var mapArrs = new Array();	// 주변 구역 좌표 저장 배열
var keywordResultArr = new Array();	// 주변 구역 좌표에 해당하는 음식점 배열
var lastMaker;	// 마지막 마커
var lastOverlay;	// 마지막 오버레이
var isEnd = false;	// 화면 표시 완료 여부
var cnt = 0;	// 현재 페이지 수
var tm = 10;	// setTimeout 수행 시간. 점차 증가.
function start(){
	settingMap();	// 음식점 좌표정보 세팅
	
	//현재 초기 위치 선언(씨티센터타워)
	let x = 37.564378723742;
	let y = 126.990358289779;
	
	// 음식점 키워드
	let foodKeyword = 'FD6';

	// 맵 컨테이너 생성
	var container = document.getElementById('map');
	// 맵 기본정보 세팅
	var options = {
		center: new kakao.maps.LatLng(x, y),	// 중심좌표 위치
		draggable: false,						// 드래그 여부
		level: 2								// 확대 레벨. 작을수록 중심 확대
	};
	// 맵 생성
	map = new kakao.maps.Map(container, options);
	// 맵 제약조건 기술
	mapCheckOption();
	// 맵에 원 생성
	mapMakeCircle(x,y);
	// 다시하기 버튼 영역 생성
	mapMakeReStartButton();
	// 카테고리로 음식점을 검색합니다
	categorySearch(foodKeyword);
	
}

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
		keywordResultArr = keywordResultArr.concat(data);
		cnt++;
		if(cnt/3 == mapArrs.length) doMarker();	// 음식점의 정보를 모두 받아오면 마커 실행
    }
}

function categorySearch(keyword){
	// 장소 검색 객체를 생성합니다
	var ps = new kakao.maps.services.Places();
	// 최대 45개 갯수제한으로 인해 위치별 3페이지를 항상 수행합니다. 한페이지당 15개씩
	mapArrs.forEach(function(e){
		ps.categorySearch(keyword, placesSearchCB, {x:e.x, y:e.y, radius:60, page:1});
		ps.categorySearch(keyword, placesSearchCB, {x:e.x, y:e.y, radius:60, page:2});
		ps.categorySearch(keyword, placesSearchCB, {x:e.x, y:e.y, radius:60, page:3});

	});

}

function doMarker(){
	shuffleArray(keywordResultArr);

	for (var i=0; i<keywordResultArr.length; i++) {
		// 순서대로 마커가 찍히도록 클로저 방식으로 수행
		 (function(x){
		    setTimeout(function(){
		    	displayMarker(keywordResultArr[x], 10*x, x, keywordResultArr.length);
				tm += 1;
		    }, tm*x);
		})(i);
     }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place, time, count, arrLen) {
	// 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });
 	// 순서대로 마커가 사라지도록 클로저 방식으로 수행
	(function(x){
	    setTimeout(function(){
	    	if((count+1) != arrLen){
	    		x.setMap(null);
	    	}else {
				displayPlaceInfo(place);
				lastMaker = x;
				isEnd = true;
	
		    }
	    }, time);
	})(marker);

 	// 마커와 검색결과 항목을 클릭 했을 때
    // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        displayPlaceInfo(place);
    });

}

// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
function displayPlaceInfo (place) {
	// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
	var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
	    contentNode = document.createElement('div') // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 

	// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
	contentNode.className = 'placeinfo_wrap';
	// 커스텀 오버레이 컨텐츠를 설정합니다
	placeOverlay.setContent(contentNode); 
	
	var content = '<div class="placeinfo">' +
                    '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   

    if (place.road_address_name) {
        content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                    '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
    }  else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }                
   
    content += '    <span class="tel">' + place.phone + '</span>' + 
                '</div>' + 
                '<div class="after"></div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
    lastOverlay = placeOverlay;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// 현재 중심좌표 맵에 대한 제약사항 기술
function mapCheckOption(){
	map.setZoomable(false);	// 마우스 휠 확대 축소 금지
	// 마우스 더블클릭을 이용한 확대 방지
	kakao.maps.event.addListener(map, 'dblclick', function(mouseEvent) {
	    mouseEvent.stopPropagation();
	});
}

// 현재 중심좌표 맵에 원 생성
function mapMakeCircle(x, y){
	// 지도에 표시할 원을 생성합니다
	var circle = new kakao.maps.Circle({
	    center : new kakao.maps.LatLng(x, y),  // 원의 중심좌표 입니다 
	    radius: 300, // 미터 단위의 원의 반지름입니다 
	    strokeWeight: 2, // 선의 두께입니다 
	    strokeColor: '#75B8FA', // 선의 색깔입니다
	    strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
	    strokeStyle: 'dashed', // 선의 스타일 입니다
	    fillColor: '#CFE7FF', // 채우기 색깔입니다
	    fillOpacity: 0.5  // 채우기 불투명도 입니다   
	}); 

	// 지도에 원을 표시합니다 
	circle.setMap(map);
}

// 주소로 좌표 알아내기
function getLocByAddr(addr){
	var geocoder = new kakao.maps.services.Geocoder();

	var callback = function(result, status) {
	    if (status === kakao.maps.services.Status.OK) {
	        console.log(result);
	    }
	};

	geocoder.addressSearch(addr, callback);
}

// 맵 화면으로 이동
function goStart(){
	location.href = "map.html";
}

// 음식점 정보 세팅(씨티센터타워 주변 17구역)
function settingMap(){
	var object = new Object();
	//서울 중구 을지로 100
	object.x = 126.988142568678;
	object.y = 37.5656490167105;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 을지로 110-1
	object.x = 126.990158299018;
	object.y = 37.5660201420261;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 을지로 124
	object.x = 126.991579946841;
	object.y = 37.5661128743674;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 삼일대로 340
	object.x = 126.988184543647;
	object.y = 37.5650467951083;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 마른내로 17-1
	object.x = 126.989791481314;
	object.y = 37.5649782890831;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 을지로12길 25-1
	object.x = 126.990933871981;
	object.y = 37.5650901058613;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 을지로14길 30
	object.x = 126.991992540539;
	object.y = 37.5648872780707;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 충무로4길 3
	object.x = 126.99297974561;
	object.y = 37.5650738471098;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 삼일대로 330
	object.x = 126.988433093681;
	object.y = 37.5643829657043;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 수표로 31
	object.x = 126.989788102677;
	object.y = 37.5640245842535;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 수표로12길 12
	object.x = 126.990837114381;
	object.y = 37.5640182732537;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 수표로12길 32
	object.x = 126.991851727652;
	object.y = 37.5639166251513;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 충무로 30-2
	object.x = 126.993113869606;
	object.y = 37.5638842696444;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 삼일대로8길 5
	object.x = 126.989301574865;
	object.y = 37.5628118900846;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 수표로6길 2-1
	object.x = 126.990562012582;
	object.y = 37.5626918046348;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 수표로6길 24
	object.x = 126.991654119668;
	object.y = 37.5627669398966;
	mapArrs.push(object);
	object = new Object();
	//서울 중구 수표로 12
	object.x = 126.990614468404;
	object.y = 37.5622814048809;
	mapArrs.push(object);
}

// 지도 내 다시하기 버튼 영역
function mapMakeReStartButton(){

	// 커스텀 오버레이에 표시할 내용입니다     
	// HTML 문자열 또는 Dom Element 입니다 
	var content = '<div id="menuBall2" class="menuBall"><a href="#" class="ball redball" onclick="reStart();" data-toggle="popover" data-placement="top" data-content="실행이 종료되면 클릭해 주세요."><div class="menuText">다시하기!!</div></a></div>';

	// 커스텀 오버레이가 표시될 위치입니다 
	var position = new kakao.maps.LatLng(37.5627425819514, 126.994132068307);  

	// 커스텀 오버레이를 생성합니다
	var customOverlay = new kakao.maps.CustomOverlay({
	    position: position,
	    content: content   
	});

	// 커스텀 오버레이를 지도에 표시합니다
	customOverlay.setMap(map);
	
	$('[data-toggle="popover"]').popover();	// 툴팁 보이기
}

// 다시하기(카카오api 호출횟수를 소비하지 않는다)
function reStart(){
	
	// 실행중 여부 체크
	if(!isEnd){
		$('[data-toggle="popover"]').popover();	// 툴팁 보이기
		return false;
	}else {
		$('[data-toggle="popover"]').popover('dispose');	// 툴팁 없애기
		isEnd = false;
	}
	
	// 데이터 초기화 후 수행
	tm = 10;
	lastMaker.setMap(null);
	lastOverlay.setMap(null);
	
	doMarker();	// 마커 실행
}


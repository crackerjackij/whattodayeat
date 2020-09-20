<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>Kakao 지도 시작하기</title>
	<link rel="stylesheet" href="/css/map.css">
</head>
<body>
	<div id="map" style="width:100%;height:100%;position:absolute;"></div>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=yourKey&libraries=services,clusterer,drawing"></script>
	<script>
		// 현재 초기 위치 선언
		let x = 37.564378723742;
		let y = 126.990358289779;
		// 음식점 키워드
		let foodKeyword = 'FD6';

		var tm = 100;

		// 맵 컨테이너 생성
		var container = document.getElementById('map');
		// 맵 기본정보 세팅
		var options = {
			center: new kakao.maps.LatLng(x, y),	// 중심좌표 위치
			draggable: false,						// 드래그 여부
			level: 2								// 확대 레벨. 작을수록 중심 확대
		};
		// 맵 생성
		var map = new kakao.maps.Map(container, options);

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

		// 카테고리로 음식점을 검색합니다
		var page = 1;
		categorySearch(foodKeyword, page);

		// 키워드 검색 완료 시 호출되는 콜백함수 입니다
		// 현재 카카오 정책 상 최대 45개 한계.
		var keywordResultArr = new Array();
		function placesSearchCB (data, status, pagination) {
		    if (status === kakao.maps.services.Status.OK) {
				keywordResultArr = keywordResultArr.concat(data);
				console.log("음식점 개수 : " + keywordResultArr.length);
				if(pagination.hasNextPage){
					page += 1;
					categorySearch(foodKeyword, page);
				}else {
					shuffleArray(keywordResultArr);	// 랜덤 정렬
					
					for (var i=0; i<keywordResultArr.length; i++) {
						// 순서대로 마커가 찍히도록 클로저 방식으로 수행
						 (function(x){
						    setTimeout(function(){
						    	displayMarker(keywordResultArr[x], tm*x, x, keywordResultArr.length);
								tm += 1;
						    }, tm*x);
						})(i);
			        }
				}
		    }
		}

		function categorySearch(keyword, page){
			// 장소 검색 객체를 생성합니다
			var ps = new kakao.maps.services.Places(map);
			
			ps.categorySearch(keyword, placesSearchCB, {useMapCenter:true, radius:300, page:page});
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
// console.log("coun : "+count+"  ,  arr : " + arrLen);
			    	if((count+1) != arrLen){
				    	x.setMap(null);
			    	}else {
						displayPlaceInfo(place);

				    }
			    }, time);
			})(marker);

		 	// 마커와 검색결과 항목을 클릭 했을 때
            // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
		    kakao.maps.event.addListener(marker, 'click', function() {
                displayPlaceInfo(place);
            });

		}

		// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
		var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
		    contentNode = document.createElement('div') // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 

		// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
		contentNode.className = 'placeinfo_wrap';
		// 커스텀 오버레이 컨텐츠를 설정합니다
		placeOverlay.setContent(contentNode); 
		
		// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
		function displayPlaceInfo (place) {
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
		}

		// 지도에 클릭 이벤트를 등록합니다
		// 마커를 제외한 부분을 클릭하면 떠있는 커스텀 오버레이가 없어집니다.
		kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
// 			placeOverlay.setMap(null); 
		});

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
		
	</script>
</body>
</html>
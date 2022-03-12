# 오늘뭐먹지?
점심에 항상 뭘 먹을지 고민하는일이 반복되서 회사 주변 식당중 한곳을 랜덤으로 선정
카카오의 지도 정보 제공이 호출 시 15회로 제한됨에 따라 회사 주변 영역을 반복적으로 호출하여
반경에 있는 식당을 조회. 따라서 현재는 서울 중구 수표로 34 주변만 조회 됨
본인의 회사를 주변을 조회하고자 하면 소스 내 getLocByAddr 함수를 호출하여 주소를 좌표로 변화한다음
주소 좌표목록을 갱신처리 해야함

# Demo
https://crackerjackij.github.io/whattodayeat/

# 준비사항
카카오API KEY필요(아래 사이트 참조하여 api 키 발급)
https://apis.map.kakao.com/web/guide/ 

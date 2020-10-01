<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>오늘 뭐먹지?</title>
	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/map.css">
</head>
<body onload="start();">
	<div id="map" style="width:100%;height:100%;position:absolute;"></div>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=yourKey&libraries=services,clusterer,drawing"></script>
	<script type="text/javascript" src="/js/map.js"></script>
</body>
</html>
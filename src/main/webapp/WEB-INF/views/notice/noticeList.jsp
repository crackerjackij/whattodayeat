<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
<script src="/js/vue.js"></script>
<script src="/js/jquery-3.5.1.min.js"></script>
</head>
<body>
<div id="app">
  <ul id="example-1">
	  <li v-for="result in resultList">
	    {{ result.EMPLOYEE_NO }}
	  </li>
	</ul>
	<button @click="searchBtn()">버튼</button>
</div>

<script src="/js/notice.js"></script>
</body>
</html>
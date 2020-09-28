<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>오늘 뭐먹지?</title>
<link rel="stylesheet" href="/css/bootstrap.min.css">
<style>

@import url(//fonts.googleapis.com/earlyaccess/jejuhallasan.css);
body,
html {
  background: radial-gradient(circle, #fffc00 0%, #f0ed17 100%);
  height: 100%;
}

.txt {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
          justify-content: center;
  -webkit-box-align: center;
          align-items: center;
  font-family: 'Jeju Hallasan', cursive;
  height: 70%;
}

h1 {
  margin: 0;
  font-size: 8em;
  padding: 0;
  color: white;
  text-shadow: 0 0.1em 20px black, 0.05em -0.03em 0 black, 0.05em 0.005em 0 black, 0em 0.08em 0 black, 0.05em 0.08em 0 black, 0px -0.03em 0 black, -0.03em -0.03em 0 black, -0.03em 0.08em 0 black, -0.03em 0 0 black;
}
h1 span {
  -webkit-transform: scale(0.9);
          transform: scale(0.9);
  display: inline-block;
}
h1 span:first-child {
  -webkit-animation: bop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
          animation: bop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
}
h1 span:last-child {
  -webkit-animation: bopB 1s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
          animation: bopB 1s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
}

@-webkit-keyframes bop {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  50%,
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

@keyframes bop {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  50%,
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@-webkit-keyframes bopB {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  80%,
  100% {
    -webkit-transform: scale(1) rotateZ(-3deg);
            transform: scale(1) rotateZ(-3deg);
  }
}
@keyframes bopB {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  80%,
  100% {
    -webkit-transform: scale(1) rotateZ(-3deg);
            transform: scale(1) rotateZ(-3deg);
  }
}



</style>
</head>
<body>
<script type="text/javascript" src="/js/map.js"></script>
<div class="txt">
<h1>
<span>"오늘</span><span>뭐먹지?"</span>
</h1>
</div>

<div class="txt" style="height:30%;align-items:baseline;">
	<button type="button" class="btn btn-danger btn-lg" style="font-size:2.25rem;" onclick="goStart();">시작</button>
</div>

</body>
</html>
var app = new Vue({
  el: '#app',
  data: {
    resultList: []
  },
  methods: {
	  searchBtn: function(){
		  console.log("asss");
		  var vm = this;
		  $.ajax({
			  method: "GET",
			  url: "/notice/list",
			  data: ""
			}).done(function( response ) {
			    vm.resultList = response.model;
			  });
	  }
  }
});
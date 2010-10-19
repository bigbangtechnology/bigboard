$(document).ready(function(){
	app.setup(window);
	
	//add the main view
	$(document.body).html(appView.el);
});

var app = new BigBoard();
var appView = new BigBoardView({
	model: app
});
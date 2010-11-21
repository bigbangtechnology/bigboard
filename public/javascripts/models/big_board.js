var BigBoard = Backbone.Model.extend(function(){
	//private
	
	return {
		/*
			Sets up the event bus and listens for events
		*/
		setup: function(window) {
			this.log("Initializing Big Board");

			// save initial properties
			this.window = window;
			this.updateBoardName();

			//get set up
			this.setupEventListeners();
		},
		
		updateBoardName: function() {
		  var boardName = this.processHash(this.window.location.hash);
		  		  		  
		  this.log("Updating board name to " + boardName);
		  
			this.set({ boardName: boardName });	
		},
		
		processHash: function(boardNameWithHash) {
		  var boardNameWithoutHash = boardNameWithHash.slice(1, boardNameWithHash.length);
		  var processedHash = boardNameWithoutHash.split(".").join("_");
		  
			return processedHash;
		},
		
		setupEventListeners: function() {
			$(this.window).bind("hashchange", _.bind(this.hashChangeEventListener, this))
		},
		
		hashChangeEventListener: function(event) {
			this.updateBoardName();
		},
		
		loadBoard: function(boardName) {
      this.window.location.hash = boardName;
		},
		
		logout: function() {
		  this.window.location.hash = "";
		},
		
		log: function(str) {
		  if (window['console'])
			  console.log(str);
		}
	}
}());
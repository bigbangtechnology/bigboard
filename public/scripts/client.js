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
			this.set({ boardName: this.processHash(this.window.location.hash) });

			//get set up
			this.setupEventListeners();
		},
		
		processHash: function(boardNameWithHash) {
			return boardNameWithHash.slice(1, boardNameWithHash.length);
		},
		
		setupEventListeners: function() {
			$(this.window).bind("hashchange", this.hashChangeEventListener)
		},
		
		hashChangeEventListener: function(event) {
			console.log("HASH CHANGED!");
		},
		
		log: function(str) {
			console.log(str);
		}
	}
}());
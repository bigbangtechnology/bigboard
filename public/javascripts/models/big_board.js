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
			this.set({ boardName: this.processHash(this.window.location.hash) });	
			this.log("Updating board name to " + this.get('boardName'));
		},
		
		processHash: function(boardNameWithHash) {
			return boardNameWithHash.slice(1, boardNameWithHash.length);
		},
		
		setupEventListeners: function() {
			$(this.window).bind("hashchange", _.bind(this.hashChangeEventListener, this))
		},
		
		hashChangeEventListener: function(event) {
			this.updateBoardName();
		},
		
		log: function(str) {
			console.log(str);
		}
	}
}());
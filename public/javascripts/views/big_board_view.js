var BigBoardView = Backbone.View.extend(function() {
  
  //private
  var currentState, taskStore, taskStoreView;   
  
  return {
    
    states: {
      NO_BOARD_SELECTED: "no_board_selected",
      BOARD_SELECTED: "board_selected",
      
      transitions: {
        "board_selected": function() {
          taskStore = new TaskStore();
          taskStoreView = new TaskStoreView({
            model: taskStore
          });

          //add a fake task
          taskStore.add([
            { description: "A task" },
            { description: "Another task" },
            { description: "And yet another task" }
          ]);
        }
      }
    },
  
    events: {
      "click .no_board_selected input[type=submit]" : "submitBoard"
    },
	
    initialize: function() {
    	this.model.bind('change', _.bind(this.render, this));
    },

    render: function() {
      this.log("Rendering Big Board View");
      
      this.updateState();
  
      $(this.el).html(this.template(this.model.toJSON()));
      
      // add the task store view
      this.$('#taskStoreView').append(taskStoreView.el);
    
      this.handleEvents();
    
      return this;
    },
    
    updateState: function() {	  
      $(this.el).removeClass();
  
      var boardName = this.model.get('boardName');
      var state;
  
      if (boardName == undefined || boardName == null) {
        this.transitionTo(this.states.NO_BOARD_SELECTED);
      } else {
        this.transitionTo(this.states.BOARD_SELECTED);
      }
  
      $(this.el).addClass(currentState);
    },
  
    /**
      Transitions to the current state. If there are any transition callbacks defined
      they will be called in the scope of the instance
    **/
    transitionTo: function(stateName) {
      currentState = stateName;
      
      if (this.states.transitions.hasOwnProperty(stateName)) {
        this.states.transitions[stateName].call(this);
      }
    },

    template: function(json) {		
    	return JST['application_' + currentState ](json);
    },
  
    submitBoard: function() {
      var boardName = this.$('input[type=text]').val();  
      this.model.loadBoard(boardName);
    },

    log: function(str) {
    	console.log(str);
    }
  }	
}());
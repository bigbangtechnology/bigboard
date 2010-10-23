var BigBoardView = Backbone.View.extend(function() {
  
  //private
  var currentState, taskStore, taskStoreView;
  
  var transitions = {
    "board_selected": {
      "enter_state": function() {
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
      },
    
      "render_state": function() {
        this.$('#taskStoreView').append(taskStoreView.el);
      }          
    }
  }
  
  return {
    
    states: {
      NO_BOARD_SELECTED: "no_board_selected",
      BOARD_SELECTED: "board_selected"
    },
  
    events: {
      "click .no_board_selected input[type=submit]" : "submitBoard",
      "click .logout" : "logout"
    },
	
    initialize: function() {
    	this.model.bind('change', _.bind(this.render, this));
    },

    render: function() {
      this.log("Rendering Big Board View");
      
      this.updateState(function(){
        $(this.el).html(this.template(this.model.toJSON()));
      });          
    
      this.handleEvents();
    
      return this;
    },
    
    updateState: function(callback) {	  
      $(this.el).removeClass();
  
      var boardName = this.model.get('boardName');
      var state;
  
      if (boardName == undefined || boardName == null) {
        currentState = this.states.NO_BOARD_SELECTED;        
      } else {
        currentState = this.states.BOARD_SELECTED;
      }
      
      $(this.el).addClass(currentState);
      this.executeTransition("enter_state");
      
      if (callback instanceof Function) {
        callback.call(this);
      }
      
      this.executeTransition("render_state");
    },
    
    executeTransition: function(transitionName) {
      if (this.hasTransition(transitionName)) {
        transitions[currentState][transitionName].call(this);
      }
    },
    
    hasTransition: function(transitionName) {
      if (transitions.hasOwnProperty(currentState) && transitions[currentState].hasOwnProperty(transitionName)) {
        return true;
      } else {
        return false;
      }
    },

    template: function(json) {		
    	return JST['application_' + currentState ](json);
    },
  
    submitBoard: function() {
      var boardName = this.$('input[type=text]').val();  
      this.model.loadBoard(boardName);
    },
    
    logout: function() {
      this.model.logout();
    },

    log: function(str) {
    	console.log(str);
    }
  }	
}());
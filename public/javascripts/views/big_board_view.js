var BigBoardView = Backbone.View.extend(Stately).extend(function() {  
  //private
  ENTER_KEY_CODE = 13;
  
  var taskStore, taskStoreView;
  
  return {
    transitions : {
      board_selected: {
        before_transition: function() {
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

        after_transition: function() {
          this.$('#taskStoreView').append(taskStoreView.el);
        }          
      }
    },    
    
    states: {
      NO_BOARD_SELECTED: "no_board_selected",
      BOARD_SELECTED: "board_selected"
    },
  
    events: {
      "click .no_board_selected input[type=submit]" : "submitBoard",
      "click .logout" : "logout",
      "keypress .board_selected input[type=text]" : "keyPressListener"
    },
	
    initialize: function() {
    	this.model.bind('change', _.bind(this.render, this));
    },

    render: function() {
      this.log("Rendering Big Board View");
      
      this.revalidateState(function() {
        $(this.el).html(this.template(this.model.toJSON()));
      });          
    
      this.handleEvents();
    
      return this;
    },
    
    getState: function() {
      var boardName = this.model.get('boardName');
      var state;
      
      if (boardName == undefined || boardName == null) {
        return this.states.NO_BOARD_SELECTED;        
      } else {
        return this.states.BOARD_SELECTED;
      }
      
    },

    template: function(json) {		
    	return JST['application_' + this.currentState ](json);
    },
  
    submitBoard: function() {
      var boardName = this.$('input[type=text]').val();  
      this.model.loadBoard(boardName);
    },
    
    logout: function() {
      this.model.logout();
    },
    
    keyPressListener: function(event) {
      if (event.which == ENTER_KEY_CODE) {
        this.createTask();
      }
    },
    
    createTask: function() {
      var inputEl = this.$('input[type=text]');
      var description = inputEl.val();
      
      taskStore.add({
        description: description
      });
      
      inputEl.val('');
    },

    log: function(str) {
    	console.log(str);
    }
  };	
}());
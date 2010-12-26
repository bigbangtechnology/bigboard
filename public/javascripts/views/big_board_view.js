var BigBoardView = Backbone.View.extend(Stately).extend(function() {  
  //private
  var ENTER_KEY_CODE = 13;

  var taskStore, taskStoreView;
  
  var taskStoreWatcher;
  
  var socket;
  
  return {
    getTaskStore: function() {
      return taskStore;
    },
    
    transitions : {
      board_selected: {
        before_transition: function() {
          taskStore = new TaskStore();
          taskStore.board = this.model.get('boardName');
          
          taskStoreView = new TaskStoreView({
            model: taskStore
          });          
          
          //go get the initial tasks
          taskStore.loading = true;

          taskStore.fetch({
            success:function(store) {
              // let the view know that the model is finished loading 
              store.loading = false;
              store.trigger('loadingChange');
            }
          });
        },

        after_transition: function() {
          this.$('#taskStoreView').append(taskStoreView.el);
          
          taskStoreView.render();
          
          this.connect();
        }          
      }
    },    
    
    connect: function() {
      socket.subscribe(this.model.get('boardName'));
  	  socket.bind('task-create', _.bind(this.taskCreatedEventListener, this));	
  	  socket.bind('task-update', _.bind(this.taskUpdatedEventListener, this));
  	  socket.bind('task-destroy', _.bind(this.taskDestroyedEventListener, this));
  	  socket.bind('pusher:connection_established', function(evt) {
        GLOBAL_SOCKET_ID = evt.socket_id;
  	  });
    },
    
    taskCreatedEventListener: function(task) {
      taskStore.add(new Task(task));
    },
    
    taskUpdatedEventListener: function(task) {
      taskStore.updateTask(task)
    },
    
    taskDestroyedEventListener: function(task) {
      taskStore.removeTask(task);
    },
    
    disconnect: function() {
      socket.unsubscribe(this.model.get('boardName'));
      socket.disconnect();
    },
    
    states: {
      NO_BOARD_SELECTED: "no_board_selected",
      BOARD_SELECTED: "board_selected",
      BROWSER_INCOMPATIBLE: "browser_incompatible"
    },
  
    events: {
      "click .no_board_selected input[type=submit]" : "submitBoard",
      "click .logout" : "logout",
      "keypress .board_selected input[type=text]" : "keyPressListener",
      "click .clearCompleted" : "clearCompletedListener",
      "confirm .clearCompleted" : "clearCompletedConfirmListener",
      "cancelConfirm .clearCompleted" : "clearCompletedCancelListener"
    },
	
    initialize: function() {
    	this.model.bind('change', _.bind(this.render, this));
      socket = new Pusher('d63e6e0bfa04a9adb62a');
    },

    render: function() {
      this.log("Rendering Big Board View");
      
      this.revalidateState(function() {
        $(this.el).html(this.template(this.model.toJSON()));
      });
      
      this.processComponents();
    
      return this;
    },
    
    processComponents: function() {
      this.$('.confirmButton').confirmButton({
        showEffect: 'slideDown',
        hideEffect: 'slideUp'
      });
    },
    
    getState: function() {
      var boardName = this.model.get('boardName');
      var state;    
      
      if (!this.browserCompatible())
        return this.states.BROWSER_INCOMPATIBLE;      
      
      if (boardName == undefined || boardName == null || boardName == "") {
        return this.states.NO_BOARD_SELECTED;        
      } else {
        return this.states.BOARD_SELECTED;
      }
      
    },
    
    browserCompatible: function () {
      var compatible = true;
      
      if (!Modernizr.websockets)
          compatible = false;
          
      return compatible;
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
      
      this.disconnect();
    },
    
    keyPressListener: function(event) {
      if (event.which == ENTER_KEY_CODE) {
        this.createTask();
      }
    },
    
    createTask: function() {
      var inputEl = this.$('input[type=text]');
      var description = inputEl.val();

      var task = new Task({ 
        description: description, 
        board: this.model.get('boardName')
      });
      
      //get the previous day value
      var lastTask = taskStore.last();
      
      // set the task day
      task.setDayBasedOn(lastTask);
      
      taskStore.add(task);
      
      task.save();
      
      inputEl.val('');
    },
    
    clearCompletedConfirmListener: function() {
      $(this.el).addClass("clearing");
    },
    
    clearCompletedCancelListener: function() {
      $(this.el).removeClass("clearing");
    },
    
    clearCompletedListener: function() {
      $(this.el).removeClass("clearing");
      // change all completed tasks to cleared
      taskStore.clearCompleted();
    },    
    
    log: function(str) {
      if (window['console'])
        console.log(str);
    }
  };	
}());
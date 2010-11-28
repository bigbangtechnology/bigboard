var TaskStoreView = Backbone.View.extend(Stately).extend(function() {
  var taskViews = [];
  
  return {    
    tagName: "ul",
    
    transitions : {
      no_items: function() {
        $(this.el).html(JST['no_items']());
      },

      loading: function() {
        $(this.el).html(JST['loading']());
      },
      
      normal: function() {
        this.taskViews = this.model.getTaskViews();

        _.each(this.taskViews, function(taskView) {
          $(this.el).append(taskView.el);
        }, this);    
        
        this.createTasksRemaining();
      }
    },    
    
    states: {
      NO_ITEMS: "no_items",
      LOADING: "loading",
      NORMAL: "normal",
      EDITABLE: "editable"
    },
    
    initialize: function() {
    	this.model.bind('add', _.bind(this.renderNew, this));
    	this.model.bind('remove', _.bind(this.render, this));
    	this.model.bind('refresh', _.bind(this.render, this));
    	this.model.bind('loadingChange', _.bind(this.render, this));
    	this.model.bind('taskToggled', _.bind(this.updateTasksRemaining, this));
    	this.model.bind('editableChange', _.bind(this.editableChangeListener, this));
    },
    
    render: function() {      
      this.log("Rendering Task Store View");
      
      $(this.el).empty();
      
      this.revalidateState();

      return this;
    },
    
    renderNew: function() {
      if (this.getState() == this.currentState) {
        var newTask = this.model.getLatestTaskView();
        
        $(this.el).append(newTask.el);
        
        $.scrollTo('#taskStoreView li:last', 250, {
          offset: { y : 60 }
        });
        
        $(newTask.el).hide().fadeIn(250);
        
        this.updateTasksRemaining();        
      } else {
        this.render();
      }
    },
    
    getState: function() {
      if (this.model.loading == true) {
        return this.states.LOADING;        
      } else if (this.model.size() == 0) {
        return this.states.NO_ITEMS;
      } else  {
        return this.states.NORMAL;
      }
    },
    
    log: function(str) {
      if (window['console'])
        console.log(str);
    },
    
    createTasksRemaining: function() {
      $('#tasksRemaining').remove();
      
      $(this.el).after("<p id='tasksRemaining'><span class='numTasks'>0</span> <span class='tasksNoun'>Tasks</span> Remaining</p>");        
      
      this.updateTasksRemaining();
    },
    
    updateTasksRemaining: function() {
      var tasksNoun = "";
      var numTasks = this.model.numRemainingTasks();
      
      if (numTasks == 1) {
        tasksNoun = "Task";
      } else {
        tasksNoun = "Tasks";
      }
      
      $('.numTasks').html(numTasks);
      $('.tasksNoun').html(tasksNoun);
    },
    
    editableChangeListener: function() {            
      $(this.el).toggleClass(this.states.EDITABLE);
    }
  };
}());
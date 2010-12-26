var TaskView = Backbone.View.extend(Stately).extend(function() {
  
  return {
    controlsVisible: false,
    
    tagName: "li",
    
    states: {
      COMPLETED: "completed",
      STARTED: "started"
    },
    
    events: {
      "click .description" : "toggleStatus",
      "click .deleteTask" : "deleteTaskListener"
    },
    
    initialize: function() {
    	this.model.bind('change', _.bind(this.render, this));
    	
    	this.render();
    },
    
    render: function() {
      
      this.revalidateState(function() {
        $(this.el).html(this.template(this.model.toJSON())).addClass("day" + this.model.get('day'));        
      });
      
      this.processComponents();      
      this.delegateEvents();
      
      $(this.el).swipe({ 
        swipeRight: _.bind(this.swipedTaskListener, this) 
        swipeLeft:  _.bind(this.swipedTaskListener, this)
      });
      
      return this;
    },
        
    processComponents: function() {
      this.$('.confirmButton').confirmButton();
    },
    
    getState: function() {
      return this.model.get('status');
    },
    
    template: function(json) {		
    	return JST['task_view'](json);
    },
    
    toggleStatus: function() {
      this.model.toggleStatus();
    },
    
    deleteTaskListener: function() {
      this.model.destroy();
      this.model.collection.remove(this.model);
    },
    
    swipedTaskListener: function() {
      if (!this.controlsVisible) {
        $(this.el).addClass('editable');
        this.controlsVisible = true;  
        $(document).bind('touchstart', _.bind(this.swipedTaskCancelListener, this));
      } else {
        $(this.el).removeClass('editable');
        this.controlsVisible = false;
        $(document).unbind('touchstart');
      }
    },
    
    swipedTaskCancelListener: function(event) {
      if ($(event.target).parent('.controls').length == 0) {
        this.swipedTaskListener();
      }          
    }
  };
}());
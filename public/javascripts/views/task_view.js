var TaskView = Backbone.View.extend(Stately).extend(function() {
  
  return {
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
      
      return this;
    },
        
    processComponents: function() {
      this.$('.confirmButton').confirmButton({
        showEffect: 'fadeIn',
        hideEffect: 'fadeOut'
      });
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
    } 
  };
}());
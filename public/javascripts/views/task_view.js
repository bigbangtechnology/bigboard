var TaskView = Backbone.View.extend(Stately).extend(function() {
  
  return {
    tagName: "li",
    
    states: {
      COMPLETED: "completed",
      STARTED: "started"
    },
    
    events: {
      "click" : "toggleStatus",
    },
    
    initialize: function() {
    	this.model.bind('change', _.bind(this.render, this));
    	
    	this.render();
    },
    
    render: function() {
      
      this.revalidateState(function() {
        $(this.el).html(this.template(this.model.toJSON())).addClass("day" + this.model.get('day'));        
      });
      
      return this;
    },
    
    getState: function() {
      return this.model.get('status');
    },
    
    template: function(json) {		
    	return JST['task_view'](json);
    },
    
    toggleStatus: function() {
      this.model.toggleStatus();
    }
  };
}());
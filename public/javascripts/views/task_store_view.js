var TaskStoreView = Backbone.View.extend(Stately).extend(function() {
  var taskViews = [];
  
  return {    
    tagName: "ul",
    
    transitions : {
      no_tasks: {},
      tasks_loading: {},
      tasks_loaded: {}
    },    
    
    initialize: function() {
    	this.model.bind('add', _.bind(this.render, this));
    	this.model.bind('refresh', _.bind(this.render, this));
    },
    
    render: function() {
      $(this.el).empty();
      
      this.taskViews = this.model.getTaskViews();
      
      _.each(this.taskViews, function(taskView) {
        $(this.el).append(taskView.el);
      }, this);

      return this;
    },
    
    template: function(json) {		
    	return JST['task_store_view'](json);
    }    
  };
}());
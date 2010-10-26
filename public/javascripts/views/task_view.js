var TaskView = Backbone.View.extend(function() {
  
  return {
    tagName: "li",
    
    initialize: function() {
    	this.model.bind('change', _.bind(this.render, this));
    	
    	this.render();
    },
    
    render: function() {
      $(this.el).html(this.template(this.model.toJSON())).addClass("day" + this.model.get('day'));
      
      return this;
    },
    
    template: function(json) {		
    	return JST['task_view'](json);
    }    
  };
}());
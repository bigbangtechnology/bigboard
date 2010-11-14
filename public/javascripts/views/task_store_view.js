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
      }
    },    
    
    states: {
      NO_ITEMS: "no_items",
      LOADING: "loading",
      NORMAL: "normal"
    },
    
    initialize: function() {
    	this.model.bind('add', _.bind(this.render, this));
    	this.model.bind('remove', _.bind(this.render, this));
    	this.model.bind('refresh', _.bind(this.render, this));
    	this.model.bind('loadingChange', _.bind(this.render, this));
    },
    
    render: function() {      
      console.log("Rendering Task Store View");
      
      $(this.el).empty();
      
      this.revalidateState();      

      return this;
    },
    
    getState: function() {
      if (this.model.loading == true) {
        return this.states.LOADING;        
      } else if (this.model.size() == 0) {
        return this.states.NO_ITEMS;
      } else  {
        return this.states.NORMAL;
      }
    }    
  };
}());
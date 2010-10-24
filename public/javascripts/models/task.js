var Task = Backbone.Model.extend(function(){
  
  return {
    initialize: function() {
      this.set({
        type: 'task'
      });
    }
  };
}());
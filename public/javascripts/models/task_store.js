var TaskStore = Backbone.Collection.extend(function(){
  
  return {
    model: Task,
    
    getTaskViews: function() {
      return this.map(function(task) {
        return new TaskView({
          model: task
        });
      });
    }
  }
}());
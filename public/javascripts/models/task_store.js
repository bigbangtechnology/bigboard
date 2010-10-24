var TaskStore = Backbone.Collection.extend(function(){
  
  return {
    model: Task,
    
    url: function() {
      return COUCH_DB_URL;
    },
    
    getTaskViews: function() {
      return this.map(function(task) {
        return new TaskView({
          model: task
        });
      });
    }
  };
}());
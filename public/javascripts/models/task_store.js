var TaskStore = Backbone.Collection.extend(function(){
  
  return {
    model: Task,

    url: function() {
      return this.board + "/tasks";
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
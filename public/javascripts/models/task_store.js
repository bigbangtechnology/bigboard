var TaskStore = Backbone.Collection.extend(function(){
  
  return {
    model: Task,

    url: function() {
      return "/tasks.json?board=" + this.board;
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
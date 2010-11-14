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
    },
    
    clearCompleted: function() {
      var completedTasks = this.select(function(task) {
        return (task.get('status') == "completed")
      });
      
      _.each(completedTasks, function(task) {
        task.set({ status: "cleared" });
        task.save();        
      });
      
      this.remove(completedTasks);
      
      
    }
  };
}());
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
    
    getLatestTaskView: function() {
      return new TaskView({
        model: this.last()
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
    },
    
    taskToggled: function() {
      this.trigger('taskToggled');
    },
    
    numRemainingTasks: function() {
      var startedTasks = this.select(function(task) {
        return (task.get('status') == "started");
      });
      
      return startedTasks.length;
    }
  };
}());
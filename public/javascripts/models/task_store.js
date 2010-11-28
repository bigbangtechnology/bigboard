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
    },
    
    updateTask: function(task) {      
      this.findById(task._id).set(task);
    },
    
    removeTask: function(task) {
      var task = this.findById(task._id);
      
      this.remove(task);
    },
    
    //internal get function doesn't work on tasks which 
    //aren't loaded with an id since _byId hash hasn't
    //had a chance to register the id
    findById: function(id) {
      return this.find(function(task) {
        return task.id == id;
      });
    },
    
    toggleEditMode: function() {
      this.trigger('editableChange');
    }
  };
}());
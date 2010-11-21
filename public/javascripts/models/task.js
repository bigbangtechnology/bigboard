var Task = Backbone.Model.extend(function(){
  var DAY_TOLERANCE = 3;
    
  return {
    
    initialize: function() {
      this.id = this.get('_id');
      
      if (this.isNew()) {
        this.set({ status: "started" });
      } else {
        if (this.get('status') == undefined) {
          this.set({ status: "started" });
        }
      }
    },
    
    createdAt: function() {   
      return Date.parse(this.get('created_at')).clearTime(); // we only care about whole days
    },
    
    setDayBasedOn: function(lastTask) {
      var taskDay;      
      
      if (lastTask) {        
        var lastTaskDay = lastTask.get('day');        
        var today = Date.today().clearTime();
        
        if (Date.equals(today, lastTask.createdAt())) {
          // if the last task was created today inherit its taskDay          
          taskDay = lastTaskDay;
        } else {
          // otherwise increment the task day unless it's already
          // add the end of the tolerance, then loop back
          taskDay =  (lastTaskDay == DAY_TOLERANCE) ? 1 : lastTaskDay + 1;
        }
      } else {
        // if we can't even find a last task, just restarted the chain
        // at day one
        taskDay = 1;
      }
      
      this.set({ day: taskDay });
    },
    
    toggleStatus: function() {
      var currentStatus = this.get('status');
      var newStatus;
      
      newStatus = (currentStatus == "completed") ? "started" : "completed";
      
      this.set({ status: newStatus });

      this.save();
    }
    
  };
}());
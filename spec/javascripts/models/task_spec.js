describe("Task", function() {
  
  var sut;

  beforeEach(function() {
    // before goes here
    sut = new Task();
  });
    
   it("should set itself to to day one if the last task is null", function() {
     sut.setDayBasedOn(null);
     
     expect(sut.get('day')).toBe(1);
   });
   
   it("should set the task day to the same as the previous task if the task is on the same day", function() {
     previousTask = new Task({
       created_at: Date.today(),
       day: 1
     });
           
     sut.setDayBasedOn(previousTask);
     
     expect(sut.get('day')).toBe(1);
   });
   
   it("should set the task day to one more than the previous task day", function() {
     previousTask = new Task({
       created_at: Date.parse('yesterday'),
       day: 1
     });
     
     sut.setDayBasedOn(previousTask);
     
     expect(sut.get('day')).toBe(2);
   });
   
   it("should repeat to day one after it has reached the DAY THRESHOLD", function() {
     previousTask = new Task({
       created_at: Date.parse('yesterday'),
       day: 3
     });
     
     sut.setDayBasedOn(previousTask);
     
     expect(sut.get('day')).toBe(1);    
   });
   
   it("should start with the status of started", function() {
     expect(sut.get('status')).toBe("started");
   });
  
  it("the default status should not override any persisted status", function() {
    sut = new Task({
      status: "completed",
      _id: "123"
    });
    
    expect(sut.get('status')).toBe("completed");
  });
  
  it("should load the _id into the models' id property when loading", function() {
    sut = new Task({
      status: "completed",
      _id: "123"
    });
    
    expect(sut.id).toBe("123");
  });
  
  it("should load tasks even if the status is null from the server", function() {
    sut = new Task({
      _id: "123"
    });
    
    expect(sut.get('status')).toBe("started");
  });

});
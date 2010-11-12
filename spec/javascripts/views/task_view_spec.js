describe("Task View", function() {
  var model = new Task();
  var sut;
  
  beforeEach(function() {
    // before goes here
    sut = new TaskView({
      model: model
    });
  });
  
  it("should be in completed state when the model is completed", function() {
    model.set({ status: "completed" });
    
    expect(sut.getState()).toBe(sut.states.COMPLETED);
  });
  
  it("should be in started state when the model is started", function() {
    model.set({ status: "started" });
    
    expect(sut.getState()).toBe(sut.states.STARTED);
  });
});
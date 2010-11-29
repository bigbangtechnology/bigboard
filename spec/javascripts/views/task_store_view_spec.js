describe("Task Store View", function() {
  var model;
  var sut;
  
  beforeEach(function() {
    model = new TaskStore();
    // before goes here
    sut = new TaskStoreView({
      model: model
    });
  });
  
  it("should be in the the proper states", function() {
    model.loading = true;
    
    expect(sut.getState()).toBe(sut.states.LOADING);
    
    model.loading = false;
    
    expect(sut.getState()).toBe(sut.states.NO_ITEMS);
    
    model.add({ description: "New item" });    
    
    expect(sut.getState()).toBe(sut.states.NORMAL);
  });
  
});
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
  
  it("should render the editable class when the model dispatches the editableChange event", function() {
    expect( $(sut.el).hasClass(sut.states.EDITABLE)).toBe(false);
    
    model.trigger('editableChange');
    
    expect( $(sut.el).hasClass(sut.states.EDITABLE)).toBeTruthy();
  });
  
  
});
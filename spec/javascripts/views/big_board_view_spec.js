describe("Big Board View", function() {
  
  var app = new BigBoard();
  var sut;
  
  beforeEach(function() {
    // before goes here
    sut = new BigBoardView({
      model: app
    });
  });
  
  
  it("should render the NO_BOARD_SELECTED state when no board has been set", function() {
    expect(app.get('boardName')).toBe(undefined);
    
    sut.render();
    
    expect( $(sut.el).hasClass(sut.states.NO_BOARD_SELECTED) ).toBeTruthy();
  });
  
  it("should render the BOARD_SELECTED state when a board has been set", function() {
    app.set({ boardName: "bigbangtechnology "});
    
    sut.render();
    
    expect( $(sut.el).hasClass(sut.states.BOARD_SELECTED) ).toBeTruthy();
  });
  

});
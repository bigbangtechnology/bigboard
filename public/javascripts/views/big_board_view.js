var BigBoardView = Backbone.View.extend({
  states: {
    NO_BOARD_SELECTED: "no_board_selected",
    BOARD_SELECTED: "board_selected"
  },
  
  events: {
    "click .no_board_selected input[type=submit]" : "submitBoard"
  },
	
  initialize: function() {
  	this.model.bind('change', _.bind(this.render, this));
  },

  render: function() {
    this.updateState();
  
    $(this.el).html(this.template(this.model.toJSON()));
    
    this.handleEvents();
    
    return this;
  },

  updateState: function() {	  
    $(this.el).removeClass();
  
    var boardName = this.model.get('boardName');
    var state;
  
    if (boardName == undefined || boardName == null) {
  	this.currentState = this.states.NO_BOARD_SELECTED;
    } else {
    	this.currentState = this.states.BOARD_SELECTED;
    }
  
    $(this.el).addClass(this.currentState);
  },

  template: function(json) {		
  	return JST['application_' + this.currentState ](json);
  },
  
  submitBoard: function() {
    var boardName = this.$('input[type=text]').val();  
    this.model.loadBoard(boardName);
  },

  log: function(str) {
  	console.log(str);
  }
	
});
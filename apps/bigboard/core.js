// ==========================================================================
// Project:   BB
// Copyright: ©2010 Big Bang Technology Inc.
// ==========================================================================
/*globals BB */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/

BB = SC.Application.create(
  /** @scope BB.prototype */ {

  NAMESPACE: 'BB',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),
  
  // TODO: Add global constants or singleton objects needed by your app here.
  
  boardRoute: function(params) {
    BB.sendAction('selectBoard', params.board_param);
  }
});

BB.NO_BOARD_SELECTED = SC.Responder.create({
  selectBoard: function(board_param) {
    console.log(board_param);
    
    BB.makeFirstResponder(BB.BOARD_SELECTED);
    
    // TODO: Change the current view to the main view
    // TODO: figure out how to load data for the selected board
  }
});

BB.BOARD_SELECTED = SC.Responder.create({
  logout: function() {
    BB.makeFirstResponder(BB.NO_BOARD_SELECTED);
    
    // TODO: Switch to the 'no board selected view'
  }
});

BB.makeFirstResponder(BB.NO_BOARD_SELECTED);
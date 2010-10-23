//     (c) 2010 Cameron Westland, Big Bang Technology Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://bigbangtechnology.github.com/stately

/**
  Example:
  var MyView = Backbone.View.extend(Stately).extend({
    states: {
      EDITING: "editing",
      NORMAL: "normal"
    },
  
    transitions: {
      "editing": {
        "enter_state": function() {
          console.log("EDITING: enter_state");
        },
      
        "render_state": function() {
          console.log("EDITING: render_state");              
        }
      }
    },
  
    render: function() {
      this.revalidateState(function(){
        // render the generic view here
      });
    },
  
    getState: function() {
      if (this.currentState == this.states.EDITING) {
        return this.states.NORMAL;
      } else {
        return this.states.EDITING;
      }
    }
  });
**/

var Stately = function() {
  return {
    VERSION: "0.0.1",
    
    currentState: "",

    /**
      Revalidate state is a function that you call when you want to transition
      into a new state potentially. It takes a single callback function as argument
      which will execute once the state has been set but BEFORE the render_state function
      is called for the given state.
    **/    
    revalidateState: function(callback) {	  
      $(this.el).removeClass();

      this.currentState = this.getState();
      
      if (this.currentState == null || !(this.currentState.constructor == String)) {
        throw("getState must return a valid state");
      }

      $(this.el).addClass(this.currentState);

      this.executeTransition("enter_state");

      if (callback instanceof Function) {
        callback.call(this);
      }

      this.executeTransition("render_state");
    },

    /**
      Executes a transition by name if it is defined in the View. 
      Stately will automatically execute the enter_state and render_state
      transitions if they are declared, custom transitions can be written
      by declaring them and then running executeTransition manually
    **/
    executeTransition: function(transitionName) {
      if (this.hasTransition(transitionName)) {
        this.transitions[this.currentState][transitionName].call(this);
      }
    },

    /**
      A helper method to check to see if the transition is defined
      for the current state
    **/
    hasTransition: function(transitionName) {
      if (this.transitions.hasOwnProperty(this.currentState) && this.transitions[this.currentState].hasOwnProperty(transitionName)) {
        return true;
      } else {
        return false;
      }
    },    
    
    /**
      Sub classes must override getState and return a string. getState is called
      automatically when executing revalidateState
    **/
    getState: function() {
      // throws an error if this is not overwritten
      throw("Views must implement getState");
    }

  };        
}();
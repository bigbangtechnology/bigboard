//     (c) 2010 Cameron Westland, Big Bang Technology Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://bigbangtechnology.github.com/stately

var Stately = function() {
  return {
    VERSION: "0.0.2",
    
    currentState: "",
    
    transitions: {
      
    },

    /**
      Revalidate state is a function that you call when you want to transition
      into a new state potentially. It takes a single callback function as argument
      which will execute once the state has been set but BEFORE the render_state function
      is called for the given state.
    **/    
    revalidateState: function(callback) {
      if (this.currentState) {
        $(this.el).removeClass(this.currentState);
      }

      this.currentState = this.getState();
      
      if (this.currentState == null || !(this.currentState.constructor == String)) {
        throw("getState must return a valid state");
      }

      $(this.el).addClass(this.currentState);

      this.executeTransition("before_transition");

      if (callback instanceof Function) {
        callback.call(this);
      }

      this.executeTransition("after_transition");
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
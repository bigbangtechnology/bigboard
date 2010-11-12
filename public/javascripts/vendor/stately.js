//     (c) 2010 Cameron Westland, Big Bang Technology Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://bigbangtechnology.github.com/stately

var Stately = function() {
  return {
    VERSION: "0.0.3",
    
    currentState: "",
    
    transitions: {
      
    },

    // Call this when you want to revalidate the state. It takes a single callback function 
    // as argument which will execute once between the `before_transition` and 
    // `after_transition` functions
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
      
      // if we're using simple mode where a transition is defined
      // as a function, just execute it here
      
      if (this.transitions[this.currentState] instanceof Function) {
        this.transitions[this.currentState].call(this);
      }
      
      if (callback instanceof Function) {
        callback.call(this);
      }

      this.executeTransition("after_transition");
    },

    // Executes a transition by name if it is defined in the View. 
    // Stately will automatically execute the `before_transition` and `after_transition`
    // if they are declared, custom transitions can be written by declaring them and then 
    // running executeTransition manually
    executeTransition: function(transitionName) {
      if (this.hasTransition(transitionName)) {
        this.transitions[this.currentState][transitionName].call(this);
      }
    },

    // A helper method to check to see if the transition is defined
    // for the current state
    hasTransition: function(transitionName) {
      if (this.transitions.hasOwnProperty(this.currentState) && this.transitions[this.currentState].hasOwnProperty(transitionName)) {
        return true;
      } else {
        return false;
      }
    },    
    
    // Sub classes must override `getState` and return a string. getState is called
    // automatically when executing `revalidateState`
    getState: function() {
      // throws an error if this is not overwritten
      throw("Views must implement getState");
    }

  };        
}();
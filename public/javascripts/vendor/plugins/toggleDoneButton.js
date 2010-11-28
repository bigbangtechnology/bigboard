(function( $ ){
  $.fn.toggleDoneButton = function() {
    this.each(function() {      
      var done = false;
      var originalLabel = $(this).html();
      
      $(this).click(function() {        
        
        if (done) {
          $(this).html(originalLabel);
          done = false;
        } else {
          $(this).html("Done");
          done = true;
        }
      });
    });
  }  
})( jQuery );
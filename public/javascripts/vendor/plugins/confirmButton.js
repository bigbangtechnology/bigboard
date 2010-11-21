(function( $ ){
  $.fn.confirmButton = function() {
  this.each(function() {
    var confirmed = false;
    
    $(this).click(function() {
      if (!confirmed) {
        showConfirmation(this);
        confirmed = true;  
        $(this).trigger('confirm');      
        return false;        
      } else {
        confirmed = false;
        hideConfirmation(this);
      }
    });

    function showConfirmation(link) {
      $(link).before("<a href='Javascript:void(0)'>Cancel</a> ");
      $(link).prev('a').click(function() {
        hideConfirmation(link);        
        $(link).trigger('cancelConfirm');
        confirmed = false;        
      });
    } 

    function hideConfirmation(link) {
      $(link).prev('a').remove();
    }
  });
  };
})( jQuery );


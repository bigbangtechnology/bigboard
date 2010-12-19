(function( $ ){
  $.fn.confirmButton = function(options) {
    
  // Default thresholds & swipe functions
	var defaults = {};
	
	var options = $.extend(defaults, options);
    
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
      $(link).before("<a href='Javascript:void(0)' class='cancelButton'><span>Cancel</span></a> ");
      $(link).addClass("ready");
      
      if (options.showEffect) {
        $(link).prev('a').hide()[options.showEffect](150);
      } else {
        $(link).prev('a').show();
      }
      
      $(link).prev('a').click(function() {
        hideConfirmation(link);        
        $(link).trigger('cancelConfirm');
        confirmed = false;        
      });
    } 

    function hideConfirmation(link) {
      if (options.hideEffect) {
        $(link).prev('a')[options.hideEffect](150, function() {
          $(link).prev('a').remove();
          $(link).removeClass("ready");
        });
      } else {
        $(link).prev('a').remove();
        $(link).removeClass("ready");
      }
    }
  });
  };
})( jQuery );


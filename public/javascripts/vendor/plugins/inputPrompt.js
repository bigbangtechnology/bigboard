(function( $ ){
  $.fn.inputPrompt = function() {
    this.each(function() {
      $(this).keyup(function() {
        if ($(this).children('input').attr('value').length > 0) {
          $(this).children('label').hide();
        } else {
          $(this).children('label').show();
        }
      });
    });
  };
})( jQuery );


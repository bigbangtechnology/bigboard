var BigBoardView = Backbone.View.extend({
	
	initialize: function() {
		this.model.bind('change', _.bind(this.render, this));
	},
	
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
	},
	
	template: function(json) {		
		return JST['application'](json);
	},
	
	log: function(str) {
		console.log(str);
	}
	
});
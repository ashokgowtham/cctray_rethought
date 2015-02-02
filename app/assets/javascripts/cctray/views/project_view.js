App.Views.ProjectView = Backbone.View.extend({
	template: JST['cctray/templates/project'],

	initialize: function() {
		this.render = this.render.bind(this);
	},

	render: function() {
		return this.template({model: this.model});
	}
});

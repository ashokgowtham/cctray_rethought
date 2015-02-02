App.Views.ProjectsView = Backbone.View.extend({
	template: JST['cctray/templates/projects_view'],

	initialize: function () {
		this.render = this.render.bind(this);
	},

	render: function() {
		var projects = this.model.getProjectsForDisplay();
		this.$el.html(_.map(projects,function(project){
			return new App.Views.ProjectView({ model: project}).render();
		}).join(''));
		this.bindEvents();
	},
	bindEvents: function() {
		$('.build').on('click', function () {
			
		})
	},
});

$(function() {
	var projects = new App.Collections.Projects();
	var cctrayView = new App.Views.ProjectsView({model: projects, el: '.main-view'});

	projects.fetch({success:cctrayView.render});
	
});
$(function() {
	var projects = new App.Collections.Projects();
	var cctrayView = new App.Views.ProjectsView({model: projects, el: '.main-view'});

	var showData = function() {
		projects.fetch({success:cctrayView.render});
	};

	setInterval(showData,10000);
	showData();
});
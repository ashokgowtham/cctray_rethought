$(function() {
    var projects = new App.Collections.Projects();
    var cctrayView = new App.Views.ProjectsView({model: projects, el: '.main-view'});

    var showData = function() {
        projects.fetch({
            success: function() {
                cctrayView.render();
                setTimeout(showData,10000);
            },
            error: function () {
                cctrayView.showError("Fetch failed");
                setTimeout(showData,10000);
            }
       });
    };
    showData();
});
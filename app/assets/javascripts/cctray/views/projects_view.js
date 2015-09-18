App.Views.ProjectsView = Backbone.View.extend({
    template: JST['cctray/templates/projects'],

    initialize: function () {
        this.render = this.render.bind(this);
    },
    showError: function (errorMessage) {
        this._render([errorMessage]);
    },
    render: function() {
        this._render();
    },
    _render: function(errorMessages) {
        var projects = this.model.getProjectsForDisplay();
        var projectsData = _.map(projects,function(project){
            return new App.Views.ProjectView({ model: project}).render();
        }).join('');
        this.$el.html(this.template({
            projects: projectsData,
            messages: errorMessages
        }));
        this.bindEvents();
    },
    bindEvents: function() {
        $('.build').on('click', function () {
            
        })
    },
});

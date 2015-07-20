App.Collections.Projects = Backbone.Collection.extend({
	model: App.Models.Project,
	
	url: function() {
		return Routes.cctray_path();
	},

	getProjects: function () {
		this.projects = this.projects || new App.Collections.Projects(this.get('Projects').Project);
		return this.projects;
	},

	getProjectsForDisplay: function() {
		var compare = function(x,y) {
			if(x===y) return 0;
			return x>y ? 1 : -1;
		};
		var result = _.map(_.groupBy(this.models, function(model) {
								return model.get('name').split(' :: ')[0];
							}
						), function(group, key, collection) {
							var interestedJob = 
							_.where(group,function(model){return model.isFailing();}) || 
							_.where(group,function(model){return model.isRunning();}) ||
							group;

							return interestedJob[0];
						});
		result = result.sort(function(model1, model2) {
			var diff = model2.getPriorityIndex() - model1.getPriorityIndex();
			if (!diff) {
				diff = -compare(model1.get('lastBuildTime'),model2.get('lastBuildTime'));
			}
			return diff;
		});
		var count = _.countBy(result, function(model) {return model.isFailing()? 'failing' : 'passing'});
		for (var i = 0; i < count.failing; i++) {
			result[i].set('serialNumber',count.failing - i);
		};
		for (var i = count.failing; i < result.length; i++) {
			result[i].set('serialNumber', result.length - i);
		};
		return result;
	},

	getFailingBuildsSortedByRecentlyFailed: function() {
		_.chain(this.models)
			.where(function (model) { return model.isFailing(); })
			.where(function (model) { return model.isSleeping(); })
			.sortBy('lastBuildTime')
			.reverse()
			.value();
	},

	getRunningBuilds: function() {
		_.chain(this.models)
			.where(function (model) { return model.isFailing(); })
			.where(function (model) { return model.isBuilding(); })
			.sortBy('lastBuildTime')
			.reverse()
			.value();		
	},

	getLongTimeNoRunBuilds: function() {},

});

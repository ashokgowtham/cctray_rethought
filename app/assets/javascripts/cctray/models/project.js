App.Models.Project = Backbone.Model.extend({
	isFailing: function () {
		return this.get('lastBuildStatus')=='Failure';
	},
	isPassing: function () {
		return this.get('lastBuildStatus')=='Success';
	},
	isSleeping: function () {
		return this.get('activity')=='Sleeping';
	},
	isBuilding: function () {
		return this.get('activity')=='Building';
	},
	getPriorityIndex: function() {
		var self = this;
		var index = 0;
		var indices = {
			'lastBuildStatus=Failure':100,
			'activity=Building':10,
			'activity=Sleeping':0,
			'lastBuildStatus=Success':0
		}
		index = _.reduce(_.keys(this.attributes), function(aggr, attribute) {
			var key = attribute + '=' + self.get(attribute);
			var val = 0;
			if (key in indices) {
				val = indices[key];
			}
			return aggr + val;
		}, 0);
		return index;
	},
	getLastBuildTime: function () {
		return this.get('lastBuildTime');
	},
	getAlias: function(name) {
		var aliases = {
			'Varadharajan Mukundan' : '[V]',
			'Dhivya' : '[DD]',
			'Ashok Gowtham' : 'Mr. Go',
			'Ginette Vellera' : 'Ginette, "The Master Chef"',
			'Aswin Karthik S' : 'Ashwayne',
			'Raghavan' : 'Bruce Wayne',
			'P S Saravanan' : 'Saravanan',
			'Vijayaragavan' : 'VJ',
			'Christopher' : 'Cris',
			'tsathishkumar' : 'Sathish'
		};
		if(name in aliases) {
			name = aliases[name];
		}
		return (name || this.randomCurse()) + '';
	},
	getGoodName: function(messages) {
		name = messages ? messages.message.text : '';
		return this.getAlias(name.replace(/ \<.*\>/,''));
	},
	randomCurse: function() {
		var curses = [
			"Some one broke it",
		];
		var curseIndex = Math.floor((Math.random() * curses.length));
		return curses[curseIndex];
	},
	getBreaker: function() {
		return this.isFailing() ? (this.getGoodName(this.get('messages'))) : '';
	},
	getRetriggerCount: function() {
		var match = this.get('webUrl').match(/\/([0-9]+)$/);
		return match ? match[1] : 0;
	},
	getTimeSinceLastBuild: function() {
		return moment(this.getLastBuildTime(),'YYYY-MM-DD[T]hh:mm:ss').add(3.5, 'hours').fromNow();	//TODO: separate out the server timezone
	},
	getName: function() {
		return this.get('name').split(' :: ')[0];
	},
	getClasses: function() {
		var classes = [];
		if(this.isFailing()) { classes.push('failing'); }
		if(this.isPassing()) { classes.push('passing'); }
		if(this.isBuilding()) { classes.push('building'); }
		if(this.isSleeping()) { classes.push('sleeping'); }
		return classes.join(' ');
	}
});

o.Models.Employee = Backbone.Model.extend({
	defaults: {
		Employees : [
			{name:'Reed Rizzo', id:1, teamid:1, jobid:2},
			{name:'Tammie Babbitt', id:2, teamid:2, jobid:1},
			{name:'Elizabeth Karagitlieva', id:3, teamid:3, jobid:1},
			{name:'David Mansch', id:4, teamid:1, jobid:1},
			{name:'Kevin Mech', id:5, teamid:3, jobid:1},
			{name:'Kevin Mech', id:6, teamid:4, jobid:3},
			{name:'Kevin Mech', id:7, teamid:2, jobid:1},
			{name:'Kevin Mech', id:8, teamid:4, jobid:2},
			{name:'Kevin Mech', id:9, teamid:3, jobid:2}
		],
		Teams: [
			{name:'Design', id:1},
			{name:'CMS', id:2},
			{name:'ACG', id:3},
			{name:'Universal', id:4}
		],
		Job: [
			{name:'Designer', id:1},
			{name:'Software Engineer', id:2},
			{name:'Project Manager', id:3}
		]
	},
	initialize: function(){
		this.bind("change:Employees", function(){
			console.log('changed');
		});
	},
	bindView: function(){
		this.bind("change:Employees", function(){
			console.log('changed');
		});
	},
	byTeam : function(){
		var employees = this.get('Employees');
		var teams = this.get('Teams');

		function compare(a,b) {
			if (a.teamid < b.teamid)
				return -1;
			if (a.teamid > b.teamid)
				return 1;
			return 0;
		}

		employees.sort(compare);

		for (var i = employees.length - 1; i >= 0; i--) {
			employees[i].headername = $.grep(teams, function(e){ return e.id == employees[i].teamid; })[0].name;
		};
		
		this.set({ Employees : employees});
	}
});
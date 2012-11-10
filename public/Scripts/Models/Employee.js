o.Models.Employee = Backbone.Model.extend({
	defaults: {
		Employees : [
			{name:'Tammie Babbitt',         id:1, teamid:1, jobid:2},
			{name:'Elizabeth Karagitlieva', id:2, teamid:1, jobid:1},
			{name:'David Mansch',           id:3, teamid:1, jobid:1},
			{name:'Kevin Mech',             id:4, teamid:1, jobid:1},
			{name:'Mike Biasi',             id:5, teamid:4, jobid:1},
			{name:'Donna Gailus',           id:6, teamid:4, jobid:3},
			{name:'Larry Gasik',            id:7, teamid:4, jobid:1},
			{name:'Jeff Novak',             id:8, teamid:4, jobid:2},
			{name:'Michael Shuck',          id:9, teamid:4, jobid:2},
			{name:'Reed Rizzo',             id:10, teamid:3, jobid:2},
			{name:'Rich Pesek',             id:11, teamid:3, jobid:2},
		],
		Teams: [
			{name:'Design Team', id:1},
			{name:'CMS', id:2},
			{name:'ACG Team', id:3},
			{name:'Universal Team', id:4}
		],
		Job: [
			{name:'Designer', id:1},
			{name:'Software Engineer', id:2},
			{name:'Project Manager', id:3}
		]
	},
	initialize: function(){
		this.bind("change:Employees", function(){
			//console.log('changed');
		});
	},
	bindView: function(){
		this.bind("change:Employees", function(){
			//console.log('changed');
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
o.Models.Employee = Backbone.Model.extend({
	fetchData : function(callback){
		console.log('boom');
		
		o.socket.on('static', function (data) {
			this.set('Employees')
			this.set('Teams')
			this.set('Job')
			callback();
		});
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
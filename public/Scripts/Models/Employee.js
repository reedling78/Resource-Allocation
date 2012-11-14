o.Models.Employee = Backbone.Model.extend({
	fetchData : function(callback){
		var mod = this;
	
		o.socket.on('projects', function(data){
			console.log(data);
		});

		o.socket.on('static', function (data) {
			mod.set({ Employees: data.Employees });
			mod.set({ Teams: data.Teams });
			mod.set({ Job: data.Job });
			callback();
		});

		o.socket.emit('save', { name: 'Reed Rizzo', nickname: 'badass', color: 'color'});
	},
	initialize: function(){

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
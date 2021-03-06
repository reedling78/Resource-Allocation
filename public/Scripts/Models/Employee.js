o.Models.Employee = Backbone.Model.extend({
	fetchData : function(callback){
		var mod = this;
	
		o.socket.on('static', function (data) {
			mod.set({ Employees: data.Employees });
			mod.set({ Teams: data.Teams });
			mod.set({ Job: data.Job });
			callback();
		});

	},
	initialize: function(){

	},
	bindView: function(){
		
	},
	byTeam : function(){
		var employees = this.get('Employees');
		var teams = this.get('Teams');

		for (var i = employees.length - 1; i >= 0; i--) {
			employees[i].headername = $.grep(teams, function(e){ return e.id == employees[i].teamid; })[0].name;
		};
		
		this.set({ Employees : employees});
	}
});
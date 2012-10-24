o.Controller = Backbone.Model.extend({
	defaults: {
		
	},
	initialize: function(){

		//Build Calendar 
		var calendarModel = new o.Models.Calendar();
		//console.log(calendarModel);

		var weekView = new o.Views.WeekCollectionView({
			collection: calendarModel
		});
		weekView.render();

		var monthView = new o.Views.MonthCollectionView({
			collection: calendarModel
		});
		monthView.render();



		//Build Employees 
		var employeeModel = new o.Models.Employee();
		//console.log(employeeModel);

		var employeeView = new o.Views.EmployeeCollectionView({
			collection: employeeModel
		});
		employeeView.render();

	}
});
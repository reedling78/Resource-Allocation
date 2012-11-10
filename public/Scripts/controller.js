o.Controller = Backbone.Model.extend({
	defaults: {
		EmployeeList : [
		]
	},
	initialize: function(){

		//Build Calendar 
		var calendarModel = new o.Models.Calendar();

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

		var employeeView = new o.Views.EmployeeCollectionView({
			collection: employeeModel
		});
		employeeView.render();


		//Build Employees 
		var projectModel = new o.Models.Project();

		//Projects
		var projectCollectionView = new o.Views.ProjectCollectionView({
			collection: projectModel,
			employeeList: employeeView.collection.attributes.Employees
		});
		projectCollectionView.render();


	}
});
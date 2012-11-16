o.Controller = Backbone.Model.extend({
	defaults: {
		EmployeeList : [
		]
	},
	initialize: function(){
		o.socket = io.connect('http://klt.rizzonet.com');

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
		employeeModel.fetchData(function(){

			var employeeView = new o.Views.EmployeeCollectionView({
				collection: employeeModel
			});
			employeeView.render();

			//Build Employees 
			var projectCollectionView;
			var projectCollection = new o.Models.ProjectCollection(projectCollectionView);
			projectCollection.fetchData(function(){

				//Projects
				projectCollectionView = new o.Views.ProjectCollectionView({
					collection: projectCollection,
					employeeList: employeeView.collection.attributes.Employees
				});
				projectCollectionView.render();

			});

		});

	}
});
o.Controller = Backbone.Model.extend({
	defaults: {
		EmployeeList : [
		]
	},
	initialize: function(){
		o.socket = io.connect('http://klt.rizzonet.com');

		

		//Build Employees 
		var employeeModel = new o.Models.Employee();
		employeeModel.fetchData(function(){
			

			console.log('callback');

			var employeeView = new o.Views.EmployeeCollectionView({
				collection: employeeModel
			});
			employeeView.render();

			//Build Employees 
			var projectCollection = new o.Models.ProjectCollection();
			//projectCollection.sync();

			//Projects
			var projectCollectionView = new o.Views.ProjectCollectionView({
				collection: projectCollection,
				employeeList: employeeView.collection.attributes.Employees
			});
			projectCollectionView.render();

		});

		


	}
});
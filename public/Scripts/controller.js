o.Controller = Backbone.Model.extend({
	defaults: {
		EmployeeList : [
		]
	},
	initialize: function(){
		o.socket = io.connect('ra.keylimetie.com');

		//Build Calendar 
		o.calendarModel = new o.Models.Calendar();

		var weekView = new o.Views.WeekCollectionView({
			collection: o.calendarModel
		});
		weekView.render();

		var monthView = new o.Views.MonthCollectionView({ 
			collection: o.calendarModel
		});
		monthView.render();

		//Build Employees 
		var employeeModel = new o.Models.Employee();
		employeeModel.fetchData(function(){

			o.employeeView = new o.Views.EmployeeCollectionView({
				collection: employeeModel
			});
			o.employeeView.render();

			//Build Employees 
			

			o.socket.on('receive projects', function(data){
				console.log(o.isEditing);
				if(!o.isEditing){
					var projectCollection = new o.Models.ProjectCollection();
					projectCollection.fetchData(data, function(){

						//Projects
						o.projectCollectionView = new o.Views.ProjectCollectionView({
							collection: projectCollection, 
							employeeList: o.employeeView.collection.attributes.Employees
						});

						if(o.projectCollectionView != undefined){
							o.projectCollectionView.clearProjects();
							o.employeeView.clearEmployees();
							o.employeeView.render();
						}

						o.projectCollectionView.render();

					});
				}
			});
			o.socket.emit('get projects');


			

		});

	}
});
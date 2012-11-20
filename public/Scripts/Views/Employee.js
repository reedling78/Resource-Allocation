
o.Views.EmployeeCollectionView = Backbone.View.extend({
	el: $('ul.Employees'),
	EmployeeHeight : 39,
	HeaderHeight :80,
	TotalHeight : 0,
	initialize: function(){
		
	},
	render: function () {

		this.collection.byTeam();

		var view = this, 
		employees = this.collection.get('Employees'),
		headers = this.collection.get('Teams');

		var currentHeader = '';

		for (i = 0; i < employees.length; i++) {

			if(currentHeader != employees[i].headername){
				currentHeader = employees[i].headername;

				//add header to total height
				view.TotalHeight = view.TotalHeight + view.HeaderHeight;

				headerView = new o.Views.Header({
					model: { 
						name: currentHeader
					}
				});

				view.renderView(headerView);
				currentHeader = employees[i].headername;
			}

			employeeView = new o.Views.Employee({model: employees[i]});

			//add employee to total height
			view.TotalHeight = view.TotalHeight + view.EmployeeHeight;

			view.renderView(employeeView);

		}
		this.adjustCalendarHeight();
	},
	renderView: function (view){
		view.render();
		this.$el.append(view.$el.contents().unwrap());
	},
	adjustCalendarHeight: function(){ 
		var view = this, 
		employees = this.collection.get('Employees'),
		headers = this.collection.get('Teams');

		$('.Day, .Day > li, .Day ul li, .Dates, .Month span').css('height', view.TotalHeight + 'px');
	},
	clearEmployees: function(){
		
	},
	clearEmployees: function(){
		console.log('clear projects');  
		$('ul.Employees').html('');
	}
});


o.Views.Employee = Backbone.View.extend({
	template: '<li><p>{{ name }}</p></li>',
	render: function (){
		this.$el.html(Mustache.render(this.template, this.model));
	}
});

o.Views.Header = Backbone.View.extend({
	template: '<li><h2>{{ name }}</h2></li>',
	render: function (){
		this.$el.html(Mustache.render(this.template, this.model));
	}
});


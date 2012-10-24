
o.Views.EmployeeCollectionView = Backbone.View.extend({
	el: $('ul.Employees'),
	EmployeeHeight : 39,
	HeaderHeight :50,
	initialize: function(){
		//console.log('cccc');
	},
	render: function () {
		var view = this, 
		employees = this.collection.byTeam(),
		headers = this.collection.get('Teams');

		var currentHeader = '';



		for (i = 0; i < employees.length; i++) {
			console.log(currentHeader + "  --  " + employees[i].headername);
			if(currentHeader != employees[i].headername){
				currentHeader = employees[i].headername;
				headerView = new o.Views.Header({
					model: { 
						name: currentHeader
					}
				});
				view.renderView(headerView);
				currentHeader = employees[i].headername;
			}

			employeeView = new o.Views.Employee({model: employees[i]});
			view.renderView(employeeView);

		}
		this.adjustCalendarHeight();
	},
	renderView: function (view){
		view.render();
		this.$el.append(view.$el.contents().unwrap());
	},
	adjustCalendarHeight: function(){
		//TODO: this should not be in the model
		$('.Day, .Day > li, .Day ul li, .Dates, .Month span').css('height', '625px');
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


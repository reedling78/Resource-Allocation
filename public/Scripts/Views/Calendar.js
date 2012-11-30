
o.Views.MonthCollectionView = Backbone.View.extend({
	el: $('ul.Month'),
	render: function () {
		var view = this, months = this.collection.get('months'), i, monthView;
		
		for (i = 0; i < months.length; i++) {
			monthView = new o.Views.Month({model: months[i]});
			view.renderView(monthView);
		}
		view.setHeight();
	},
	renderView: function (monthView){
		monthView.render();
		this.$el.prepend(monthView.$el.contents().unwrap());
	},
	setHeight: function(){
		var innerHeight = window.innerHeight;
		var diff = 150;
		$('div.Calendar').css('height', (innerHeight - diff) + 'px');

	}

});


o.Views.Calendar = Backbone.View.extend({
	el: $('ul.Day'),
	render: function (){
		this.$el.html(Mustache.render(this.template, this.model));
	}
});


o.Views.Month = Backbone.View.extend({
	template: '<li style="width:{{ width }}px;"><span></span><h4>{{ name }}</h4></li>',
	render: function (){
		this.$el.html(Mustache.render(this.template, this.model));
	}
});


o.Views.WeekCollectionView = Backbone.View.extend({
	el: $('ul.Day'),
	render: function (){
		var view = this, weeks = this.collection.get('weeks'), i;
		
		for (i=0; i<weeks.length; i++) {
			if (weeks[i].length !== 0){
				var week = new o.Views.Week({model: weeks[i]});
				view.renderView(week);
			}
		}
	},
	renderView: function (week){
		week.render();
		this.$el.prepend(week.$el.contents().unwrap());
	}

});

o.Views.Week = Backbone.View.extend({
	template: '<li><span></span><ul>{{ #days }}<li><h5>{{ date }}<br /><span>{{ name }}</span></h5></li>{{ /days }}</ul></li>',
	render: function() {
		this.$el.html(Mustache.render(this.template, {days: this.model}));
	}
});



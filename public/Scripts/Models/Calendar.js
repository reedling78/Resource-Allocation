o.Models.Calendar = Backbone.Model.extend({
	defaults: {
		monthsToDisplay : 12,
		pastMonthsToDisplay : 6
	},
	initialize: function(){
		this.buildCalendarData();
	},
	buildCalendarData: function(){
		var months = []
			, days = []
			, weeks = []
			, d = new Date(this.currentDate)
			, monthLoop
			, addOne
			, today = new Date(this.currentDate)
			, dayMap = []
			, dayInc = 1

			//roll back a month to account for current month
			d.setMonth(d.getMonth() - (this.get('pastMonthsToDisplay') + 1));

		for (var m = this.get('monthsToDisplay') - 1; m >= 0; m--) {
			var dayCount = 0;
			addOne = false;

			//Add month to date
			d.setMonth(d.getMonth() + 1);
			d.setDate(1); 
			
			currentMonth = d.getMonth(); 
			monthLoop = new Date(d); 

			for (var i = 0; i < 31; i++) {
				var increment = (addOne == false)? 0 : 1
					, newDate = new Date(monthLoop.setDate(monthLoop.getDate() + increment));
				
				if (newDate.getDay() != 0 && newDate.getDay() != 6){
							
					if(newDate.getDay() == 1){
						weeks.push(days);
						days = [];
					}

					dayMap.push({
						index : dayInc++,
						date: new Date((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear())
					});

					days.push({
						name: this.dayNames[newDate.getDay()],
						date: newDate.getDate()
					})
					dayCount++;
				}

				addOne = true;
			};

			months.push({
				name: this.monthNames[d.getMonth()],
				width: (dayCount * 41) - 1
			});

		};

		//add last week
		if(days.length != 0){
			weeks.push(days);
			days = [];
		}

		this.set({
			months : months.reverse(),
			weeks: weeks.reverse(),
			dayMap: dayMap.reverse()
		});
	},
	getDayIndex: function(d){
		var dateMap = this.get('dayMap')
		, dateToGet = this.resetTime(d);

		for (var i = 0; i < dateMap.length; i++) {
			var mapDate = new Date(dateMap[i].date);
			if(mapDate.getFullYear() == dateToGet.getFullYear()){
				if(mapDate.getMonth() == dateToGet.getMonth()){
					if(mapDate.getDate() == dateToGet.getDate()){
						return dateMap[i].index;
					}
				}
			}
		};
	},
	resetTime: function(d){
		return new Date((d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear());
	},
	calcDuration: function(start, end){
		var duration = 1;
		while (end.getTime() != start.getTime()){

			if(start.getDay() != 0 && start.getDay() != 6){
				duration++;
			}

			start.setDate(start.getDate()+1);

			//just in case date compair goes wrong. 
			if(duration > 300){
				break;
			}
		}
		return duration;
	},
	currentDate: new Date(),
	monthNames: ['January', 'February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	dayNames: ['Sun','Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']

});
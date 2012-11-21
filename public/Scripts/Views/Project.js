
o.Views.ProjectCollectionView = Backbone.View.extend({
	el: $('div.Projects ul'),
	initialize: function () {
		'use strict';
	},
	colors: ['Red', 'Orange', 'Yellow', 'Lime', 'Green', 'Aqua', 'Blue', 'Purple', 'Grey', 'White'],
	dayWidth : 41,
	render: function () {
		'use strict';
		var view = this,
			gutters = this.options.employeeList,
			projects = this.collection.models,
			i,
			gutterView,
			projectView;

		view.currentHeadername = gutters[0].headername;

		for (i = 0; i < gutters.length; i++) {
			gutterView = new o.Views.Gutter({
				model: gutters[i],
				currentHeadername: view.currentHeadername
			});
			view.renderGutterView(gutterView);
			view.currentHeadername = gutters[i].headername;
		}

		//set gutter width
		$('.Projects').css('width', $('.Calendar')[0].scrollWidth + 'px');

		for (i = 0; i < projects.length; i++) {
			projects[i].attributes = view.setDayInfo(projects[i].attributes);

			console.log(JSON.stringify(projects[i].attributes));

			projectView = new o.Views.Project({
				model: projects[i]
			});
			
			view.renderProjectView(projectView);
		}

		view.setEventHandlers();
	},
	renderGutterView: function (gutterView) {
		'use strict';
		gutterView.render();
		this.$el.append(gutterView.$el.contents().unwrap());
	},
	renderProjectView: function (projectView) {
		projectView.render();
		this.$el.find('li[data-employee-id="' + projectView.model.attributes.empid + '"] ul').append(projectView.$el.contents().unwrap())
	},
	setDayInfo: function(model){
		var today = new Date(),
			startD = new Date(model.startdate),
			endD = new Date(model.enddate),
			day = 1,
			duration = 1
			isLessThenToday = false;
 
			startD.setDate(startD.getDate()+1);
			endD.setDate(endD.getDate()+1);

		//reset time so date is comparable
		startD = new Date((startD.getMonth() + 1) + '/' + startD.getDate() + '/' + startD.getFullYear());
		endD = new Date((endD.getMonth() + 1) + '/' + endD.getDate() + '/' + endD.getFullYear());

		today = new Date((today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear())
		isLessThenToday = (today.getTime() > startD.getTime());

		//set start date to today is date is in the past so duration calculated correctly. 
		if(isLessThenToday){
			startD = today;
		} 
		
		//Calculate what day to start on
		while (today.getTime() < startD.getTime()){
			if(today.getDay() != 0 && today.getDay() != 6){
				day++;
			}
			today.setDate(today.getDate()+1);
		}

		//Calculate how many day the project is set for  
		while (endD.getTime() != startD.getTime()){
			if(startD.getDay() != 0 && startD.getDay() != 6){
				duration++;
			}

			startD.setDate(startD.getDate()+1);

			//just in case date compair goes wrong. 
			if(duration > 300){
				break;
			}
		}
		
		model.day = Math.floor((isLessThenToday) ? 1 : day);
		model.duration = Math.floor(duration);
		model.startdate = model.startdate.substring(0, model.startdate.indexOf('T'));
		model.enddate = model.enddate.substring(0, model.enddate.indexOf('T'));
		
		return model;
	},
	setEventHandlers: function(){
		var view = this,
			nextEl, 
			thisElStartDuration, 
			thisElStartDay, 
			thisElNewDuration;

			//Project edit area
			$('div.editproj').on('click', function(){
				$(this).parent().parent().addClass('Expanded');
			})

			$('div.editarea').on('mouseleave', function(){
				$(this).parent().removeClass('Expanded');
			})

			$('span.Colors span').on('click', function(){
				var projLi = $(this).parent().parent().parent().parent();
				$(this).parent().find('span').removeClass('Selected');
				$(this).addClass('Selected');
				view.updateProjectColor(projLi, $(this).data('color'));
				$(projLi).addClass($(this).data('color'));
			})

			$('.Projects ul ul').on('dblclick', function(e){
				var selectedDayIndex = Math.floor((e.offsetX / 41) + 1);
				var selectedDay;
				var empid = $(this).parent().attr('data-employee-id');
				
				for (var i = 0; i < o.calendarModel.attributes.dayMap.length; i++) {
					if(o.calendarModel.attributes.dayMap[i].index == selectedDayIndex){
						selectedDay = o.calendarModel.attributes.dayMap[i].date;
					}
				};

				view.collection.sendNewProject({
					name: "New Project",
					desc: "Project Description",
					empId: empid,
					color: "Grey",
					startdate: selectedDay,
					enddate: selectedDay
				});
				
				console.log('EmployeeId: ' + empid);
				console.log('SelectedDay' + selectedDay);

				o.socket.emit('get projects');
			})

			$('h6[contenteditable=true]').on('focusout', function(){
				view.collection.sendToServer($('div.Projects>ul>li'));
			});

			$('p[contenteditable=true]').on('focusout', function(){
				view.collection.sendToServer($('div.Projects>ul>li'));
			});

			//Project resizable
			$("div.Projects li>div").resizable({
				handles: 'e',
				grid: view.dayWidth,
				alsoResize: $(this).parent(),
				start: function(e, ui){
					nextEl = $(this).parent().nextAll();
					thisElStartDuration = Math.floor(parseInt($(this).attr('data-duration')));
					thisElStartDay = Math.floor(parseInt($(this).attr('data-day')));
				},
				resize: function(e, ui){

					thisElNewDuration = parseInt((ui.size.width / view.dayWidth) + 1);
					var DurationChange = thisElNewDuration - thisElStartDuration,
						curentElDayIncrease = thisElStartDay + thisElNewDuration,
						lastElEndDay = 0;

					if(DurationChange > 0){
						for (var i = 0; i < nextEl.length; i++) { 
							var nxtElDay = parseInt($(nextEl[i]).find('div').first().attr('data-day')),
								nxtElDur = parseInt($(nextEl[i]).find('div').first().attr('data-duration')),
								elName = $(nextEl[i]).find('h6').text();

							if(lastElEndDay > nxtElDay){
								view.updateProjectEl(nextEl[i], lastElEndDay);
								nxtElDay = $(nextEl[i]).find('div').first().data('day');
								lastElEndDay = lastElEndDay + nxtElDur;
							} else {
								if(curentElDayIncrease > nxtElDay){
									var newDays = nxtElDay + (curentElDayIncrease - nxtElDay);
									view.updateProjectEl(nextEl[i], newDays);
									lastElEndDay = newDays + nxtElDur;
								}
							}
						}
					}
				},
				stop: function(e, ui){
					var startD = $(this).attr('data-day')
						, endD;
					$(this).parent()
						.attr('style', '')
						.removeClass(function (index, css) {
							return (css.match (/\bDuration-\S+/g) || []).join(' ');
						})
						.addClass('Duration-' + Math.floor(thisElNewDuration));

					$(this).attr('style', '')
						.attr('data-duration', Math.floor(thisElNewDuration)); 

					for (var i = 0; i < o.calendarModel.attributes.dayMap.length; i++) {
						if(o.calendarModel.attributes.dayMap[i].index == startD){
							endD = o.calendarModel.attributes.dayMap[(i - thisElNewDuration) + 1].date;
						}
					};
					
					$(this).attr('data-enddate', endD.getFullYear() + '-' + (endD.getMonth() + 1) + '-' + endD.getDate());
					view.collection.sendToServer($('div.Projects>ul>li'));
				}
			})

			$("div.Projects li").draggable({ 
				handle: "span.Grabber",
				snap: "div.Projects ul ul",
				grid: [view.dayWidth,1],
				snapMode: 'inner'
			});

			$("div.Projects .droparea").droppable({
				tolerance: "pointer",
				drop: function(event, ui) {
					var dropped = ui.draggable, droppedOn = $(this);
            		$(dropped).detach().attr('style', '').appendTo(droppedOn);
            		
            		view.updateProjectEl(dropped, ((ui.position.left / view.dayWidth)+1),$(droppedOn).parent().attr('data-employee-id'));

            		droppedOn.find('li').sortElements(function(a, b){
					    return $(a).find('div').first().attr('data-day') > $(b).find('div').first().attr('data-day') ? 1 : -1;
					});

				}
			});
	},
	updateProjectEl: function(el, day, empid){
		var view = this;
		$(el).removeClass(function (index, css) {
			return (css.match (/\bDay-\S+/g) || []).join(' ');
		}).addClass('Day-' + day);

		$(el).find('div').first().attr('data-day', Math.floor(day));

		for (var i = 0; i < o.calendarModel.attributes.dayMap.length; i++) {
			if(o.calendarModel.attributes.dayMap[i].index == day){
				
				var count = 0;
				var d = new Date(o.calendarModel.attributes.dayMap[i].date);
				var duration = Math.floor(parseInt($(el).find('div').first().attr('data-duration')));
				var endD = new Date(o.calendarModel.attributes.dayMap[(i - duration) + 1].date);
				
				$(el).find('div').first().attr('data-startdate', d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
				$(el).find('div').first().attr('data-enddate', endD.getFullYear() + '-' + (endD.getMonth() + 1) + '-' + endD.getDate());
				$(el).find('div').first().attr('data-empid', empid);
				
			}
		};

		view.collection.sendToServer($('div.Projects>ul>li'));
	},
	updateProjectColor: function(el, color){
		var view = this;

		for (var i = 0; i < view.colors.length; i++) {
			$(el).removeClass(view.colors[i]);
		};

		$(el).addClass(color);
		view.collection.sendToServer($('div.Projects>ul>li'));
	},
	findColor: function(classString){
		var classList = classString.split(/\s+/);
		var view =  this;
		var returnColor = '';

		$.each( classList, function(index, cssclass){
			$.each( view.colors, function(index, color){
		    	if(cssclass == color){
		    		returnColor = cssclass;
		    	}
		    });
		});

		return returnColor;
	},
	clearProjects: function(){ 
		$('.Projects>ul').html('');
	}
});


o.Views.Gutter = Backbone.View.extend({
	template: '<li data-employee-id="{{ id }}"{{#margin}}style="margin-top:60px;"{{/margin}}>'
			+ '	<ul class="droparea"></ul>'
			+ '</li>',
	render: function (){
		
		if(this.options.currentHeadername != this.model.headername){
			this.model.margin = true;
		}
		
		this.$el.html(Mustache.render(this.template, this.model));
	}
});

o.Views.Project = Backbone.View.extend({
	template: '<li class="projli Duration-{{ duration }} Day-{{ day }} {{ color }}">'
			+ '	<div data-id="{{ id }}" data-empid={{ empid }} data-duration="{{ duration }}" data-day="{{ day }}" data-startdate="{{ startdate }}" data-enddate="{{ enddate }}" class="editarea">'
			+ '		<div class="editproj">'
			+ '			<h6 contenteditable="true">{{ name }}</h6>'
			+ '			<span class="Dash">&ndash;</span>'
			+ '			<p contenteditable="true">{{ description }}</p>'
			+ '			<span class="Colors"><span data-color="Red"></span><span data-color="Orange"></span><span data-color="Yellow"></span><span data-color="Lime"></span><span data-color="Green"></span><span data-color="Aqua"></span><span data-color="Blue"></span><span data-color="Purple"></span><span data-color="Grey"></span></span>'
			+ '			<span class="Grabber"></span>'
			+ '			<span class="Dots ui-resizable-handle ui-resizable-e"><span></span><span></span><span></span></span>'
			+ '		</div>'
			+ '	</div>'
			+ '</li>',
	render: function (){
		this.$el.html(Mustache.render(this.template, this.model.attributes));
	}
});

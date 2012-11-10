
o.Views.ProjectCollectionView = Backbone.View.extend({
	el: $('div.Projects ul'),
	initialize: function(){
		//console.log(this.options.employeeList);
		
	},
	render: function () {
		var view = this, 
			gutters = this.options.employeeList,
			projects = this.collection.get('Projects'), 
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
			projects[i] = view.setDayInfo(projects[i]);
			projectView = new o.Views.Project({
				model: projects[i]
			});
			view.renderProjectView(projectView);
		}

		view.setEventHandlers();
	},
	renderGutterView: function (gutterView){
		gutterView.render();
		this.$el.append(gutterView.$el.contents().unwrap());
	},
	renderProjectView: function(projectView){
		projectView.render();
		this.$el.find('li[data-employee-id="' + projectView.model.empId + '"] ul').append(projectView.$el.contents().unwrap())
	},
	setDayInfo: function(model){
		var today = new Date(),
			startD = new Date(model.startdate),
			endD = new Date(model.enddate),
			day = 1,
			duration = 1
			isLessThenToday = false;

		//reset time so date is comparable
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
		}
		
		model.day = (isLessThenToday) ? 1 : day;
		model.duration = duration;
		
		return model;
	},
	setEventHandlers: function(){

		$(function() {
			var nextEl, 
				thisElStartDuration, 
				thisElStartDay, 
				thisElNewDuration;


			//Project edit
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
				removeColor(projLi);
				$(projLi).addClass($(this).data('color'));
			})


			$("div.Projects li>div").resizable({
				handles: 'e',
				grid: 41,
				alsoResize: $(this).parent(),
				start: function(e, ui){
					nextEl = $(this).parent().nextAll();
					thisElStartDuration = parseInt($(this).attr('data-duration'));
					thisElStartDay = parseInt($(this).attr('data-day'));
				},
				resize: function(e, ui){
					thisElNewDuration = parseInt((ui.size.width / 41) + 1);
					var DurationChange = thisElNewDuration - thisElStartDuration,
						curentElDayIncrease = thisElStartDay + thisElNewDuration,
						lastElEndDay = 0;

					function updateEl(el, day){
						$(el)
							.removeClass(function (index, css) {
								return (css.match (/\bDay-\S+/g) || []).join(' ');
							})
							.addClass('Day-' + day);

						$(el).find('div').first().attr('data-day', day);
					};

					if(DurationChange > 0){
						for (var i = 0; i < nextEl.length; i++) { 
							var nxtElDay = parseInt($(nextEl[i]).find('div').first().attr('data-day')),
								nxtElDur = parseInt($(nextEl[i]).find('div').first().attr('data-duration')),
								elName = $(nextEl[i]).find('h6').text();

							if(lastElEndDay > nxtElDay){
								updateEl(nextEl[i], lastElEndDay);
								nxtElDay = $(nextEl[i]).find('div').first().data('day');
								lastElEndDay = lastElEndDay + nxtElDur;
							} else {
								if(curentElDayIncrease > nxtElDay){
									var newDays = nxtElDay + (curentElDayIncrease - nxtElDay);
									updateEl(nextEl[i], newDays);
									lastElEndDay = newDays + nxtElDur;
								}
							}
						}
					}
				},
				stop: function(e, ui){
					$(this).parent()
						.attr('style', '')
						.removeClass(function (index, css) {
							return (css.match (/\bDuration-\S+/g) || []).join(' ');
						})
						.addClass('Duration-' + thisElNewDuration);

					$(this).attr('style', '')
						.attr('data-duration', thisElNewDuration);;
				}
			})

			$("div.Projects li").draggable({ 
				handle: "span.Grabber",
				snap: "div.Projects ul ul",
				grid: [41,1],
				snapMode: 'inner'
				
			});

			$("div.Projects .droparea").droppable({
				tolerance: "pointer",
				drop: function(event, ui) {
					console.log(ui);
					console.log(this);
					var dropped = ui.draggable;
            		var droppedOn = $(this);
            		$(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
				}
			});

			function removeColor(el){
				$(el).removeClass('Red');
				$(el).removeClass('Orange');
				$(el).removeClass('Yellow');
				$(el).removeClass('Lime');
				$(el).removeClass('Green');
				$(el).removeClass('Aqua');
				$(el).removeClass('Blue');
				$(el).removeClass('Purple');
				$(el).removeClass('Gray');
				$(el).removeClass('White');
			}
	        
	    });
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
			+ '	<div data-duration="{{ duration }}" data-day="{{ day }}" class="editarea">'
			+ '		<div class="editproj">'
			+ '			<h6 contenteditable="true">{{ name }}</h6>'
			+ '			<span class="Dash">&ndash;</span>'
			+ '			<p contenteditable="true">{{ desc }}</p>'
			+ '			<span class="Colors"><span data-color="Red"></span><span data-color="Orange"></span><span data-color="Yellow"></span><span data-color="Lime"></span><span data-color="Green"></span><span data-color="Aqua"></span><span data-color="Blue"></span><span data-color="Purple"></span><span data-color="Gray"></span><span data-color="White"></span></span>'
			+ '			<span class="Grabber"></span>'
			+ '			<span class="Dots ui-resizable-handle ui-resizable-e"><span></span><span></span><span></span></span>'
			+ '		</div>'
			+ '	</div>'
			+ '</li>',
	render: function (){
		this.$el.html(Mustache.render(this.template, this.model));
	}
});

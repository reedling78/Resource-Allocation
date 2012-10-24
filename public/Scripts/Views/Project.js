
o.Views.ProjectCollectionView = Backbone.View.extend({
	el: $('div.Projects'),
	initialize: function(){
		console.log('start');
		$(function() {
	        $( "div.Projects li>div" ).resizable({
	        	handles: 'e',
        		 grid: 41,
        		 alsoResize: $(this).parent()
	         })

	        //$( "div.Projects li" ).sortable();

	        $( "div.Projects ul li ul li" ).draggable({ 
	        	snap: "div.Projects ul ul",
	        	snapMode: 'inner',
	        	containment: "div.Projects>ul",
	        	grid: [41,1]
	        });

	        $( "div.Projects ul ul" ).droppable({
	        	drop: function( event, ui ) { 
	        		console.log('ffff');
	        	}
	        });
	    });
	},
	render: function () {
		
	},
	renderView: function (projectLineView){
		
	}

});

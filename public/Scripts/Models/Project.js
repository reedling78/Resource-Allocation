o.Models.ProjectCollection = Backbone.Collection.extend({
  model: o.Models.Project,
  localStorage: new Store('ProjectCollection'),
  fetchData : function(callback){
  	var that = this;

    //Project has changed. Redraw
    o.socket.on('receive projects', function(data){ 
      console.log('receive projects');
      console.log(JSON.stringify(data));
      that.generateModels(data);
      console.log('collenctoin'):
      console.log(that):
      //clear
      if(o.projectCollectionView != undefined){
        o.projectCollectionView.clearProjects();
        o.employeeView.clearEmployees();
        o.employeeView.render();
      }

      callback();
    });
    o.socket.emit('get projects');

    o.socket.on('save', function(data){ 
      console.log(data);

    });

  },
  generateModels : function(data){
  		for (var i = 0; i < data.rows.length; i++) {
  			//console.log(data.rows[i]);
  			var project = new o.Models.Project(data.rows[i]);
			  this.add(project);  
		    project.save();
  		};
  },
  initialize : function(){
  	o.socket.on('save', function(data){
		//console.log(data); 
	});
  },
  sendToServer : function(projectsEl){
    var projArray = [];

    $(projectsEl).each(function(index) {
      if($(this).find('ul li').length !== 0){
        $(this).find('ul li').each(function(index){
          var el = $(this);
          
          projArray.push({
            id: $(el).find('div').first().data('id'),
            name: $(el).find('h6').text().trim(),
            description: $(el).find('p').first().text().trim(),
            empid: $(el).find('div').first().data('empid'),
            color: o.projectCollectionView.findColor($(el).attr('class')),
            startdate: $(el).find('div').first().data('startdate'),
            enddate: $(el).find('div').first().data('enddate')
          });
          
        });
      }
    });

    console.log(projArray);

    o.socket.emit('get projects', projArray);
  	//o.socket.emit('save', { name: 'Reed Rizzo', nickname: 'badass', color: color});
  }
});

o.Models.Project = Backbone.Model.extend({
	initialize: function(){
	}
});


o.Models.ProjectCollection = Backbone.Collection.extend({
  model: o.Models.Project,
  localStorage: new Store('ProjectCollection'),
  fetchData : function(data, callback){
    this.generateModels(data);
    callback();
  },
  generateModels : function(data){
  		for (var i = 0; i < data.rows.length; i++) {
  			var project = new o.Models.Project(data.rows[i]);
			  this.add(project);  
		    project.save();
  		};
  },
  initialize : function(){
  	
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
            empid: $(el).find('div').first().attr('data-empid'),
            color: o.projectCollectionView.findColor($(el).attr('class')),
            startdate: $(el).find('div').first().attr('data-startdate'),
            enddate: $(el).find('div').first().attr('data-enddate')
          });
          
        });
      }
    });
    
    o.socket.emit('get projects', projArray);
  },
  sendNewProject : function(proj){
    o.socket.emit('send new projects', proj);
  },
  deleteProject : function(id){
    o.socket.emit('delete projects', id);
  }
});

o.Models.Project = Backbone.Model.extend({
	initialize: function(){
	}
});


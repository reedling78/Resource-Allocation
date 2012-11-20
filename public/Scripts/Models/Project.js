o.Models.ProjectCollection = Backbone.Collection.extend({
  model: o.Models.Project,
  localStorage: new Store('ProjectCollection'),
  fetchData : function(callback){
  	var that = this;

    //Project has changed. Redraw
    o.socket.on('receive projects', function(data){ 
      that.generateModels(data);
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
    console.log(projectsEl);
    var projArray = [];

    o.employeeView.findColor('test test test');
    
    $(projectsEl).each(function(index) {
      if($(this).find('ul li').length !== 0){
        $(this).find('ul li').each(function(index){
          var el = $(this);
          console.log(el); 
          // projArray.push({
          //   id: $(el).data('id'),
          //   name: "ACG",
          //   description: "My AAA Account Redesign",
          //   empid: $(el).data('empid'),
          //   color: "Orange",
          //   startdate: "2012-11-19T00:00:00.000Z",
          //   enddate: "2012-11-23T00:00:00.000Z",
          //   day: null,
          //   duration: null
          // });
          
        });
      }
    });

    o.socket.emit('get projects', { name: 'test' });
  	//o.socket.emit('save', { name: 'Reed Rizzo', nickname: 'badass', color: color});
  }
});

o.Models.Project = Backbone.Model.extend({
	initialize: function(){
	}
});


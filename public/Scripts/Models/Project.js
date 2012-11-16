o.Models.ProjectCollection = Backbone.Collection.extend({
  model: o.Models.Project,
  localStorage: new Store('ProjectCollection'),
  fetchData : function(callback){
  	var that = this;
  	console.log('this');
  	console.log(this);
	o.socket.on('receive projects', function(data){
		console.log(data);
		that.generateModels(data);
		callback();
	});
	o.socket.emit('get projects');
  },
  generateModels : function(data){
  		for (var i = 0; i < data.rows.length; i++) {
  			console.log(data.rows[i]);
  			var project = new o.Models.Project(data.rows[i]);
			this.add(project);
		    project.save();
  		};
  },
  initialize : function(){
  	o.socket.on('save', function(data){
		console.log(data); 
	});
  },
  sendToServer : function(color){
  	o.socket.emit('save', { name: 'Reed Rizzo', nickname: 'badass', color: color});
  }
});

o.Models.Project = Backbone.Model.extend({
	initialize: function(){
	}
});


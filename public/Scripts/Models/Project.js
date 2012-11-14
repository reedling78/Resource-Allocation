//Red, Orange, Yellow, Lime, Green, Aqua, Blue, Purple, Grey, White


o.Models.ProjectCollection = Backbone.Collection.extend({
  model: o.Models.Project,
  localStorage: new Store('ProjectCollection'),
  fetchData : function(callback){
	o.socket.on('receive projects', function(data){
		console.log(data);
		callback();
	});
	o.socket.emit('get projects');
  },
  initialize : function(){
  	
  	o.socket.on('save', function(data){
		console.log(data);
	});

  	var project = new o.Models.Project({
		id:1,
		name:'ACGQQQ',
		desc:'My AAA Account Redesign', 
		empId:1,
		color: 'Lime',
		startdate: '10/01/2012',
		enddate: '11/16/2012'
	});
	this.add(project);
    project.save();

    var project1 = new o.Models.Project({
		id:2,
		name:'MojoBistroQQQ',
		desc:'Ads, Postcards, T-Shirts, Flyers', 
		empId:2,
		color: 'Yellow',
		startdate: '11/09/2012',
		enddate: '2/21/2013'
	});
	this.add(project1);
    project1.save();

    var project2 = new o.Models.Project({
		id:3,
		name:'iTravelQQQ',
		desc:'Meeting Manager', 
		empId:3,
		color: 'Orange',
		startdate: '11/19/2012',
		enddate: '11/27/2012'
	});
	this.add(project2);
    project2.save();

    var project3 = new o.Models.Project({
		id:4,
		name:'CarlucciQQQ',
		desc:'Meeting Manager', 
		empId:1,
		color: 'Purple',
		startdate: '11/19/2012',
		enddate: '11/23/2012'
	});
	this.add(project3);
    project3.save();

    var project4 = new o.Models.Project({
		id:5,
		name:'Parts Town',
		desc:'Meeting Manager', 
		empId:1,
		color: 'Blue',
		startdate: '11/26/2012',
		enddate: '11/30/2012'
	});
	this.add(project4);
    project4.save();

    var project5 = new o.Models.Project({
		id:6,
		name:'Day Timer',
		desc:'Meeting Manager', 
		empId:1,
		color: 'Green',
		startdate: '12/03/2012',
		enddate: '12/07/2012'
	});
	this.add(project5);
    project5.save();

  },
  sendToServer : function(color){
  	o.socket.emit('save', { name: 'Reed Rizzo', nickname: 'badass', color: color});
  }
});

o.Models.Project = Backbone.Model.extend({
	initialize: function(){
	}
});


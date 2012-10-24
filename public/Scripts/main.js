window.o = {};
window.o.Views = {};
window.o.Models = {};
window.o.views = {};
window.o.models = {};



require(['Views/Calendar', 'Models/Calendar', 
		 'Views/Employee', 'Models/Employee', 'controller'], function() { 
	$(document).ready(function(){
		o.controller = new o.Controller();
	});
});


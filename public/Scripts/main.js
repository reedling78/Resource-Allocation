window.o = {};
window.o.Views = {};
window.o.Models = {};
window.o.views = {};
window.o.models = {};
window.o.isEditing = false;



require(['Views/Calendar', 'Models/Calendar', 
		 'Views/Employee', 'Models/Employee', 
		 'Views/Project',  'Models/Project',
		 'controller'], function() { 
	$(document).ready(function(){
		o.controller = new o.Controller();
	});
});


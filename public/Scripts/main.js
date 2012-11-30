window.o = {};
window.o.Views = {};
window.o.Models = {};
window.o.views = {};
window.o.models = {};
window.o.isEditing = false;

window.o.CONST = {};
window.o.CONST.ServiceURL = 'http://klt.rizzonet.com';
window.o.CONST.url = document.URL;


if(o.CONST.url.indexOf('login') !== -1){ 

	require(['Views/Login', 'Models/Login'], function() { 
		$(document).ready(function(){
			o.login = new o.Views.Login;
		});
	});

} else {

	require(['Views/Calendar', 'Models/Calendar', 
			 'Views/Employee', 'Models/Employee', 
			 'Views/Project',  'Models/Project',
			 'controller'], function() { 
		$(document).ready(function(){
			o.controller = new o.Controller();
		});
	});

}




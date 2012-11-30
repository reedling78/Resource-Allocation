window.o = {};
window.o.Views = {};
window.o.Models = {};
window.o.views = {};
window.o.models = {};
window.o.isEditing = false;

window.o.CONST = {};
window.o.CONST.ServiceURL = 'http://klt.rizzonet.com';
window.o.CONST.url = document.URL;
window.o.CONST.cookie = function(){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x=='kltra')
        {
            return unescape(y);
        }
    }
}


if(o.CONST.url.indexOf('login') !== -1){ 

	if (o.CONST.cookie() != null && o.CONST.cookie() != "") { 
		window.location = "/";
	} else {
		require(['Views/Login', 'Models/Login'], function() { 
			$(document).ready(function(){
				o.login = new o.Views.Login;
			});
		});
	}
	
} else {

    if (o.CONST.cookie() != null && o.CONST.cookie() != "") {
        require(['Views/Calendar', 'Models/Calendar', 
				 'Views/Employee', 'Models/Employee', 
				 'Views/Project',  'Models/Project',
				 'controller'], function() { 
			$(document).ready(function(){
				o.controller = new o.Controller();
			});
		});
        $('body').animate({ 
            opacity: 1,
            backgroundColor: "#d4d4d4"
        }, 500);
		
    } else {
        window.location = "/login"
    }

}
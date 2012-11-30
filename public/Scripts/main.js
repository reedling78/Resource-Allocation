window.o = {};
window.o.Views = {};
window.o.Models = {};
window.o.views = {};
window.o.models = {};
window.o.isEditing = false;

window.o.CONST = {};
window.o.CONST.ServiceURL = 'http://klt.rizzonet.com';
window.o.CONST.url = document.URL;

var cookie = getCookie("kltra");

if(o.CONST.url.indexOf('login') !== -1){ 

	if (cookie != null && cookie != "") { 
		window.location = "/";
	} else {
		require(['Views/Login', 'Models/Login'], function() { 
			$(document).ready(function(){
				o.login = new o.Views.Login;
			});
		});
	}
	
} else {

    if (cookie != null && cookie != "") {
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


function getCookie(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}






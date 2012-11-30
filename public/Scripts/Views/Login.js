o.Views.Login = Backbone.View.extend({
	el: $(".Login"),
    initialize: function(){
        var that = this;

        if(!this.checkCookie()){
            $('.Login *').animate({ 
                opacity: 1 
            }, 500);
        } else {
            this.fadeout();
        }
    },
    events: {
        "click .Button": "submit",
        "focusin input": "focusin",
        "focusout input": "focusout",
        "keypress input": "pressenter"
    },
    submit: function(){
        console.log('submit');
        var that = this;
        var login = new o.Models.Login({
            password : that.$el.find('input').val()
        });

        that.reset();

        login.fetch({
            success: function(model, response){
                console.log(response);
                if(response.success){
                    that.success();
                } else {
                    that.fail();
                }
            }
        });

        return false;
    },
    fail: function(){
        this.$el.find('.Input-Text').addClass('Error');
        this.$el.find('.Error-Message').css('display', 'block');
    },
    success: function(){
        this.setCookie('kltra',true,365);
        this.fadeout();
        window.location = "/";
    },
    reset: function(){
        this.$el.find('.Input-Text').removeClass('Error');
        this.$el.find('.Error-Message').css('display', 'none');
    },
    focusin : function(e){
        $(e.currentTarget).parent().addClass('Focused');
    },
    focusout : function(e){
        $(e.currentTarget).parent().removeClass('Focused');
    },
    fadeout : function(){
        var that = this;
        that.$el.animate({ 
            opacity: 0 
        }, 500, function(){
            that.$el.css('display', 'none');
        });
    },
    pressenter : function(e){
        if (e.keyCode != 13) return;

        this.submit();
    },
    setCookie : function(c_name,value,exdays)
    {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    },
    checkCookie : function(){
        var cookie = this.getCookie("kltra");

        if (cookie != null && cookie != "") {
            return true;
        } else {
            return false;
        }
    },
    getCookie : function(c_name){
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
});
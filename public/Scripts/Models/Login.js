o.Models.Login = Backbone.Model.extend({
    url: function(){
      return o.CONST.ServiceURL + '/get/login/' + this.get('password');
    },
    sync: function(method, model, options) {
        var params = _.extend({
            type: 'GET',
            dataType: 'json',
            url: this.url(),
            processData: true
        }, options);

        var results = $.ajax(params);
        console.log(results);
        return results;
    },
    parse: function(response) {
        return response;
    }
});
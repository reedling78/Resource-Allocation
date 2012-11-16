exports.selectAllProjects = function (client, callback) { 
	client.query('SELECT * FROM projects', function(err, result){
    	if(err != null){
    		callback(err);
    	} else {
    		callback(result);
    	}
    });
}
exports.selectAllProjects = function (client, callback) { 
	client.query('SELECT * FROM projects', function(err, result){
    	if(err != null){
    		callback(err);
    	} else {
    		callback(result);
    	}
    });
}

exports.selectCurrentProjects = function (client, callback) { 
	client.query('SELECT * FROM projects WHERE enddate < now()', function(err, result){
    	if(err != null){
    		callback(err);
    	} else {
    		callback(result);
    	}
    });
}
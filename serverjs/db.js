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
	client.query('SELECT * FROM projects WHERE enddate > now()', function(err, result){
    	if(err != null){
    		callback(err);
    	} else {
    		callback(result);
    	}
    });
}

exports.deleteProjects = function (client, id, callback) { 
	client.query('DELETE FROM projects WHERE id = ' + id, function(err, result){
    	if(err != null){
    		callback(err);
    	} else {
    		callback(result);
    	}
    });
}

exports.insertProjects = function (client, proj, callback) { 
	var q = 'INSERT INTO projects (name, description, empId, color, startdate, enddate)'
	    + 'VALUES (\'' + proj.name + '\', \'' + proj.desc + '\', ' + proj.empId + ', \'' + proj.color + '\', \'' + proj.startdate + '\', \'' + proj.enddate + '\')'

    client.query(q, function(err, result){
    	if(err != null){
    		callback(err);
    	} else {
    		callback(result);
    	}
    });
}









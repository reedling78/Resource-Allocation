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

exports.truncateProjects = function (client, id, callback) { 
	client.query('TRUNCATE projects', function(err, result){
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

exports.updateProjects = function (client, projArray, callback) { 
    var statements = [];

    for (var i = 0; i < projArray.length; i++) {
        var s = 'UPDATE projects SET '
        + 'name = \'' + projArray[i].name + '\', '
        + 'description = \'' + projArray[i].description + '\', '
        + 'empid = ' + projArray[i].empid + ', '
        + 'color = \'' + projArray[i].color + '\', '
        + 'startdate = \'' + projArray[i].startdate + '\', '
        + 'enddate = \'' + projArray[i].enddate + '\' '
        + 'WHERE id = ' + projArray[i].id;

        statements.push(s);
    };

	(function next() {
        var statement = statements.shift();
        if (statement) { 
          client.query(statement, function(err, response) {
            if (err) return callback(err);
                console.dir(response);
            next();
          });
        }
        else{
            callback();
        }
          
    })();
}











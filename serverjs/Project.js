
exports.projects = function () {

	return {
		Projects : [
		{
			id:1,
			name:'ACG',
			desc:'My AAA Account Redesign', 
			empId:1,
			color: 'Lime',
			startdate: '11/19/2012',
			enddate: '11/23/2012'
		},
		{
			id:2,
			name:'Parts Town',
			desc:'My AAA Account Redesign', 
			empId:1,
			color: 'Lime',
			startdate: '11/26/2012',
			enddate: '11/30/2012'
		},
		{
			id:3,
			name:'Takada',
			desc:'My AAA Account Redesign', 
			empId:1,
			color: 'Lime',
			startdate: '12/03/2012',
			enddate: '12/07/2012'
		},
		{
			id:4,
			name:'PLS',
			desc:'My AAA Account Redesign', 
			empId:1,
			color: 'Lime',
			startdate: '12/10/2012',
			enddate: '12/14/2012'
		}
		]
	}

}


exports.getAllProjects = function(redis){
	var results = [];
	console.log('****** IN FUNCTION');
	redis.keys("*", function (err, keys) {
		console.log('****** KEY COUNT: ' +  keys.length);
		console.log('****** KEYS: ' +  keys);
		console.log('****** ERR: ' +  err);
	    keys.forEach(function (key, pos) {
	        redis.type(key, function (err, keytype) {
	            console.log(key + " is " + keytype);
	            results.push({ key: key, keytype: keytype });
	            if (pos === (keys.length - 1)) {
	                redis.quit();
	                return results;
	            }
	        });
	    });
	});
}

exports.setExampleProjects = function(){


}

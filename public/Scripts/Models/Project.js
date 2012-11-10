//Red, Orange, Yellow, Lime, Green, Aqua, Blue, Purple, Grey, White


o.Models.Project = Backbone.Model.extend({
	defaults: {
		Projects : [
			{
				id:1,
				name:'ACG',
				desc:'My AAA Account Redesign', 
				empId:1,
				color: 'Lime',
				startdate: '10/01/2012',
				enddate: '11/16/2012'
			},
			{
				id:2,
				name:'MojoBistro',
				desc:'Ads, Postcards, T-Shirts, Flyers', 
				empId:2,
				color: 'Yellow',
				startdate: '11/09/2012',
				enddate: '2/21/2013'
			},
			{
				id:3,
				name:'iTravel',
				desc:'Meeting Manager', 
				empId:3,
				color: 'Orange',
				startdate: '11/19/2012',
				enddate: '11/27/2012'
			},
			{
				id:4,
				name:'Carlucci',
				desc:'Meeting Manager', 
				empId:1,
				color: 'Purple',
				startdate: '11/19/2012',
				enddate: '11/23/2012'
			},
			{
				id:4,
				name:'Parts Town',
				desc:'Meeting Manager', 
				empId:1,
				color: 'Blue',
				startdate: '11/26/2012',
				enddate: '11/30/2012'
			},
			{
				id:4,
				name:'Day Timer',
				desc:'Meeting Manager', 
				empId:1,
				color: 'Green',
				startdate: '12/03/2012',
				enddate: '12/07/2012'
			},
			{
				id:4,
				name:'Day Timer',
				desc:'Meeting Manager', 
				empId:1,
				color: 'Grey',
				startdate: '12/10/2012',
				enddate: '12/14/2012'
			},
			{
				id:5,
				name:'Carlucci',
				desc:'Meeting Manager', 
				empId:4,
				color: 'Lime',
				startdate: '10/15/2012',
				enddate: '11/23/2012'
			}
		]
	},
	initialize: function(){
		
	}
});
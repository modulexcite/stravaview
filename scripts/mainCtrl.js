angular.module('stravaView').controller('mainCtrl', function(mainService, $scope, $interval){



		console.log('authMe')
		mainService.authMe();
		// var user = mainService.getAuthUser();
		var user;
		var token = '37e544dfbfe9224d16572a5c66df1a0ea9b494b5'
		var ytdBike = {};
		var recentBike = {};
		var allBike = {};
		var ytdRunTime, ytdRunDistance;
		moment.locale('en')

		$scope.todaysDate = moment().format('MMM DD')
		$scope.test = moment().format('dddd')
		$scope.deauth = function() {
			mainService.deauthorizeUser(user).then(function(data){

			})
		}
		var lastActivity;
		mainService.getPublicData().then(function(data){
			console.log(data)
			
			$scope.basicData = data
			

			lastActivity = data.updated_at;
			var m = moment(lastActivity)
			$scope.lastActTime = m.from(moment())

			console.log('lastActivity', lastActivity)
			mainService.getprivateData(data, token).then(function(data){
				console.log(data)
				mainService.setPerformData(data);

				$scope.ytdRun = mainService.getytdRun();
				var ytdRun = mainService.getytdRun();

				$scope.lifeRun = mainService.getLifeRun();
				var lifeRun = mainService.getLifeRun();

				$scope.recentRun = mainService.getRecentRun();
				var recentRun = mainService.getRecentRun();

				$scope.ytdRide = mainService.getytdRide();
				var ytdRide = mainService.getytdRide();

				$scope.lifeRide = mainService.getLifeRide();
				var lifeRide = mainService.getLifeRide();

				$scope.recentRide = mainService.getRecentRide();
				var recentRide = mainService.getRecentRide();


				var avgSpeedData = {
				    labels : ["Minutes/Mile"],
				    datasets : [
			        	{
				            fillColor : "rgba(254,153,11,0.7)",
				            strokeColor : "#00AF96",
				            data : [lifeRun.avgSpeed]
			        	},
			        	{
				            fillColor : "rgba(252,76,2,0.7)",
				            strokeColor : "#00AF96",
				            data : [ytdRun.avgSpeed]
			        	},
			        	{
			        		fillColor : 'rgba(254,12,11,0.7)',
			        		strokeColor : '#00AF96',
			        		data : [recentRun.avgSpeed]
			        	}
			  		]
			  	}
				// get bar chart canvas
				var avgSpeedGraph = document.getElementById("avgSpeedGraphRun").getContext("2d");
				// draw bar chart
				new Chart(avgSpeedGraph).Bar(avgSpeedData);

			  	var avgDistData = {
				    labels : ["Total Miles"],
				    datasets : [
			        	{
				            fillColor : "rgba(254,153,11,0.7)",
				            strokeColor : "#00AF96",
				            data : [lifeRun.distance.miles]
			        	},
			        	{
				            fillColor : "rgba(252,76,2,0.7)",
				            strokeColor : "#00AF96",
				            data : [ytdRun.distance.miles]
			        	},
			        	{
			        		fillColor : 'rgba(254,12,11,0.7)',
			        		strokeColor : '#00AF96',
			        		data : [recentRun.distance.miles]
			        	}
			  		]
			  	}
				var avgDistanceGraph = document.getElementById('avgDistanceGraphRun').getContext('2d');
				new Chart(avgDistanceGraph).Bar(avgDistData)

				var timeData = {
					labels: ['Total Hours.Minutes'],
					datasets : [
						{
							fillColor : "rgba(254,153,11,0.7)",
				            strokeColor : "#00AF96",
				            data : [lifeRun.moving_time]
						},
			        	{
				            fillColor : "rgba(252,76,2,0.7)",
				            strokeColor : "#00AF96",
				            data : [ytdRun.moving_time]
			        	},
			        	{
			        		fillColor : 'rgba(254,12,11,0.7)',
			        		strokeColor : '#00AF96',
			        		data : [recentRun.moving_time]
			        	}
					]
				}
				var timeGraph = document.getElementById('timeGraphRun').getContext('2d');
				new Chart(timeGraph).Bar(timeData)

				var avgSpeedDataRide = {
				    labels : ["Minutes/Mile"],
				    datasets : [
			        	{
				            fillColor : "rgba(254,153,11,0.7)",
				            strokeColor : "#00AF96",
				            data : [lifeRide.avgSpeed]
			        	},
			        	{
				            fillColor : "rgba(252,76,2,0.7)",
				            strokeColor : "#00AF96",
				            data : [ytdRide.avgSpeed]
			        	},
			        	{
			        		fillColor : 'rgba(254,12,11,0.7)',
			        		strokeColor : '#00AF96',
			        		data : [recentRide.avgSpeed]
			        	}
			  		]
			  	}
				// get bar chart canvas
				var avgSpeedGraphRide = document.getElementById("avgSpeedGraphRide").getContext("2d");
				// draw bar chart
				new Chart(avgSpeedGraphRide).Bar(avgSpeedDataRide);


				console.log(recentRide.distance)
				debugger;
			  	var avgDistDataRide = {
				    labels : ["Total Miles"],
				    datasets : [
			        	{
				            fillColor : "rgba(254,153,11,0.7)",
				            strokeColor : "#00AF96",
				            data : [lifeRide.distance.miles]
			        	},
			        	{
				            fillColor : "rgba(252,76,2,0.7)",
				            strokeColor : "#00AF96",
				            data : [ytdRide.distance.miles]
			        	},
			        	{
			        		fillColor : 'rgba(254,12,11,0.7)',
			        		strokeColor : '#00AF96',
			        		data : [recentRide.distance.miles]
			        	}
			  		]
			  	}
				var avgDistanceGraphRide = document.getElementById('avgDistanceGraphRide').getContext('2d');
				new Chart(avgDistanceGraphRide).Bar(avgDistDataRide)

				var timeDataRide = {
					labels: ['Total Hours.Minutes'],
					datasets : [
						{
							fillColor : "rgba(254,153,11,0.7)",
				            strokeColor : "#00AF96",
				            data : [lifeRide.moving_time]
						},
			        	{
				            fillColor : "rgba(252,76,2,0.7)",
				            strokeColor : "#00AF96",
				            data : [ytdRide.moving_time]
			        	},
			        	{
			        		fillColor : 'rgba(254,12,11,0.7)',
			        		strokeColor : '#00AF96',
			        		data : [recentRide.moving_time]
			        	}
					]
				}
				var timeGraphRide = document.getElementById('timeGraphRide').getContext('2d');
				new Chart(timeGraphRide).Bar(timeDataRide)

			})
		})
		var t = moment()
		t = t.add(1, 'seconds')
		$scope.myHours = t.format('hh');
		$scope.myMins = t.format('mm');
		$scope.mySecs = t.format('ss');

	

		
// debugger;



	$interval(function(){
		var t = moment()
		t = t.add(1, 'seconds')
		$scope.myHours = t.format('hh');
		$scope.myMins = t.format('mm');
		$scope.mySecs = t.format('ss');
	}, 1000)

})
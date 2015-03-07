angular.module('stravaView').controller('mainCtrl', function(mainService, $scope){
	// debugger;
	// var user = mainService.getAuthUser();

	// mainService.getPublicData(user).then(function(data){
	// 	console.log(data)
	// })
	var user = mainService.getAuthUser();

	var ytdBike = {};
	var recentBike = {};
	var allBike = {};
	var ytdRunTime, ytdRunDistance;


	mainService.getPublicData(user).then(function(data){
		// debugger;
		console.log(data)
		$scope.basicData = data
		mainService.getprivateData(data, user).then(function(data){
			console.log(data)
			mainService.setPerformData(data);
			// $scope.ytdRunCount = data.ytd_run_totals.count;
			// $scope.ytdRunDistance = data.ytd_run_totals.distance;
			// $scope.ytdRunTime = data.ytd_run_totals.elapsed_time;
			// if(data.ytd_ride_totals.count)
			// 	$scope.ytdRideCount = data.ytd_ride_totals.count;
			// if(data.ytd_ride_totals.distance)
			// 	$scope.ytdRideDistance = data.ytd_ride_totals.distance;
			// if(data.ytd_ride_totals.elapsed_time)
			// 	$scope.ytdRideTime = data.ytd_ride_totals.elapsed_time;

			// ytdRunTime = data.ytd_run_totals.elapsed_time;
			// ytdRunDistance = data.ytd_run_totals.distance;
		})
	})

})
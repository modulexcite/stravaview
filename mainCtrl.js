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
	moment.locale('en')
	$scope.todaysDate = moment().format('MM/DD/YY')
	$scope.test = moment().format('dddd')
	$scope.deauth = function() {
		debugger;
		mainService.deauthorizeUser(user).then(function(data){

		})
	}
	var lastActivity;
	mainService.getPublicData(user).then(function(data){
		// debugger;
		console.log(data)
		$scope.basicData = data
		

		lastActivity = data.updated_at;
		var m = moment(lastActivity)
		$scope.lastActTime = m.from(moment())

		console.log('lastActivity', lastActivity)
		mainService.getprivateData(data, user).then(function(data){
			console.log(data)
			mainService.setPerformData(data);

			$scope.ytdRun = mainService.getytdRun();
			$scope.lifeRun = mainService.getLifeRun();
			$scope.recentRun = mainService.getRecentRun();

			$scope.ytdRide = mainService.getytdRide();
			$scope.lifeRide = mainService.getLifeRide();
			$scope.recentRide = mainService.getRecentRide();
		})
	})

})
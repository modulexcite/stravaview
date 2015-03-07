angular.module('stravaView').service('mainService', function($http, $q){
	var authUser;
	var authUserId;
	var performData;
	


	this.setUser = function(user) {
		authUser = user;
	}
	this.getAuthUser = function() {
		return authUser;
	}


	this.getPublicData = function(user) {
		var deferred = $q.defer()
		$http({
			method: 'JSONP',
			url: 'https://www.strava.com/api/v3/athlete?callback=JSON_CALLBACK&access_token=' + user.access_token
		})
		.then(function(data) {
			deferred.resolve(data.data)
		})
		return deferred.promise;
	}

	this.getprivateData = function(data, user) {
		var deferred = $q.defer()
		$http({
			method: 'JSONP',
			url: 'https://www.strava.com/api/v3/athletes/'+ data.id +'/stats' + '?callback=JSON_CALLBACK&access_token=' + user.access_token
		})
		.then(function(data){
			deferred.resolve(data.data)
		})
		return deferred.promise;
	}

	this.deauthorizeUser = function(user) {
		var deferred = $q.defer()
		$http({
			method: 'POST',
			url: 'https://www.strava.com/oauth/deauthorize?access_token=' + user.access_token
		})
		.then(function(data) {
			deferred.resolve(data.data)
		})
		return deferred.promise;
	}

	this.convertSeconds = function(secs) {
		secs = Math.round(secs);
    	var hours = Math.floor(secs / (60 * 60));

    	var divisor_for_minutes = secs % (60 * 60);
    	var minutes = Math.floor(divisor_for_minutes / 60);

    	var divisor_for_seconds = divisor_for_minutes % 60;
    	var seconds = Math.ceil(divisor_for_seconds);

    	var obj = {
        	"h": hours,
        	"m": minutes,
        	"s": seconds
    	};
    	return obj;
	}

	this.convertMeters = function(meter) {
		var dist = (meter * 0.000621371192)
		dist = dist.toFixed(2)
		var distObj = {miles: dist}
		return distObj
	}

	this.avgSpeed = function(time, distance) {
		var avg = (distance/time)
		var avgObj = this.convertSeconds(avg)
		return avgObj;
	}

	this.setPerformData = function(data) {
		performData = data;
	}
	var ytdRun = {};
	var lifeRun = {}
	var recentRun = {}

	this.getytdRun = function() {
		if(performData.ytd_run_totals.count) {
			ytdRun.count = performData.ytd_run_totals.count;
			ytdRun.distance = this.convertMeters(performData.ytd_run_totals.distance)
			ytdRun.moving_time = this.convertSeconds(performData.ytd_run_totals.moving_time)
			ytdRun.avgSpeed = this.avgSpeed(ytdRun.distance.miles, performData.ytd_run_totals.moving_time)
		}
		console.log('ytdRun: ', ytdRun)
		return ytdRun;
	}

	this.getLifeRun = function() {
		if(performData.all_run_totals.count) {
			lifeRun.count = performData.all_run_totals.count;
			lifeRun.distance = this.convertMeters(performData.all_run_totals.distance)
			lifeRun.moving_time = this.convertSeconds(performData.all_run_totals.moving_time)
			lifeRun.avgSpeed = this.avgSpeed(lifeRun.distance.miles, performData.all_run_totals.moving_time)
		}
		console.log('lifeRun: ', lifeRun)
		return lifeRun;
	}

	this.getRecentRun = function() {
		if(performData.recent_run_totals.count) {
			recentRun.count = performData.recent_run_totals.count;
			recentRun.distance = this.convertMeters(performData.recent_run_totals.distance)
			recentRun.moving_time = this.convertSeconds(performData.recent_run_totals.moving_time)
			recentRun.avgSpeed = this.avgSpeed(recentRun.distance.miles, performData.recent_run_totals.moving_time)
		}
		console.log('recentRun: ', recentRun)
		return recentRun;
	}

	var ytdRide = {}
	var lifeRide = {};
	var recentRide = {};

	this.getytdRide = function() {
		if(performData.ytd_ride_totals.count) {
			ytdRide.count = performData.ytd_ride_totals.count;
			ytdRide.distance = this.convertMeters(performData.ytd_ride_totals.distance)
			ytdRide.moving_time = this.convertSeconds(performData.ytd_ride_totals.moving_time)
			ytdRide.avgSpeed = this.avgSpeed(ytdRide.distance.miles, performData.ytd_ride_totals.moving_time)
		}
		console.log('ytdRide: ', ytdRide)
		return ytdRide;
	}

	this.getLifeRide = function() {
		if(performData.all_ride_totals.count) {
			lifeRide.count = performData.all_ride_totals.count;
			lifeRide.distance = this.convertMeters(performData.all_ride_totals.distance)
			lifeRide.moving_time = this.convertSeconds(performData.all_ride_totals.moving_time)
			lifeRide.avgSpeed = this.avgSpeed(lifeRide.distance.miles, performData.all_ride_totals.moving_time)
		}
		console.log('lifeRide: ', lifeRide)
		return lifeRide;
	}

	this.getRecentRide = function() {
		if(performData.recent_ride_totals.count) {
			recentRide.count = performData.recent_ride_totals.count;
			recentRide.distance = this.convertMeters(performData.recent_ride_totals.distance)
			recentRide.moving_time = this.convertSeconds(performData.recent_ride_totals.moving_time)
			recentRide.avgSpeed = this.avgSpeed(recentRide.distance.miles, performData.recent_ride_totals.moving_time)
		}
		console.log('recentRide: ', recentRide)
		return performData;
	}



})
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

	this.setPerformData = function(data) {
		performData = data;
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
		return (meters * 0.000621371192)
	}

	this.avgSpeed = function(time, distance) {
		return (time / distance)
	}


debugger;





})
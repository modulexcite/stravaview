app = angular.module('stravaView', ['oauth.io'])
app.config(function (OAuthProvider) {
	// OAuthProvider.setHandler('strava', function (OAuthData, $http) {
 //    $http.get('https://www.strava.com/oauth/authorize?' + OAuthData.result.access_token)
 //      	.then(function (resp) {
 //        	console.log(resp);
 //      	});
 //    });
	
		
});
// app.run(function(mainService){
// 	OAuth.initialize('VNU9Zd5Oc56rNM97oyHxN835Tus')
// 		OAuth.popup('strava', {cache:true}).done(function(result) {
// 		    //console.log(mainService.setUser(result))
// 		    console.log(result)
// 		    mainService.setUser(result)
		    
// 		})
// })


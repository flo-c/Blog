angular.module('firebasemodule', ['firebase']);
// TODO change the 'FIREBASE_URL' constant to declare the url of your own firebase application
angular.module('firebasemodule').constant('FIREBASE_URL', "YOUR_FIREBASE_APPLICATION_URL");
angular.module('firebasemodule').factory('firebaseservice', ['$rootScope', '$firebase', 'FIREBASE_URL', function($rootScope, $firebase, FIREBASE_URL) {
    var errorMessages = {
        'INVALID_EMAIL' : 'The Email address is not well formed.',
        'INVALID_USER' : 'The User does not exist.',
        'INVALID_PASSWORD' : 'The Password is undefined.',
        'DEFAULT_ERROR' : 'The service is currently unavailable. Please contact your support.'
    };
    var base = new Firebase(FIREBASE_URL);
    var auth = new FirebaseSimpleLogin(base, function(error, user) {
		if (error) {
            // an error occurred while attempting login
            var errorMsg = {
                code : null,
                message : null
            };
            switch (error.code) {
                case 'INVALID_EMAIL' : 
                case 'INVALID_USER' :
                case 'INVALID_PASSWORD' :
                    errorMsg.code = error.code;
                    errorMsg.message = errorMessages[error.code];
                    break;
                default :
                    errorMsg.code = 'DEFAULT_ERROR';
                    errorMsg.message = errorMessages['DEFAULT_ERROR'];
                    break;
            }
            $rootScope.$broadcast('loginfailed', errorMsg);
		} else if (user) {
			// user authenticated with Firebase
            $rootScope.$broadcast('loginsucceeded', user);
		} else {
			// user is logged out
            $rootScope.$broadcast('logoutsucceeded');
		}
    });
    var service = {
        'ERROR_CODE' : {
            'INVALID_EMAIL' : 'INVALID_EMAIL' ,
            'INVALID_USER' : 'INVALID_USER',
            'INVALID_PASSWORD' : 'INVALID_PASSWORD',
            'DEFAULT_ERROR' : 'DEFAULT_ERROR'
        }
    };
    service.login = function(email, password) {
        auth.login('password', {
			email : email,
			password : password
		});
    };
    service.logout = function() {
        auth.logout();
    };
    service.getBase = function() {
        return base;
    };
    return service;
}]);
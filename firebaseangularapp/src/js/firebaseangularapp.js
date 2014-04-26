var firebaseangularapp = angular.module('firebaseangularapp', ['ngRoute', 'firebase', 'firebasemodule']);

firebaseangularapp.controller('MainCtrl', function MainCtrl($scope) {
  $scope.title = "Firebase and Angularjs Application";
  $scope.text = "This is an application implemented with Firebase and Angularjs framework. This application also shows you how to implement a login";
  $scope.welcome = "Welcome to ";
  $scope.user = firebaseangularmain.user;
});

firebaseangularapp.controller('LoginCtrl', ['$scope', '$firebase', 'firebaseservice', function LoginCtrl($scope, $firebase, firebaseservice) {
    $scope.logged = false;
    $scope.useremail = "";
    $scope.userpassword = "";
    $scope.error = null;
    $scope.emailFieldClasses = ['form-group'];
    $scope.passwordFieldClasses = ['form-group'];
    $scope.$on('loginfailed', function(e, args) {
        firebaseangularmain.logged = false;
        firebaseangularmain.user = null;
        $scope.logged = false;
        if ((args.code === firebaseservice.ERROR_CODE.INVALID_EMAIL) ||
            (args.code === firebaseservice.ERROR_CODE.INVALID_USER)) {
            if ($scope.emailFieldClasses.length === 1) {
                $scope.emailFieldClasses.push('has-error');
                $scope.emailFieldClasses.push('has-feedback');
            }
            if ($scope.passwordFieldClasses.length === 3) {
                $scope.passwordFieldClasses.pop();
                $scope.passwordFieldClasses.pop();
            }
        }
        else if (args.code === firebaseservice.ERROR_CODE.INVALID_PASSWORD) {
            if ($scope.passwordFieldClasses.length === 1) {
                $scope.passwordFieldClasses.push('has-error');
                $scope.passwordFieldClasses.push('has-feedback');
            }
            if ($scope.emailFieldClasses.length === 3) {
                $scope.emailFieldClasses.pop();
                $scope.emailFieldClasses.pop();
            }
        }
        else {
            if ($scope.emailFieldClasses.length === 3) {
                $scope.emailFieldClasses.pop();
                $scope.emailFieldClasses.pop();
            }
            if ($scope.passwordFieldClasses.length === 3) {
                $scope.passwordFieldClasses.pop();
                $scope.passwordFieldClasses.pop();
            }
        }
        $scope.error = args;
        $scope.$apply();
    });
    $scope.$on('loginsucceeded', function(e, args) {
        firebaseangularmain.logged = true;
        firebaseangularmain.user = args;
        $scope.logged = true;
        $scope.error = null;
        if ($scope.emailFieldClasses.length === 3) {
            $scope.emailFieldClasses.pop();
            $scope.emailFieldClasses.pop();
        }
        if ($scope.passwordFieldClasses.length === 3) {
            $scope.passwordFieldClasses.pop();
            $scope.passwordFieldClasses.pop();
        }
        $scope.$apply();
    });
    $scope.$on('logoutsucceeded', function(e, args) {
        firebaseangularmain.logged = false;
        firebaseangularmain.user = null;
        $scope.logged = false;
        $scope.error = null;
        $scope.$apply();
    });
    $scope.login = function() {
        if ((this.useremail !== "") && (this.userpassword !== "")) {
            firebaseservice.login(this.useremail, this.userpassword);
        }
    };
    $scope.logout = function() {
        firebaseservice.logout();
    };
}]);
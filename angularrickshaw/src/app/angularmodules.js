var rickshawapp = angular.module('rickshawapp', ['ngRoute', 'angularrickshaw']);
rickshawapp.controller('MainCtrl', function MainCtrl($scope) {
  $scope.text = "The aim of this code example is to show how to implement some angular directives for integrating Rickshaw framework in Angularjs.";
  $scope.title = "Test Angular Rickshaw";
  $scope.inputColor = "steelblue";
  $scope.graphcolor = "steelblue";
  $scope.inputHeight = 100;
  $scope.graphheight = 100;
  $scope.inputWidth = 200;
  $scope.graphwidth = 200;
  $scope.graphdata = [{x:0,y:0}];
  $scope.graphIndex = 1;
  $scope.inputData = 0;
  $scope.changeColor = function() {
    if (($scope.inputColor != null) && ($scope.inputColor !== "")) {
      $scope.graphcolor = $scope.inputColor;
    }
  };
  $scope.addData = function() {
    if (($scope.inputData != null) && ($scope.inputData !== "")) {
      $scope.graphdata.push({x : $scope.graphIndex, y : parseInt($scope.inputData, 10)});
      $scope.graphIndex++;
    }
  };
  $scope.changeHeight = function() {
    if (($scope.inputHeight != null) && ($scope.inputHeight !== "")) {
      $scope.graphheight = parseInt($scope.inputHeight, 10);
    }
  };
  $scope.changeWidth = function() {
    if (($scope.inputWidth != null) && ($scope.inputWidth !== "")) {
      $scope.graphwidth = parseInt($scope.inputWidth, 10);
    }
  };
});

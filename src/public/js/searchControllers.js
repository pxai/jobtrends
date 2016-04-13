'use strict';

/* Controllers */

var jobCuatrovientosSearchControllers = angular.module('jobCuatrovientosSearchControllers', ['chart.js']);

jobCuatrovientosSearchControllers.controller('JobCuatrovientosSearchCtrl', ['$scope', '$location', 'ReportTechnologyProvince',
    function($scope,$location,ReportTechnologyProvince) {
        console.log('Inside search');
        $scope.searchResultMessage = 'No se encontraron resultados';
       
        
        $scope.search = function () {
           console.log('Try to search');
           console.log('searching: ' + $scope.query);
       
           var results = ReportTechnologyProvince.query({tech:$scope.query}, function () {
               console.log('results:');
               console.log(results);
               $scope.searchResult = results;
               console.log('changing location');
               $location.path('/search');
           });

            console.log();
           /*, function (data) {
               console.log('search results');
               if (data) {
                   console.log('data found.');
               }
           });*/

        };


  }]);
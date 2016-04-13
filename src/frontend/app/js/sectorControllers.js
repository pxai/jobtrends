'use strict';

/* Controllers */

var jobCuatrovientosSectorControllers = angular.module('jobCuatrovientosSectorControllers', ['chart.js']);

jobCuatrovientosSectorControllers.controller('JobCuatrovientosSectorCtrl', ['$scope', '$routeParams', '$location', 'ReportSector',
    function($scope, $routeParams,$location,ReportSector) {
       
       $scope.sectorData = ReportSector.query({nameSector: $routeParams.nameSector});
       //$scope.sectorData = [{'category':'A','labels':['L1','L2','L3'],'data':[45,67,24]}];
       $scope.sector = 'This sector';

  }]);
  
jobCuatrovientosSectorControllers.controller('JobCuatrovientosSkillCtrl', ['$scope', '$routeParams', '$location', 'ReportSkill',
    function($scope, $routeParams,$location,ReportSkill) {
       
       $scope.skillData = ReportSkill.query({nameSector: $routeParams.nameSector});
       //$scope.sectorData = [{'category':'A','labels':['L1','L2','L3'],'data':[45,67,24]}];
       $scope.skill = 'This sector';

  }]);


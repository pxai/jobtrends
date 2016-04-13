'use strict';

/* Controllers */

var jobCuatrovientosControllers = angular.module('jobCuatrovientosControllers', ['chart.js']);

jobCuatrovientosControllers.controller('JobCuatrovientosListCtrl', ['$scope', 'Reports', 'ReportCategory','ReportSubcategory','ReportStudy','ReportAutonomy', 
    function($scope, Reports, ReportCategory, ReportSubcategory, ReportStudy, ReportAutonomy) {

        $scope.orderProp = 'date';
        $scope.reportDataCategory = ReportCategory.query();
        $scope.reportDataSubcategory = ReportSubcategory.query();
        $scope.reportDataAutonomy = ReportAutonomy.query();
        //$scope.reportDataProvince = ReportProvince.query();
        $scope.reportDataStudy = ReportStudy.query();
        $scope.series = ['Ofertas'];

  }]);

jobCuatrovientosControllers.controller('JobCuatrovientosDetailCtrl', ['$scope', '$routeParams', 'Report',
    function($scope, $routeParams, Report) {
        $scope.report = Report.get({reportId: $routeParams.reportId}, function(report) {
          $scope.mainImageUrl = report.images[0];
        });

        $scope.setImage = function(imageUrl) {
          $scope.mainImageUrl = imageUrl;
        }
  }]);


jobCuatrovientosControllers.controller('JobCuatrovientosAboutCtrl', ['$scope', 
    function($scope) {
        $scope.title = '2015 - Cuatrovientos Centro Integrado';
  }]);
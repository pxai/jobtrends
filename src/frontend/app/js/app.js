'use strict';

/* App Module */

var jobCuatrovientosApp = angular.module('jobCuatrovientosApp', [
  'ngRoute',
  'jobCuatrovientosAnimations',
  'jobCuatrovientosControllers',
  'jobCuatrovientosSearchControllers',
  'jobCuatrovientosSectorControllers',
  'jobCuatrovientosFilters',
  'jobCuatrovientosServices'
]);

jobCuatrovientosApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/reports', {
        templateUrl: 'partials/report-list.html',
        controller: 'JobCuatrovientosListCtrl'
      }).
      when('/reports/sector/:nameSector', {
        templateUrl: 'partials/report-sector.html',
        controller: 'JobCuatrovientosSectorCtrl'
      }).
      when('/reports/skill/:nameSector', {
        templateUrl: 'partials/report-skill.html',
        controller: 'JobCuatrovientosSkillCtrl'
      }).
      when('/reports/:reportId', {
        templateUrl: 'partials/report-detail.html',
        controller: 'JobCuatrovientosDetailCtrl'
      }).
      when('/search', {
        templateUrl: 'partials/report-search.html',
        controller: 'JobCuatrovientosSearchCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'JobCuatrovientosAboutCtrl'
      }).
      otherwise({
        redirectTo: '/reports'
      });
  }]);

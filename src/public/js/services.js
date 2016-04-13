'use strict';

/* Services */

var jobCuatrovientosServices = angular.module('jobCuatrovientosServices', ['ngResource']);

jobCuatrovientosServices.factory('Report', ['$resource',
  function($resource){
    return $resource('reports/report.:reportId.json', {}, {
      query: {method:'GET', params:{reportId:'1'}, isArray:false}
    });
  }]);
  
  
jobCuatrovientosServices.factory('Reports', ['$resource',
  function($resource){
    return $resource('/api/reports/general', {}, {
    //return $resource('reports/reports.json', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);
  
 jobCuatrovientosServices.factory('ReportProvince', ['$resource',
  function($resource){
    return $resource('reports/report.province.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);
  
 jobCuatrovientosServices.factory('ReportAutonomy', ['$resource',
  function($resource){
    return $resource('/api/reports/autonomy', {}, {
    //return $resource('reports/report.autonomy.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);
  
 jobCuatrovientosServices.factory('ReportStudy', ['$resource',
  function($resource){
    return $resource('/api/reports/study', {}, {
    //return $resource('reports/report.autonomy.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);
  
  
 jobCuatrovientosServices.factory('ReportTechnologyProvince', ['$resource',
  function($resource){
        return $resource('reports/report.:tech.json', {}, {
            query: {method:'GET', params:{tech:'java'}, isArray:false}
        });
  }]);
  
 jobCuatrovientosServices.factory('ReportCategory', ['$resource',
  function($resource){
    return $resource('/api/reports/category', {}, {
    //return $resource('reports/report.autonomy.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);
  
 jobCuatrovientosServices.factory('ReportSubcategory', ['$resource',
  function($resource){
    return $resource('/api/reports/subcategory', {}, {
    //return $resource('reports/report.autonomy.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);
  
  jobCuatrovientosServices.factory('ReportSector', ['$resource',
  function($resource){
    return $resource('/api/reports/sector/:nameSector', {}, {
      query: {method:'GET', params:{nameSector:'name'}, isArray:true}
    });
  }]);
  
 jobCuatrovientosServices.factory('ReportSkill', ['$resource',
  function($resource){
    return $resource('/api/reports/skill/:nameSector', {}, {
      query: {method:'GET', params:{nameSector:'name'}, isArray:true}
    });
  }]);
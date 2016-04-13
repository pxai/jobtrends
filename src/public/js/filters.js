'use strict';

/* Filters */

angular.module('jobCuatrovientosFilters', []).filter('isPublished', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

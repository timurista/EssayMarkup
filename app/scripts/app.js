'use strict';

/**
 * @ngdoc overview
 * @name essayMarkupV1App
 * @description
 * # essayMarkupV1App
 *
 * Main module of the application.
 */
angular
  .module('essayMarkupV1App', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'textAngular',
    'autoGrader',
    'GradeService'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Data', function() {
    //shared data
    return {
      text: 'this is text',
  }
  });

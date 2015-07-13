'use strict';

/**
 * Config for the router
 */
app.config(
  ['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .otherwise(function() {
          return '/app/home';
        });
      $stateProvider
        .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'index.html'
        })

        .state('app.home', {
          url: '/home',
          templateUrl: 'templates/pages/home.html',
          controller: 'HomeCtrl'
        })
    }
  ]
);


/* global angular, console, appConfig */
(function() {
  "use strict";

  angular

  .module('app', [
      'ui.router',
      'app.core'
    ])

  .config(['$stateProvider', '$urlRouterProvider', Routes])
  ;

  function Routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/modules/core/home/home.html',
      })
      .state('tutorial', {
        url: '/tutorial',
        templateUrl: 'app/modules/tutorial/tutorial.html',
      })
      .state('systemSetup', {
        url: '/systemSetup',
        templateUrl: 'app/modules/tutorial/system-setup.html',
      })
      .state('systemSetup2', {
        url: '/systemSetup2',
        templateUrl: 'app/modules/tutorial/system-setup2.html',
      })
      .state('gettingStarted', {
        url: '/gettingStarted',
        templateUrl: 'app/modules/tutorial/getting-started.html',
      })
      .state('gettingStarted2', {
        url: '/gettingStarted2',
        templateUrl: 'app/modules/tutorial/getting-started2.html',
      })
      .state('gettingStarted3', {
        url: '/gettingStarted3',
        templateUrl: 'app/modules/tutorial/getting-started3.html',
      })
      .state('realTimeChat', {
        url: '/realTimeChat',
        templateUrl: 'app/modules/tutorial/real-time-chat.html',
      })
      .state('security', {
        url: '/security',
        templateUrl: 'app/modules/tutorial/security.html',
      })
      .state('privateMessages', {
        url: '/privateMessages',
        templateUrl: 'app/modules/tutorial/private-messages.html',
      })
      .state('challengesImages', {
        url: '/challengesImages',
        templateUrl: 'app/modules/tutorial/challenges-images.html',
      })
      .state('challengesCordova', {
        url: '/challengesCordova',
        templateUrl: 'app/modules/tutorial/challenges-cordova.html',
      })
      ;
  }

}());

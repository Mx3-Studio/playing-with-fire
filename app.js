/* global angular, console, appConfig */
(function() {
  "use strict";

  angular

  .module('app', [
      'ui.router',
      'app.core'
    ])

  .config(['$stateProvider', Routes])
  .run(['$state', States]);

  function Routes($stateProvider) {
    var home = {
      name: 'home',
      url: '/',
      templateUrl: 'app/modules/core/home/home.html'
    };
    var tutorial = {
      name: 'tutorial',
      url: 'tutorial',
      templateUrl: 'app/modules/tutorial/tutorial.html'
    };
    var systemSetup = {
      name: 'systemSetup',
      url: 'systemSetup',
      templateUrl: 'app/modules/tutorial/system-setup.html'
    };
    var systemSetup2 = {
      name: 'systemSetup2',
      url: 'systemSetup2',
      templateUrl: 'app/modules/tutorial/system-setup2.html'
    };
    var gettingStarted = {
      name: 'gettingStarted',
      url: 'gettingStarted',
      templateUrl: 'app/modules/tutorial/getting-started.html'
    };
    var gettingStarted2 = {
      name: 'gettingStarted2',
      url: 'gettingStarted2',
      templateUrl: 'app/modules/tutorial/getting-started2.html'
    };
    var gettingStarted3 = {
      name: 'gettingStarted3',
      url: 'gettingStarted3',
      templateUrl: 'app/modules/tutorial/getting-started3.html'
    };
    var realTimeChat = {
      name: 'realTimeChat',
      url: 'realTimeChat',
      templateUrl: 'app/modules/tutorial/real-time-chat.html'
    };
    var security = {
      name: 'security',
      url: 'security',
      templateUrl: 'app/modules/tutorial/security.html'
    };
    $stateProvider.state(home);
    $stateProvider.state(tutorial);
    $stateProvider.state(systemSetup);
    $stateProvider.state(systemSetup2);
    $stateProvider.state(gettingStarted);
    $stateProvider.state(gettingStarted2);
    $stateProvider.state(gettingStarted3);
    $stateProvider.state(realTimeChat);
    $stateProvider.state(security);
  }

  function States($state) {
    $state.transitionTo('home');
  }


}());

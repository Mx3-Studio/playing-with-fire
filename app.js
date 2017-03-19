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
    $stateProvider.state(home);
    $stateProvider.state(tutorial);
  }

  function States($state) {
    $state.transitionTo('home');
  }


}());

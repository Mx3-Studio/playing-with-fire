/* global angular, console, appConfig */
(function() {
  "use strict";

  angular

  .module('app', [
      'ui.router',
      'app.core',
      'app.tutorial',
      'app.introduction',
      'app.systemSetup',
      'app.gettingStarted',
      'app.consumeData',
      'app.writtingData'
    ])

  .config(['$stateProvider', '$urlRouterProvider', Routes])
  .controller('MainController', MainController);

  function MainController($scope, $state, $rootScope) {
    var vm = this;
    // vm.introduction = true;
    vm.writtingData = true;

    vm.year = new Date().getFullYear();

    vm.isExpanded = function (c) {
      vm[c] ? (vm[c] = false) : (vm[c] = true);
      console.log('vm[c]', vm);
    };
    var sections = {
      'Introduction' : 'introduction',
      'System Setup': 'systemSetup',
      'Getting Started': 'gettingStarted',
      'Consuming Data': 'consumeData',
      'Writting Data': 'writtingData'
    };

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParam, fromState, fromParams) {
      console.log(toState.section);
      angular.forEach(sections, function(s) {
        console.log(s);
        if (s !== toState.section) { vm[s] = false; }
      });
      vm[sections[toState.section]] = true;
    });


  }


  function Routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/modules/core/home/home.html'
      })
      .state('tutorial', {
        url: '/tutorial',
        controller: 'IntroductionController as vm',
        title: 'Tutorial',
        section: 'Introduction',
        templateUrl: 'app/modules/introduction/views/tutorial.html',
        next: {
            url: 'resources',
            title: 'Start Tutorial'
        },
      })

      .state('resources', {
        url: '/resources',
        templateUrl: 'app/modules/introduction/views/resources.html',
        controller: 'IntroductionController as vm',
        title: 'Resources',
        section: 'Introduction',
        previous: {
          url: 'tutorial',
          title: 'Tutorial'
        },
        next: {
            url: 'firebase',
            title: 'What is Firebase?'
        }
      })
      .state('firebase', {
        url: '/firebase',
        templateUrl: 'app/modules/introduction/views/firebase.html',
        controller: 'IntroductionController as vm',
        title: 'What is Firebase?',
        section: 'Introduction',
        previous: {
          url: 'resources',
          title: 'Resources'
        },
        next: {
            url: 'goals',
            title: 'Workshop Goals'
        }
      })
      .state('goals', {
        url: '/goals',
        templateUrl: 'app/modules/introduction/views/goals.html',
        controller: 'IntroductionController as vm',
        title: 'Workshop Goals',
        section: 'Introduction',
        previous: {
          url: 'firebase',
          title: 'What is Firebase?'
        },
        next: {
            url: 'whoWeAre',
            title: 'Who We Are...'
        }
      })
      .state('whoWeAre', {
        url: '/who-we-are',
        templateUrl: 'app/modules/introduction/views/whoWeAre.html',
        controller: 'IntroductionController as vm',
        title: 'Who We Are...',
        section: 'Introduction',
        previous: {
          url: 'goals',
          title: 'Workshop Goals'
        },
        next: {
            url: 'systemSetup',
            title: 'Install Prerequisites'
        }
      })

      .state('systemSetup', {
        url: '/install-prerequisites',
        templateUrl: 'app/modules/system-setup/views/system-setup.html',
        controller: 'InstallPrerequisitesController as vm',
        section: 'System Setup',
        title: 'Install Prerequisites',
        previous: {
            title: 'Who We Are...',
            url: 'whoWeAre'
        },
        next: {
          url: 'systemSetup2',
          title: 'Install & Test Starter App'
        }
      })
      .state('systemSetup2', {
        url: '/install-and-test-starter-app',
        templateUrl: 'app/modules/system-setup/views/system-setup2.html',
        controller: 'SystemSetupController as vm',
        section: 'System Setup',
        title: 'Install & Test Starter App',
        previous: {
            title: 'Install Prerequisites',
            url: 'systemSetup'
        },
        next: {
          url: 'gettingStarted',
          title: 'Setup Firebase Console Account'
        }
      })

      .state('gettingStarted', {
        url: '/setup-firebase-console-account',
        templateUrl: 'app/modules/getting-started/views/getting-started.html',
        controller: 'GettingStartedController as vm',
        title: 'Setup Firebase Console Account',
        section: 'Getting Started',
        previous: {
          title: 'Install & Test Started App',
          url: 'systemSetup2'
        },
        next: {
          title: 'Load Starter Database',
          url: 'gettingStarted2'
        }
      })
      .state('gettingStarted2', {
        url: '/load-starter-app',
        templateUrl: 'app/modules/getting-started/views/getting-started2.html',
        controller: 'GettingStartedController as vm',
        title: 'Load Starter Database',
        section: 'Getting Started',
        previous: {
          title: 'Setup Firebase Console Account',
          url: 'gettingStarted'
        },
        next: {
          title: 'Configure App Initialization',
          url: 'gettingStarted3'
        }
      })
      .state('firebaseAPI', {
        url: '/firebase-api',
        templateUrl: 'app/modules/getting-started/views/firebase-api.html',
        controller: 'GettingStartedController as vm',
        title: 'Firebase API',
        section: 'Getting Started',
        previous: {
          title: 'Load Starter Database',
          url: 'gettingStarted2'
        },
        next: {
          title: 'Configure App Initialization',
          url: 'gettingStarted3'
        }
      })
      .state('gettingStarted3', {
        url: '/configure-app-initialization',
        templateUrl: 'app/modules/getting-started/views/getting-started3.html',
        controller: 'GettingStartedController as vm',
        title: 'Configure App Initialization',
        section: 'Getting Started',
        previous: {
          title: 'Firebase API',
          url: 'firebaseAPI'
        },
        next: {
          title: 'Reading Data',
          url: 'readingData'
        }
      })

      .state('readingData', {
        url: '/reading-data',
        templateUrl: 'app/modules/consume-data/views/read-data.html',
        controller: 'ConsumeDataController as vm',
        title: 'Reading Data',
        section: 'Consuming Data',
        previous: {
          title: 'Firebase API',
          url: 'firebaseAPI'
        },
        next: {
          title: 'Advanced Read',
          url: 'advancedRead'
        }
      })
      .state('advancedRead', {
        url: '/advanced-read',
        templateUrl: 'app/modules/consume-data/views/advanced-read.html',
        controller: 'ConsumeDataController as vm',
        title: 'Advanced Read',
        section: 'Consuming Data',
        previous: {
          title: 'Reading Data',
          url: 'readingData'
        },
        next: {
          title: 'Display Messages',
          url: "displayMessages"
        }
      })
      .state('displayMessages', {
        url: '/display-messages',
        templateUrl: 'app/modules/consume-data/views/display-messages.html',
        controller: 'ConsumeDataController as vm',
        title: 'Display Messages',
        section: 'Consuming Data',
        previous: {
          title: 'Advanced Read',
          url: 'advancedRead'
        },
        next: {
          title: 'Push',
          url: 'writtingData'
        }
      })

      .state('writtingData', {
        url: '/writting-data',
        templateUrl: 'app/modules/writting-data/views/writting-data.html',
        controller: 'writtingDataController as vm',
        title: 'Push',
        section: 'Writting Data',
        previous: {
          title: 'Display Messages',
          url: 'displayMessages'
        },
      })


      .state('realTimeChat', {
        url: '/realTimeChat',
        templateUrl: 'app/modules/tutorial/real-time-chat.html',
      })
      .state('security', {
        url: '/security',
        templateUrl: 'app/modules/tutorial/security.html',
      })
      .state('deployToFirebaseHosting', {
        url: '/deployToFirebaseHosting',
        templateUrl: 'app/modules/tutorial/deploy-to-firebase-hosting.html',
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

/* global angular, console, appConfig */
(function() {
  "use strict";

  angular

  .module('app', [
      'ui.router',
      'angulartics',
      'angulartics.google.analytics',
      'ngAnimate',
      'app.core',
      'app.tutorial',
      'app.introduction',
      'app.systemSetup',
      'app.gettingStarted',
      'app.realTimeChat',
      'app.authAndSecurity',
      'app.privateChat',
      'app.cliAndHosting',
      'app.firebaseStorage',
      'app.challenges',
      'app.closingRemarks'
    ])

  .config(['$stateProvider', '$urlRouterProvider', Routes])

  .controller('MainController', MainController);

  function MainController($scope, $state, $rootScope, $location, $timeout) {
    var notesPopup = {};
    var vm = this;
    // vm.introduction = true;
    vm.writingData = true;

    vm.year = new Date().getFullYear();

    vm.isExpanded = function (c) {
      vm[c] = vm[c] ? false : true;
      var element = '#' + c;
      jQuery(element).slideToggle();
    };
    var sections = {
      'Introduction' : 'introduction',
      'System Setup': 'systemSetup',
      'Getting Started': 'gettingStarted',
      'Real Time Chat': 'realTimeChat',
      'Authentication & Security': 'authAndSecurity',
      'Private Chat': 'privateChat',
      'Firebase CLI & Hosting': 'cliAndHosting',
      'Firebase Storage': 'firebaseStorage',
      'Challenges': 'challenges',
      'Closing Remarks': 'closingRemarks'
    };

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParam, fromState, fromParams) {
      refreshNotes();
      angular.forEach(sections, function(s) {
        var element = '#' + s;
        if (s !== sections[toState.section]) {
          vm[s] = false;
          jQuery(element).slideUp();
        }
      });
      var current = '#' + sections[toState.section];
      if (!vm[sections[toState.section]]) {
        vm[sections[toState.section]]  = true;
        jQuery(current).slideDown();
      }
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      $state.go('error');
    });
    $rootScope.$on('$stateNotFound', function(event, toState, toParams, fromState, fromParams, error) {
      $state.go('error');
    });

    //Provide Keyboard & Remote Support
    vm.keyaction = function(ev) {
      //console.log('key', ev.keyCode);
      switch(ev.keyCode) {
        case /*s*/ 83: case /*n*/ 78:
          notesPopup = window.open("", "pwf:notes", "height=400,width=600,location=no,menubar=no,status=no,toolbar=no");
          refreshNotes();
          break;
        case /*linux:remote.blank*/ 190: case /*mac:remote.blank*/ 66:
          $(window.document.body).toggle();
          break;
        case /*remote.right*/ 34: case /*key.right*/ 39:
          window.location = $('.next').attr('href');
          break;
        case /*remote.left*/ 33: case /*key.left*/ 37:
          window.location = $('.previous').attr('href');
          break;
      }
    };

    //Update the Notes Popup
    function refreshNotes() {
      if(notesPopup && notesPopup.document) {
        /* Something really strange is going on that seems to be based upon calling thihs method
           from the stateChangeSuccess event. For some reason both pages content are availble to
           JQuery in this context, so we do some juggling to handle this odd case.
        */
        var len = (notesPopup.blank === false) ? true : false;

        $timeout(function() {
          //Set Window Title
          notesPopup.document.title = "Notes: " + $($('h1').get(0)).text();
          //Set Note Content
          var notes = $('.notes');
          notesPopup.blank = notes.length <= len;
          $(notesPopup.document.body).html( notes.length>len ? notes.html() : '<p></p>' );
        }, 200);
      }
    }

  }


  function Routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('error');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/modules/core/home/home.html'
      })
      .state('root', {
        url: '',
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
      .state('error', {
        url: '/error',
        templateUrl: 'app/modules/core/components/error.html'
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
        templateUrl: 'app/modules/real-time-chat/views/read-data.html',
        controller: 'RealTimeChatController as vm',
        title: 'Reading Data',
        section: 'Real Time Chat',
        previous: {
          title: 'Configure App Initialization',
          url: 'gettingStarted3'
        },
        next: {
          title: 'Advanced Read',
          url: 'advancedRead'
        }
      })
      .state('advancedRead', {
        url: '/advanced-read',
        templateUrl: 'app/modules/real-time-chat/views/advanced-read.html',
        controller: 'RealTimeChatController as vm',
        title: 'Advanced Read',
        section: 'Real Time Chat',
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
        templateUrl: 'app/modules/real-time-chat/views/display-messages.html',
        controller: 'RealTimeChatController as vm',
        title: 'Display Messages',
        section: 'Real Time Chat',
        previous: {
          title: 'Advanced Read',
          url: 'advancedRead'
        },
        next: {
          title: 'Push',
          url: 'push'
        }
      })

      .state('push', {
        url: '/push',
        templateUrl: 'app/modules/real-time-chat/views/push.html',
        controller: 'RealTimeChatController as vm',
        title: 'Push',
        section: 'Real Time Chat',
        previous: {
          title: 'Display Messages',
          url: 'displayMessages'
        },
        next: {
          title: 'Set',
          url: 'set'
        }
      })
      .state('set', {
        url: '/set',
        templateUrl: 'app/modules/real-time-chat/views/set.html',
        controller: 'RealTimeChatController as vm',
        title: 'Set',
        section: 'Real Time Chat',
        previous: {
          title: 'Push',
          url: 'push'
        },
        next: {
          title: 'Update',
          url: 'update'
        }
      })
      .state('update', {
        url: '/update',
        templateUrl: 'app/modules/real-time-chat/views/update.html',
        controller: 'RealTimeChatController as vm',
        title: 'Update',
        section: 'Real Time Chat',
        previous: {
          title: 'Set',
          url: 'set'
        },
        next: {
          title: 'Advanced Write - Update',
          url: 'advancedWriteUpdate'
        }
      })
      .state('advancedWriteUpdate', {
        url: '/advanced-write-update',
        templateUrl: 'app/modules/real-time-chat/views/advanced-write-update.html',
        controller: 'RealTimeChatController as vm',
        title: 'Advanced Write - Update',
        section: 'Real Time Chat',
        previous: {
          title: 'Update',
          url: 'update'
        },
        next: {
          title: 'Create Messages',
          url: 'createMessages'
        }
      })
      .state('createMessages', {
        url: '/create-messages',
        templateUrl: 'app/modules/real-time-chat/views/create-messages.html',
        controller: 'RealTimeChatController as vm',
        title: 'Create Messages',
        section: 'Real Time Chat',
        previous: {
          title: 'Advanced Write - Update',
          url: 'advancedWriteUpdate'
        },
        next: {
          title: 'Firebase CLI',
          url: 'firebaseCli'
        }
      })

      .state('firebaseCli', {
        url: '/firebase-cli',
        templateUrl: 'app/modules/cli-and-hosting/views/firebase-cli.html',
        controller: 'CliAndHostingController as vm',
        title: 'Firebae CLI',
        section: 'Firebase CLI & Hosting',
        previous: {
          title: 'Create Messages',
          url: 'createMessages'
        },
        next: {
          title: 'Deploy to Firebase Hosting',
          url: 'deployToFirebaseHosting'
        }
      })
      .state('deployToFirebaseHosting', {
        url: '/deploy-to-firebase-hosting',
        templateUrl: 'app/modules/cli-and-hosting/views/deploy-to-firebase-hosting.html',
        controller: 'CliAndHostingController as vm',
        title: 'Deploy to Firebase Hosting',
        section: 'Firebase CLI & Hosting',
        previous: {
          title: 'Firebase CLI',
          url: 'firebaseCli'
        },
        next: {
          title: 'Firebase Hosting',
          url: 'firebaseHosting'
        }
      })
      .state('firebaseHosting', {
        url: '/firebase-hosting',
        templateUrl: 'app/modules/cli-and-hosting/views/firebase-hosting.html',
        controller: 'CliAndHostingController as vm',
        title: 'Firebase Hosting',
        section: 'Firebase CLI & Hosting',
        previous: {
          title: 'Deploy to Firebase Hosting',
          url: 'deployToFirebaseHosting'
        },
        next: {
          title: 'Firebase Authentication',
          url: 'firebaseAuthentication'
        }
      })

      .state('firebaseAuthentication', {
        url: '/firebase-authentication',
        templateUrl: 'app/modules/auth-and-security/views/firebase-authentication.html',
        controller: 'AuthAndSecurityController as vm',
        title: 'Firebase Authentication',
        section: 'Authentication & Security',
        previous: {
          title: 'Firebase Hosting',
          url: 'firebaseHosting'
        },
        next: {
          title: 'Adding Authentication',
          url: 'addingAuthentication'
        }
      })
      .state('addingAuthentication', {
        url: '/adding-authentication',
        templateUrl: 'app/modules/auth-and-security/views/adding-authentication.html',
        controller: 'AuthAndSecurityController as vm',
        title: 'Adding Authentication',
        section: 'Authentication & Security',
        previous: {
          title: 'Firebase Authentication',
          url: 'firebaseAuthentication'
        },
        next: {
          title: 'Application Security',
          url: 'applicationSecurity'
        }
      })
      .state('applicationSecurity', {
        url: '/application-security',
        templateUrl: 'app/modules/auth-and-security/views/application-security.html',
        controller: 'AuthAndSecurityController as vm',
        title: 'Application Security',
        section: 'Authentication & Security',
        previous: {
          title: 'Adding Authentication',
          url: 'addingAuthentication'
        },
        next: {
          title: 'Adding Application Security',
          url: 'addingSecurity'
        }
      })
      .state('addingSecurity', {
        url: '/adding-security',
        templateUrl: 'app/modules/auth-and-security/views/adding-security.html',
        controller: 'AuthAndSecurityController as vm',
        title: 'Adding Application Security',
        section: 'Authentication & Security',
        previous: {
          title: 'Application Security',
          url: 'applicationSecurity'
        },
        next: {
          title: 'Authorization',
          url: 'authorization'
        }
      })
      .state('authorization', {
        url: '/authorization',
        templateUrl: 'app/modules/auth-and-security/views/authorization.html',
        controller: 'AuthAndSecurityController as vm',
        title: 'Authorization',
        section: 'Authentication & Security',
        previous: {
          title: 'Adding Application Security',
          url: 'addingSecurity'
        },
        next: {
          title: 'Adding Authorization',
          url: 'addingAuthorization'
        }
      })
      .state('addingAuthorization', {
        url: '/adding-authorization',
        templateUrl: 'app/modules/auth-and-security/views/adding-authorization.html',
        controller: 'AuthAndSecurityController as vm',
        title: 'Adding Authorization',
        section: 'Authentication & Security',
        previous: {
          title: 'Authorization',
          url: 'authorization'
        },
        next: {
          title: 'Database Security',
          url: 'databaseSecurity'
        }
      })
      .state('databaseSecurity', {
        url: '/database-security',
        templateUrl: 'app/modules/auth-and-security/views/database-security.html',
        controller: 'AuthAndSecurityController as vm',
        title: 'Database Security',
        section: 'Authentication & Security',
        previous: {
          title: 'Adding Authorization',
          url: 'addingAuthorization'
        },
        next: {
          title: 'Adding Database Security',
          url: 'addingDatabaseSecurity'
        }
      })
      .state('addingDatabaseSecurity', {
        url: '/adding-database-security',
        templateUrl: 'app/modules/auth-and-security/views/adding-database-security.html',
        controller: 'AuthAndSecurityController as vm',
        title: 'Adding Database Security',
        section: 'Authentication & Security',
        previous: {
          title: 'Database Security',
          url: 'databaseSecurity'
        },
        next: {
          title: 'Firebase Query',
          url: 'firebaseQuery'
        }
      })

      .state('firebaseQuery', {
        url: '/fireabase-query',
        templateUrl: 'app/modules/private-chat/views/firebase-query.html',
        controller: 'PrivateChatController as vm',
        title: 'Fireabase Query',
        section: 'Private Chat',
        previous: {
          title: 'Adding Database Security',
          url: 'addingDatabaseSecurity'
        },
        next: {
          title: 'Private Chat Search',
          url: 'privateChatSearch'
        }
      })
      .state('privateChatSearch', {
        url: '/priave-chat-search',
        templateUrl: 'app/modules/private-chat/views/private-chat-search.html',
        controller: 'PrivateChatController as vm',
        title: 'Private Chat Search',
        section: 'Private Chat',
        previous: {
          title: 'Firebase Query',
          url: 'firebaseQuery'
        },
        next: {
          title: 'Advanced Read - watch()',
          url: 'advancedReadWatch'
        }
      })
      .state('advancedReadWatch', {
        url: '/advanced-read-watch',
        templateUrl: 'app/modules/private-chat/views/advanced-read-watch.html',
        controller: 'PrivateChatController as vm',
        title: 'Advanced Read - $watch(callback, context)',
        section: 'Private Chat',
        previous: {
          title: 'Private Chat Search',
          url: 'privateChatSearch'
        },
        next: {
          title: 'Private Chat Messages',
          url: 'privateChatMessages'
        }
      })
      .state('privateChatMessages', {
        url: '/privateChatMessages',
        templateUrl: 'app/modules/private-chat/views/private-chat-messages.html',
        controller: 'PrivateChatController as vm',
        title: 'Private Chat Messages',
        section: 'Private Chat',
        previous: {
          title: 'Advanced Read - $watch()',
          url: 'advancedReadWatch'
        },
        next: {
          title: 'Firebase Storage',
          url: 'firebaseStorage'
        }
      })



      .state('firebaseStorage', {
        url: '/firebase-storage',
        templateUrl: 'app/modules/firebase-storage/views/firebase-storage.html',
        controller: 'FirebaseStorageController as vm',
        title: 'Firebase Storage',
        section: 'Firebase Storage',
        previous: {
          title: 'Firebase Hosting',
          url: 'firebaseHosting'
        },
        next: {
          title: 'Read',
          url: 'firebaseStorageRead'
        }
      })
      .state('firebaseStorageRead', {
        url: '/firebase-storage-read',
        templateUrl: 'app/modules/firebase-storage/views/read.html',
        controller: 'FirebaseStorageController as vm',
        title: 'Read',
        section: 'Firebase Storage',
        previous: {
          title: 'Firebase Storage',
          url: 'firebaseStorage'
        },
        next: {
          title: 'Write',
          url: 'firebaseStorageWrite'
        }
      })
      .state('firebaseStorageWrite', {
        url: '/firebase-storage-write',
        templateUrl: 'app/modules/firebase-storage/views/write.html',
        controller: 'FirebaseStorageController as vm',
        title: 'Write',
        section: 'Firebase Storage',
        previous: {
          title: 'Read',
          url: 'firebaseStorageRead'
        },
        next: {
          title: 'Add Image To Chat',
          url: 'addImageToChat'
        }
      })
      .state('addImageToChat', {
        url: '/add-image-to-chat',
        templateUrl: 'app/modules/challenges/views/add-image-to-chat.html',
        controller: 'ChallengesController as vm',
        title: 'Add Image To Chat',
        section: 'Challenges',
        previous: {
          title: 'Write',
          url: 'firebaseStorageWrite'
        },
        next: {
          title: 'Deploy with Cordova',
          url: 'deployToCordova'
        }
      })
      .state('deployToCordova', {
        url: '/deploy-to-cordova',
        templateUrl: 'app/modules/challenges/views/challenges-cordova.html',
        controller: 'ChallengesController as vm',
        title: 'Deploy With Cordova',
        section: 'Challenges',
        previous: {
          title: 'Add Image To Chat',
          url: 'addImageToChat'
        },
        next: {
          title: 'Other Firebase Features',
          url: 'otherFirebaseFeatures'
        }
      })

      .state('otherFirebaseFeatures', {
        url: '/other-firebase-features',
        templateUrl: 'app/modules/closing-remarks/views/other-firebase-features.html',
        controller: 'ClosingRemarksController as vm',
        title: 'Other Firebase Features',
        section: 'Closing Remarks',
        previous: {
          title: 'Deploy With Cordova',
          url: 'deployToCordova'
        },
        next: {
          title: 'Finish',
          url: 'finish'
        }
      })
      .state('finish', {
        url: '/finish',
        templateUrl: 'app/modules/closing-remarks/views/finish.html',
        controller: 'ClosingRemarksController as vm',
        title: 'Playing With Fire',
        section: 'Closing Remarks',
        previous: {
          title: 'Other Firebase Features',
          url: 'otherFirebaseFeatures'
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
      .state('privateMessages', {
        url: '/privateMessages',
        templateUrl: 'app/modules/tutorial/private-messages.html',
      })
      .state('challengesImages', {
        url: '/challengesImages',
        templateUrl: 'app/modules/tutorial/challenges-images.html',
      });
  }

}());

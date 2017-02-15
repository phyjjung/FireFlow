// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter')

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    // ONBOARDING
    .state('onboarding', {
      url: '/onboarding',
      templateUrl: 'components/auth/views/onboarding.html',
      controller: 'AuthCtrl',
      resolve: {
					requireNoAuth: function ($state, Auth) {
						return Auth.$requireSignIn().then(function (auth) {
							$state.go('tab.home');
						}, function (error) {
							return;
						});
					}
				}
    })

    // TABS
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'components/app/views/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'components/home/views/home.index.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('tab.flow', {
      url: '/flow/{flowId}/{flowName}',
      views: {
        'tab-flowlist': {
          templateUrl: 'components/flow/views/flow.index.html',
          //FlowCtrl은 FlowlistController 파일안에 같이있음.
          controller: 'FlowCtrl'
        }
      }
    })

    .state('tab.flowlist', {
      url: '/flowlist',
      views: {
        'tab-flowlist': {
          templateUrl: 'components/flow/views/flowlist.index.html',
          controller: 'FlowListCtrl'
        }
      }
    })

    .state('tab.tweet', {
      url: '/tweet/:id',
      views: {
        'tab-home': {
          templateUrl: 'components/tweet/views/tweet.html',
          controller: 'TweetCtrl'
        }
      }
    })

    .state('tab.connect', {
      url: '/connect',
      views: {
        'tab-home': {
          templateUrl: 'components/home/views/connect.html',
          controller: 'ConnectCtrl'
        }
      }
    })

    .state('tab.connect_more', {
      url: '/connect_more',
      views: {
        'tab-home': {
          templateUrl: 'components/home/views/connect_more.html',
          controller: 'ConnectCtrl'
        }
      }
    })

    .state('tab.search', {
      url: '/search',
      views: {
        'tab-home': {
          templateUrl: 'components/home/views/search.html',
          controller: 'SearchCtrl'
        }
      }
    })

    .state('tab.searchResult', {
      url: '/search_result/:q',
      views: {
        'tab-home': {
          templateUrl: 'components/home/views/search_result.html',
          controller: 'SearchCtrl'
        }
      }
    })

    .state('tab.notifications', {
      url: '/notifications',
      resolve: {
                authuid: ['Auth', function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireSignIn();
        }]
                },

      views: {
        'tab-notifications': {
          templateUrl: 'components/notifications/views/notifications.index.html',
          controller: 'NotificationsCtrl'
        }
      }
    })

    // Have no idea why "tab.messages" didn't work properly. Got stuck with the tab views.
    .state('tab.chat', {
      url: '/chat',
      views: {
        'tab-chat': {
          templateUrl: 'components/chat/views/chat.index.html',
          controller: 'ChatCtrl'
        }
      }
    })

    .state('tab.conversation', {
      url: '/conversation/:id',
      views: {
        'tab-chat': {
          templateUrl: 'components/chat/views/chat.detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.me', {
      url: '/me',
      resolve: {
                profile: function(Users, Auth){
                    return Auth.$requireSignIn().then(function(auth){
                        return Users.getProfile(auth.uid).$loaded();
                    });
                }
            },
      views: {
        'tab-me': {
          templateUrl: 'components/me/views/me.index.html',
          controller: 'ProfileCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/onboarding');

});

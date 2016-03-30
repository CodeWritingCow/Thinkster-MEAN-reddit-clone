angular.module('app.states', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/views/home.html',
				controller: 'mainController',
				resolve: {
					postPromise: ['posts', function(posts) {
						return posts.getAll();
					}]
				}
			})
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: 'app/views/posts.html',
				controller: 'postsController',
				resolve: {
					post: ['$stateParams', 'posts', function($stateParams, posts) {
						return posts.get($stateParams.id);
					}]
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'app/views/login.html',
				controller: 'authController',
				onEnter: ['$state', 'auth', function($state, auth) {
					if (auth.isLoggedIn()) {
						$state.go('home');
					}
				}]
			})
			.state('register', {
				url: '/register',
				templateUrl: 'app/views/register.html',
				controller: 'authController',
				onEnter: ['$state', 'auth', function($state, auth) {
					if (auth.isLoggedIn()) {
						$state.go('home');
					}
				}]
			});

		$urlRouterProvider.otherwise('home');
}]);
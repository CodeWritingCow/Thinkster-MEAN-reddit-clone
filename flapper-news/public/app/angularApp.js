var app = angular.module('flapperNews', ['ui.router', 'navCtrl', 'authCtrl', 'authService', 'postsCtrl', 'mainCtrl']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'mainController',
				resolve: {
					postPromise: ['posts', function(posts) {
						return posts.getAll();
					}]
				}
			})
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'postsController',
				resolve: {
					post: ['$stateParams', 'posts', function($stateParams, posts) {
						return posts.get($stateParams.id);
					}]
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: '/login.html',
				controller: 'authController',
				onEnter: ['$state', 'auth', function($state, auth) {
					if (auth.isLoggedIn()) {
						$state.go('home');
					}
				}]
			})
			.state('register', {
				url: '/register',
				templateUrl: '/register.html',
				controller: 'authController',
				onEnter: ['$state', 'auth', function($state, auth) {
					if (auth.isLoggedIn()) {
						$state.go('home');
					}
				}]
			});

		$urlRouterProvider.otherwise('home');
}]);




app.factory('posts', ['$http', 'auth', function($http, auth){
	var o = {
		posts: []
	};

	o.getAll = function() {
		return $http.get('/posts').success(function(data) {
			angular.copy(data, o.posts);
		});
	};

	o.create = function(post) {
		return $http.post('/posts', post, {
			headers: { Authorization: 'Bearer ' + auth.getToken() }
		}).success(function(data) {
			o.posts.push(data);
		});
	};

	o.upvote = function(post) {
		return $http.put('/posts/' + post._id + '/upvote', null, {
			headers: { Authorization: 'Bearer ' + auth.getToken() }
		})
		.success(function(data) {
			post.upvotes += 1;
		});
	};

	o.get = function(id) {
		return $http.get('/posts/' + id).then(function(res) {
			return res.data;
		});
	};

	o.addComment = function(id, comment) {
		return $http.post('/posts/' + id + '/comments', comment, {
			headers: { Authorization: 'Bearer ' + auth.getToken() }
		});
	};

	o.upvoteComment = function(post, comment) {
		return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
			headers: { Authorization: 'Bearer ' + auth.getToken() }
		}).success(function(data) {
			comment.upvotes +=1;
		});
	};

	return o;

}]);
angular.module('postsService', [])

.factory('posts', ['$http', 'auth', function($http, auth){
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

	o.downvote = function(post) {
		return $http.put('/posts/' + post._id + '/downvote', null, {
			headers: { Authorization: 'Bearer ' + auth.getToken() }
		})
		.success(function(data) {
			post.downvotes += 1;
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

	o.downvoteComment = function(post, comment) {
		return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/downvote', null, {
			headers: { Authorization: 'Bearer ' + auth.getToken() }
		}).success(function(data) {
			comment.downvotes += 1;
		});
	};

	return o;

}]);
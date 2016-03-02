var app = angular.module('flapperNews', []);

app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}]);

app.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope, posts){
		$scope.test = 'Hello world!';
		$scope.posts = posts.posts;

		// function that adds object into posts array
		$scope.addPost = function() {

			// prevent users from submitting posts with blank title
			if (!$scope.title || $scope.title === '') { return; }

			$scope.posts.push({
				title: $scope.title,
				link: $scope.link,
				upvotes: 0
			});
			$scope.title = '';
			$scope.link = '';
		};

		// adds an upvote
		$scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		};
}]);
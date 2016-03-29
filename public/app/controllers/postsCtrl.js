angular.module('postsCtrl', [])

.controller('postsController', ['$scope', 'posts', 'post', 'auth', function($scope, posts, post, auth){
		$scope.post = post;
		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.addComment = function() {
			if ($scope.body === '') {return; }
			posts.addComment(post._id, {
				body: $scope.body,
				author: 'user',
				date: Date.now(),
				upvotes: 0,
				downvotes: 0,
			}).success(function(comment) {
				$scope.post.comments.push(comment);
			});
			$scope.body = '';
		};

		$scope.incrementUpvotes = function(comment) {
			posts.upvoteComment(post, comment);
		};

		$scope.incrementDownvotes = function(comment) {
			posts.downvoteComment(post, comment);
		};
}]);
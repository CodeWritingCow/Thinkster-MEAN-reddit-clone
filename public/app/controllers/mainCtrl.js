angular.module('mainCtrl', [])

.controller('mainController', ['$scope', 'posts', 'auth', function($scope, posts, auth){
		$scope.posts = posts.posts;
		$scope.isLoggedIn = auth.isLoggedIn;

		// function that adds object into posts array
		$scope.addPost = function() {

			// prevent users from submitting posts with blank title
			if (!$scope.title || $scope.title === '') { return; }

			posts.create({
				title: $scope.title,
				link: $scope.link
			});
			$scope.title = '';
			$scope.link = '';
		};

		// adds an upvote
		$scope.incrementUpvotes = function(post) {
			posts.upvote(post);
		};
	}
]);
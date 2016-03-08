var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Post = mongoose.model('Post'),
	Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET posts*/
router.get('/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if(err) {
			return next(err);
		}
		res.json(posts);
	});
});

/* POST Flapper News posts*/
router.post('/posts', function(req, res, next) {
	var post = new Post(req.body);

	post.save(function(err, post) {
		if (err) {
			return next(err);
		}
		res.json(post);
	});
});

/* Route for preloading post objects */
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function(err, post) {
		if (err) { return next(err); }
		if (!post) { return next(new Error('can\'t find post')); }

		req.post = post;
		return next();
	});
});

/* Route for preloading comments */
router.param('comment', function(req, res, next, id) {
	var query = Comment.findById(id);

	query.exec(function(err, comment) {
		if (err) { return next(err); }
		if (!comment) { return next(new Error('can\'t find comment')); }

		req.comment = comment;
		return next();
	});
});

/* GET route for retrieving single posts */
router.get('/posts/:post', function(req, res, next) {
	req.post.populate('comments', function(err, post) {
		if (err) { return next(err); }

		res.json(post);
	});
});

/* PUT route for updating upvotes on single posts */
router.put('/posts/:post/upvote', function(req, res, next) {
	req.post.upvote(function(err, post) {
		if (err) { return next(err); }

		res.json(post);
	});
});

/* POST route for posting comments */
router.post('/posts/:post/comments', function(req, res, next) {
	var comment = new Comment(req.body);
	comment.post = req.post;

	comment.save(function(err, comment) {
		if (err) { return next(err); }

		req.post.comments.push(comment);
		req.post.save(function(err, post) {
			if (err) { return next(err); }

			res.json(comment);
		});
	});
});

/* PUT route for updating upvotes on single comments  */
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
	req.comment.upvote(function(err, comment) {
		if (err) { return next(err); }

		res.json(comment);
	});
});

module.exports = router;
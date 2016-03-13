var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	jwt = require('express-jwt');

var Post = mongoose.model('Post'),
	Comment = mongoose.model('Comment'),
	User = mongoose.model('User');

/* Middleware for authenticating JWT tokens */
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

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
router.post('/posts', auth, function(req, res, next) {
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
router.put('/posts/:post/upvote', auth, function(req, res, next) {
	req.post.upvote(function(err, post) {
		if (err) { return next(err); }

		res.json(post);
	});
});

/* POST route for posting comments */
router.post('/posts/:post/comments', auth, function(req, res, next) {
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
router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
	req.comment.upvote(function(err, comment) {
		if (err) { return next(err); }

		res.json(comment);
	});
});

/* POST route for creating new users */
router.post('/register', function(req, res, next) {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({ message: 'Please fill out all fields'});
	}

	var user = new User();

	user.username = req.body.username;

	user.setPassword(req.body.password);

	user.save(function(err) {
		if (err) { return next(err); }

		return res.json({ token: user.generateJWT()});
	});
});

/* POST route for authenticating users */
router.post('/login', function(req, res, next) {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({ message: 'Please fill out all fields' });
	}

	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }

		if (user) {
			return res.json({ token: user.generateJWT() });
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

module.exports = router;
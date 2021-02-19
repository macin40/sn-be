const express = require('express');
const router = express.Router();
const Validator = require('../middlewere/validation')
const Authorize = require('../middlewere/auth')
const UserController = require('../app/controller/user');
const PostController = require('../app/controller/post');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.status(200).send('Its working fine');
});

router.post('/login', Validator.login, UserController.login);

router.put('/logout',Authorize.authorizeUserRequest,  UserController.logout);

router.post('/register', Validator.register, UserController.register);

router.get('/user', Authorize.authorizeUserRequest, UserController.getUser);

router.post('/friend/:receiverId', Authorize.authorizeUserRequest, UserController.addFriend);

router.get('/friend',Authorize.authorizeUserRequest,  UserController.getFriend);

router.post('/post',Authorize.authorizeUserRequest,  Validator.post, PostController.addPost);

router.get('/post', Authorize.authorizeUserRequest, PostController.getPost);

router.put('/like/:postId', Authorize.authorizeUserRequest,  PostController.likePost);

module.exports = router;

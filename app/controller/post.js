const UserManager = require('../manager/user');
const PostManager = require('../manager/post');
const Utility = require('../../utility/util');
const AppConstant = require('../../utility/constant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Post = require('../model/post');
const Session = require('../model/session');

module.exports = {

    likePost: async (req, res) => {
        try {

            const likePostResponse = await PostManager.likePost({postId: req.params.postId, userId: req.user.id});

            return Utility.response(res, {}, AppConstant.MESSAGE.POST_LIKED_SUCCESSFULLY, AppConstant.SUCCESS);
        } catch (e) {
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_LIKE, AppConstant.FAILURE);

        }
    },

    addPost: async (req, res) => {
        try {
            const post = new Post(req.body);
            const addPostResponse = await PostManager.addPost(post);
            if (!addPostResponse) {
                return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_ADD_POST, AppConstant.FAILURE);

            }
            return Utility.response(res, {}, AppConstant.MESSAGE.POST_ADDED_SUCCESSFULLY, AppConstant.SUCCESS);
        } catch (e) {
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_ADD_FRIEND, AppConstant.FAILURE);

        }
    },
    getPost: async (req, res) => {
        try {
            const getUserByIdResponse = await UserManager.getFriend(req.user.id);
            const uniqueIdList = new Set();
            uniqueIdList.add(req.user.id);
            getUserByIdResponse.filter((o) => {
                uniqueIdList.add(o.senderId._id);
                uniqueIdList.add(o.receiverId._id);
            });
            console.log(uniqueIdList)
            const getPostResponse = await PostManager.getPost(uniqueIdList);

            return Utility.response(res, getPostResponse, AppConstant.MESSAGE.POST_FETCHED, AppConstant.SUCCESS);
        } catch (e) {
            console.log(e)
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_ADD_POST, AppConstant.FAILURE);

        }
    }
}

const UserManager = require('../manager/user');
const Utility = require('../../utility/util');
const AppConstant = require('../../utility/constant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Friend = require('../model/friend');
const Session = require('../model/session');

module.exports = {
    register: async (req, res) => {
        try {

            const getUserByEmail = await UserManager.getUserByEmail(req.body.email);
            if (getUserByEmail.length) {
                return Utility.response(res, {}, AppConstant.MESSAGE.USER_ALREADY_EXISTS, AppConstant.CONFLICT);
            }
            const user = new User(req.body);
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
            let userResponse = await UserManager.registerUser(user);
            userResponse = userResponse.toObject();
            userResponse.token = await generateTokenAndLogin(userResponse, res);
            delete userResponse.password;
            if (!userResponse) {
                return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_REGISTER, AppConstant.FAILURE);
            }
            return Utility.response(res, userResponse, AppConstant.MESSAGE.USER_REGISTERED_SUCCESSFULLY, AppConstant.SUCCESS);
        } catch (e) {
            return Utility.response(res, {}, AppConstant.MESSAGE.USER_NOT_REGISTERED, AppConstant.FAILURE);

        }
    },
    login: async (req, res) => {
        try {

            const getUserByEmail = await UserManager.getUserByEmail(req.body.email);
            if (!getUserByEmail.length) {
                return Utility.response(res, {}, AppConstant.MESSAGE.USER_NOT_REGISTERED, AppConstant.NOT_FOUND);
            }
            const matchResult = bcrypt.compareSync(req.body.password, getUserByEmail[0].password);
            if (!matchResult) {
                return Utility.response(res, {}, AppConstant.MESSAGE.INCORRECT_PASSWORD, AppConstant.UNAUTHORIZED);
            }
            let userResponse = getUserByEmail[0];
            userResponse = userResponse.toObject();
            userResponse.token = await generateTokenAndLogin(userResponse, res);
            delete userResponse.password;
            if (!userResponse) {
                return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_LOGIN, AppConstant.FAILURE);
            }
            return Utility.response(res, userResponse, AppConstant.MESSAGE.USER_SINGED_IN_SUCCESSFULLY, AppConstant.SUCCESS);
        } catch (e) {
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_LOGIN, AppConstant.FAILURE);

        }
    },
    logout: async (req, res) => {
        try {
            console.log(req.user.id)
            await UserManager.removeSession(req.user.id);

            return Utility.response(res, {}, AppConstant.MESSAGE.LOGOUT_SUCCESS, AppConstant.SUCCESS);
        } catch (e) {
            console.log(e)
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_LOGIN, AppConstant.FAILURE);

        }
    },

    getUser: async (req, res) => {
        try {

            let userFriendList = await UserManager.getFriend(req.user.id);
            const uniqueIdList = new Set();
            console.log(userFriendList)
            uniqueIdList.add(req.user.id);
            userFriendList.filter((o) => {
                uniqueIdList.add(o.senderId._id);
                uniqueIdList.add(o.receiverId._id);
            });
            console.log(userFriendList)
            console.log(uniqueIdList)
            const getUserList = await UserManager.getUser(req.user.id, uniqueIdList);

            return Utility.response(res, getUserList, AppConstant.MESSAGE.USER_FETCHED_SUCCESSFULLY, AppConstant.SUCCESS);
        } catch (e) {
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_LOGIN, AppConstant.FAILURE);

        }
    },
    addFriend: async (req, res) => {
        try {
            const friend = new Friend();
            friend.receiverId = req.params.receiverId
            friend.senderId = req.user.id;
            friend.isLinked = 1;
            friend.addedOn = Date.now()
            const addFriendResponse = await UserManager.addFriend(friend);
            if (!addFriendResponse) {
                return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_ADD_FRIEND, AppConstant.FAILURE);

            }
            return Utility.response(res, {}, AppConstant.MESSAGE.FRIEND_ADDED_SUCCESSFULLY, AppConstant.SUCCESS);
        } catch (e) {
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_ADD_FRIEND, AppConstant.FAILURE);

        }
    },
    getFriend: async (req, res) => {
        try {
            const userId = req.user.id;
            const addFriendResponse = await UserManager.getFriend(userId);

            return Utility.response(res, addFriendResponse, AppConstant.MESSAGE.FRIEND_ADDED_SUCCESSFULLY, AppConstant.SUCCESS);
        } catch (e) {
            console.log(e)
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_ADD_FRIEND, AppConstant.FAILURE);

        }
    },
}

async function generateTokenAndLogin(userResponse, res) {
    try {
        const token = jwt.sign({
            id: userResponse._id,
            email: userResponse.email,
        }, process.env.APP_SECRET);
        await UserManager.removeSession(userResponse._id.toString());

        const sessionObj = {
            userId: userResponse._id.toString(),
            token,
            addedOn: Date.now(),
            isLogin: 1,
        };
        const session = new Session(sessionObj);
        const saveSessionResponse = await UserManager.saveSession(session);
        if (!saveSessionResponse) {
            return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_CREATE_TOKEN, AppConstant.FAILURE);
        }
        return token;
    } catch (e) {
        return Utility.response(res, {}, AppConstant.MESSAGE.UNABLE_TO_CREATE_TOKEN, AppConstant.FAILURE);
    }
}

const User = require('../model/user');
const Session = require('../model/session');
const Friend = require('../model/friend');

module.exports = {

    registerUser: userObj => userObj.saveUser(),

    getUserByEmail: email => User.getUserByEmail(email),

    getUserById: id => User.getUserById(id),

    getUser: (id, uniqueIdList) => User.getUser(id, uniqueIdList),

    getFriend: id => Friend.getFriend(id),

    addFriend: friend => friend.addFriend(),

    updateUser: (id, obj) => User.updateUser(id, obj),

    removeSession: id => Session.removeSession(id),

    saveSession: sessionObj => sessionObj.saveSession(),

    getUserSession: reqObj => Session.getSession(reqObj),



};

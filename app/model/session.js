const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({

    userId: {type: mongoose.Schema.ObjectId, ref: 'User'},
    token: {type: String, default: ''},
    isLogin: {type: Number, default: 0},
    addedOn: {type: Number, default: 0},
});

SessionSchema.method({
    saveSession() {
        return this.save();
    },
});

SessionSchema.static({
    removeSession(userId) {
        return this.updateMany({userId: userId}, {$set: {isLogin: 0}}, {multi: true});
    },
    removeSessionList(sessionList) {
        return this.updateMany({_id: {$in: sessionList}}, {$set: {isLogin: 0}}, {multi: true});
    },
    getSession(reqObj) {
        return this.find(reqObj).sort({addedOn: -1}).limit(1);
    },
});

module.exports = mongoose.model('Session', SessionSchema);

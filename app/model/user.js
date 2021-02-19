'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, default: ''},
    password: {type: String, default: ''},
    email: {type: String, default: ''},
    role: {type: Number, default: 2},
    addedOn: {type: Number, default: Date.now()},
    deleteOn: {type: Number, default: 0},
    isDeleted: {type: Number, default: 0},
    modifiedOn: {type: Number, default: 0}
});

UserSchema.method({
    saveUser() {
        return this.save();
    },
});

UserSchema.static({
    getUserByEmail(email) {
        return this.find({email: email, isDeleted: 0});
    },
    getUserByAdminId(adminId) {
        return this.find({addedBy: adminId, isDeleted: 0});
    },
    getUserById(id) {
        return this.find({_id: id, isDeleted: 0}, {plainPassword: 0});
    },
    getUser(id, uniqueIdList) {
        return this.find(
            {
                isDeleted: 0, _id: {$nin: Array.from(uniqueIdList)}
            });
    },
    updateUser(id, obj) {
        obj.modifiedOn = Date.now();
        return this.update({_id: id}, {
            $set: obj
        });
    },
});

module.exports = mongoose.model('User', UserSchema);

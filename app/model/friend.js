const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({

    senderId: {type: mongoose.Schema.ObjectId, ref: 'User'},
    receiverId: {type: mongoose.Schema.ObjectId, ref: 'User'},
    isLinked: {type: Number, default: 0},
    addedOn: {type: Number, default: 0},
});

FriendSchema.method({
    addFriend() {
        return this.save();
    },
});

FriendSchema.static({
    getFriend(id) {
        return this.aggregate([
            {
                $match: {
                    $and: [
                        {isLinked: 1},
                        {
                            $or: [
                                {
                                    senderId:{ $eq: mongoose.Types.ObjectId(id)}
                                },
                                {
                                    receiverId:{ $eq: mongoose.Types.ObjectId(id)}
                                }
                            ]
                        }
                    ]
                },

            },
            {
                $lookup:{
                    from: 'users',
                    localField: 'senderId' ,
                    foreignField: '_id',
                    as: 'senderId'
                }
            },
            {
                $unwind: '$senderId'
            },
            {
                $lookup:{
                    from: 'users',
                    localField: 'receiverId' ,
                    foreignField: '_id',
                    as: 'receiverId'
                }
            },
            {
                $unwind: '$receiverId'
            },
            {
                $project:{
                    'senderId._id': '$senderId._id',
                    'senderId.name': '$senderId.name',
                    'receiverId.name': '$receiverId.name',
                    'receiverId._id': '$receiverId._id',
                }
            }
        ])
    }
});

module.exports = mongoose.model('Friend', FriendSchema);

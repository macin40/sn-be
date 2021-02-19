const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    addedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
    post: {type: String, default: ''},
    isDeleted: {type: Number, default: 0},
    addedOn: {type: Number, default: 0},
    likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

PostSchema.method({
    addPost() {
        return this.save();
    },
});

PostSchema.static({
    getPost(idList) {
        return this.aggregate([{
            $match: {
                addedBy: {$in: Array.from(idList).map(o => mongoose.Types.ObjectId(o))},
                isDeleted: 0
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'addedBy',
                foreignField: '_id',
                as: 'addedBy'
            }
        },
            {
                $unwind: "$addedBy"
            },
            {
                $project: {
                    likes: 1,
                    name: '$addedBy.name',
                    post: 1
                }
            },
            {
                $sort: {addedOn: -1}
            }])
    },

    likePost(req) {
        return this.update({_id: req.postId}, { $addToSet: { likes: req.userId }});
    }
});

module.exports = mongoose.model('Post', PostSchema);

const Post = require('../model/post');


module.exports = {

    addPost: postObj => postObj.addPost(),

    getPost: (list) => Post.getPost(list),

    likePost: (reqObj) => Post.likePost(reqObj),
}

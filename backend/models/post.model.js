const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    // userID: {
    //     type: Schema.Types.ObjectID,
    //     required: true,
    // },
    text: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
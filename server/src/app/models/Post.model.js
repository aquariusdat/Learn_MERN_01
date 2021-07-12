const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,

    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED']
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true,
})

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;
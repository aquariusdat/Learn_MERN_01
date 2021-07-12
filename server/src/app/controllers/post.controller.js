const { connectDB } = require('../configs/db/db.config');
const Post = require('../models/Post.model');

class postController {
    async getPost(req, res) {

        try {
            await connectDB();
            const posts = await Post.find({ users: req.userID });
            console.log(req.userID, posts)
            return res.status(200).json({ isSuccess: true, posts: posts })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ isSuccess: false, message: `Internal server error` });
        }
    }

    async createPost(req, res) {
        const { title, description, status, url, users } = req.body;
        if (!title) return res.status(400).json({ isSuccess: false, msg: `Title is required.` })

        try {
            await connectDB();

            const newPost = new Post({
                title: title,
                url: (url.startsWith('https://') ? url : `https://${url}`),
                status: status || 'TO LEARN',
                description: description,
                users: users
            });
            console.log(`title: ${title}, desc: ${description}, status: ${status}, user: ${users}`);

            await newPost.save((error, post) => {
                if (error) console.log(error);

                console.log('create post is successfully.')
            });

            return res.json({ isSuccess: true, msg: `Happy learning!`, post: newPost })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ isSuccess: false, message: `Internal server error` });
        }
    }
}

module.exports = new postController();
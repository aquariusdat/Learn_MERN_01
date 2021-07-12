const { connectDB } = require('../configs/db/db.config');
const User = require('../models/User.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../configs/token/token.config')

class authController {
    async login(req, res) {
        const { username, password } = req.body;

        // connect database
        await connectDB();

        // validation
        if (!username || !password) return res.status(400).json({ isSuccess: false, msg: `Username or password invalid.` })
        try {
            // check exist

            const user = await User.findOne({ username: username });
            if (!user) return res.status(400).json({ isSuccess: false, msg: `Incorrect username or password` });

            const passwordValid = await argon2.verify(user.password, password);

            if (!passwordValid) return res.status(400).json({ isSuccess: false, msg: `Incorrect username or password` });

            const accessToken = await generateAccessToken(user);

            return res.status(200).json({ isSuccess: true, access_token: accessToken, msg: `Login is success` });

        } catch (error) {
            return res.status(400).json({ isSuccess: false, msg: error });
        }
    }

    async register(req, res) {
        const { username, password } = req.body;
        console.log(`username: ${username}, password: ${password}`)

        // connect database
        await connectDB();

        // validation
        if (!username || !password) return res.status(400).json({ isSuccess: false, msg: `Username or password invalid.` })

        try {
            // check exist
            const user = await User.findOne({ username: username });

            if (user) return res.status(400).json({ isSuccess: false, msg: `Username already existing.` })

            const hashPassword = await argon2.hash(password);
            console.log(hashPassword)
            const newUser = new User({
                username: username,
                password: hashPassword,
            });
            await newUser.save((error, user) => {
                if (error) return console.log(error);
                console.log('Save is successfully')
            });

            // return token
            const accessToken = await generateAccessToken(newUser);
            console.log(`Access-Token: ${accessToken}`)

            return res.status(200).json({ isSuccess: true, msg: `Register is success`, access_token: accessToken });
        } catch (error) {

        }

    }
}

module.exports = new authController();
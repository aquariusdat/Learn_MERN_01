const jwt = require('jsonwebtoken');

async function generateAccessToken(user) {
    return jwt.sign({ username: user.username, userID: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' })
}

module.exports = { generateAccessToken }
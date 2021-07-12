// dotenv
require('dotenv').config();
// libraries
const express = require('express');
const app = express();
const PORT = process.env.APP_PORT || 5000;
const authRoute = require('./app/routes/auth.route');
const postRoute = require('./app/routes/post.route');
const { connectDB } = require('./app/configs/db/db.config')
// body-parse
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

// // connect DB
// connectDB();

// routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/post', postRoute)

// listening
app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`)
})

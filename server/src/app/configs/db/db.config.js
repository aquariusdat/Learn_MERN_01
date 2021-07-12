// database
const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`Database connected.`);
    } catch (error) {

        console.log(error);
        process.exit(1);

    }
}

module.exports = { connectDB };
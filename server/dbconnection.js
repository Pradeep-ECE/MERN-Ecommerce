require("dotenv").config(); 
const mongoose = require('mongoose');
const uri =process.env.DB_URI ;
const dbConnection = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log('Database connection error:', err));
};

module.exports = dbConnection;

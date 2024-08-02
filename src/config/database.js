const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/moviesdb';

async function databaseConfig() {
    await mongoose.connect(connectionString);
    console.log('Database connected');
}

module.exports = { databaseConfig };
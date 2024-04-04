const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/challenge-18');

module.exports = mongoose.connection;
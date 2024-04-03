const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/challenge18');

module.export = mongoose.connection;
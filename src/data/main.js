'use strict';

var mongoose = require('mongoose');
var config = require('./config');
var fs = require('fs');
var lodash = require('lodash');

var connectToDb = function() {
    var connectOptions = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(config.dbConfig, connectOptions);
};

connectToDb();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connectToDb);

var modelsFolder = __dirname + '/models/';
var modelFiles = fs.readdirSync(modelsFolder);

lodash.each(modelFiles, function(modelFile) {
    if(modelFile.indexOf('.js') !== -1) {
        require(modelsFolder + modelFile);
    }
});

function getModel(model) {
    return mongoose.model(model);
}

module.exports = {
    get: getModel
};

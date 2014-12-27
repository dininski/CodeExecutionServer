'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    _id: String,
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var self = this;

    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(self.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            self.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, done) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return done(err);
        }

        done(null, isMatch);
    });
};

mongoose.model('User', UserSchema);


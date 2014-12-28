'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var compactor = require('../compactor');
var validators = require('../validators');

var SubmissionSchema = new Schema({
    state: {
        type: Number,
        index: true
    },
    user_id: String,
    code: Buffer,
    language: String,
    task_id: String
});

var statesMap = {
    notProcessed: 0,
    inProgress: 1,
    done: 2
};

var states = _.values(statesMap);

SubmissionSchema
    .path('state')
    .validate(validators.rangeValidator(states), 'Invalid submission state!');

SubmissionSchema.pre('save', function (next) {
    var self = this;

    this.state = this.state || 0;
});

compactor.compact(SubmissionSchema, ['code']);
mongoose.model('Submission', SubmissionSchema);

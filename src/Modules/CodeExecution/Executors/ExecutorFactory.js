'use strict';

var ExecutorFactory = function() {
    this._languages;
}

ExecutorFactory.prototype = {
    init: function(languages) {
        this._languages = languages;
    },

    getExecutor: function(language) {
        switch(language) {
            case this._languages.Python:
                var pythonExecutor = new PythonExecutor();
                return pythonExecutor;
        }
    }
}

module.exports = ExecutorFactory;
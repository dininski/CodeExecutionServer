var CodeExecutionCheck = function() {
    this.stdin = '';
    this.id = '';
}

CodeExecutionCheck.prototype = {
    init: function(stdin, id, fsLocation) {
        this.stdin = stdin;
        this.id = id;
    }
};

module.exports = CodeExecutionCheck;
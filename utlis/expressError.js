class expressError extends Error{
    constructor(){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = expressError;
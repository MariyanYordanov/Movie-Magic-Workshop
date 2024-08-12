function parseError(err){

    if(err instanceof Error){
        
        if(!err.errors){
            // Generic error
            err.errors = [err.message];
        }
        // TODO parse Mongoose validation error
    } else if(Array.isArray(err)){
        // Express-validator error array
        const error = new Error("Something went wrong");
        error.errors = Object.fromEntries(err.map(e => [e.path, e.msg]));

        return error;
    }

    return err;
}

module.exports = {
    parseError,
};
exports.success = function (req, res, message, status) {
    res.status(status || 200).send({
        error: '',
        body: message
    }); 
}

exports.error = function( req, res, message, status, details) {
    console.log('[response error]' + details); //este error se muestra en el servidor

    res.status(status || 500).send({
        error: message,
        body: ''
    }); 
}
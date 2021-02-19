module.exports = {
    response,
};


function response(res, data, message, status) {
    const responseData = {
        responseData: data,
        message,
        status,
    };
    res.status(status);
    res.format({
        json: () => {
            res.json(responseData);
        },
    });
}



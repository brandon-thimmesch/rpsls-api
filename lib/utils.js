const respond = (err, res, payload) => {
    if (err) {
        console.log(err);
        
        res.status(500).json({
            status: 500,
            err
        });
    } else {
        payload.status = 200;
        res.status(payload.status).json(payload);
    }
};

module.exports = {
    respond
};
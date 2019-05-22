module.exports = app => {
    app.get('/', (req, res) => {
        res.json({
            status: 200,
            message: 'Welcome to the RPSLS API.'
        });
    });
};
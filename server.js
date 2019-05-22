const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const glob = require('glob');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Using for now to expand later with matching up human players
glob('./routes/**/*.js', (err, routers) => {
    if (err) {
        throw new Error('Unable to glob routers');
    }

    routers.forEach(router => {
        require(router)(app);
    });

    app.use((req, res, next) => {
        res.status(404).json({
            status: 404,
            message: 'The requested endpoint does not exist'
        });
    });
});

app.listen(PORT, () => {
    console.log(`RPSLS API Server is listening on port ${PORT}`);
});

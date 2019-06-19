require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

let { mongoose } = require('./database/mongoose');
require('./models/user');
require('./services/passport');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_SIGN]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/userRoutes')(app);
require('./routes/playlistRoutes')(app);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`);
});

const expres = require('express');
const passport = require('passport');
const api = require('./api');


const app = expres();
api(app);

app.listen(3000);

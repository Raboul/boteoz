'use strict';

var Boteoz = require('../lib/boteoz');

var token = process.env.BOT_API_KEY;
var dbPath = process.env.BOT_DB_PATH;

var boteoz = new Boteoz({
    token: token,
    dbPath: dbPath
});

boteoz.run();

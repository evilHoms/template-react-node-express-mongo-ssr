require('babel-core/register');
require('babel-polyfill');
['.css', '.less', '.sass', '.scss', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});

const express = require('express');
const mongodb = require('mongodb');
const favicon = require('serve-favicon');
const path    = require('path');
const routes  = require('./routes.js');

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 3000;

const app = express();
app.use("/public", express.static(path.resolve(__dirname, 'public')));
process.env.PRODUCTION && app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
routes(app, MongoClient);
app.listen(port, onServerStart);

function onServerStart() {
    const mode = process.env.PRODUCTION ? 'production' : 'dev';
    console.log('Server start on port: ' + port + ' in ' + mode + ' mode' );
}

const express = require('express');
const router = require('./routes');
const nunjucks = require('nunjucks');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(router);
app.use(express.static('public'));

nunjucks.configure('src/views', {
    express: app,
    noCache: true,
});

app.listen(3333);
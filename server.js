const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || process.env.WEB_PORT || 5000;
const host = process.env.WEB_HOST || '0.0.0.0';
const app = express();

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'build')));

app.listen(port, host, 
    () => console.log(`Listening on port ${port}`));
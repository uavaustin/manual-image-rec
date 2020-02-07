const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || process.env.WEB_PORT || 5000;
const host = process.env.WEB_HOST || '0.0.0.0';
const app = express();
const folder = 'bucket';

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/app/*', express.static(path.join(__dirname, 'build')));
app.use('/bucket', express.static(path.join(__dirname, 'bucket')));

app.get('/api/images', (req, res) => {
    fs.readdir(folder, (err, items) => {
        let resp = items.map(item => {
            return {
                name: item,
                path: '/bucket/' + item
            }
        });
        res.json(resp);
    });
});

app.listen(port, host, 
    () => console.log(`Listening on port ${port}`));
#!/usr/bin/env node

const app = require('..');

let server = app.listen(8000);

console.log('Hosting server at http://localhost:8000/');

process.once('SIGINT', () => {
    console.log('Shutting down server...');

    server.close(() => process.exit());
});

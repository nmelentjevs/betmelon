'use strict';

const express = require('express');

const ok = 'o112asd3ssk';
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello !Worker\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

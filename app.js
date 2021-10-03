const express = require('express');
const app = express();
const port = 3000;
const myUrl = '127.0.0.1';

app.listen(port, myUrl, () => {
    console.log(`Serwer dziala na http://${myUrl}:${port}`);
});
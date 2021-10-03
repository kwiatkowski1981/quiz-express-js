const express = require('express');
const path = require('path');
const gameRoutes = require('./routes/game');

const app = express();
const port = 3000;
const myUrl = '127.0.0.1';

app.listen(port, myUrl, () => {
    console.log(`Serwer dziala na http://${myUrl}:${port}`);
});

app.use(express.static(
    path.join(__dirname, 'public')
));

gameRoutes(app);
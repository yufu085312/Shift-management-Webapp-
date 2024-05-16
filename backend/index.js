const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database.js');

app.get('/shifts', (req, res) => {
    db.all("SELECT * FROM shifts", [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error " + err);
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
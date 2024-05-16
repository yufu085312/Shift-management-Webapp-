const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('データベースの開けません: ' + err.message);
    } else {
        console.log('データベースに接続しました。');
    }
});

module.exports = db;
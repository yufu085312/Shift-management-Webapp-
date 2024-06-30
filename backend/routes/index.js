// 必要なモジュールをインポート
const express = require('express');
const router = express.Router(); // Expressのルーターを作成
const db = require('../config/db'); // データベース接続の設定ファイルをインポート

// ルートハンドラー
router.get('/', (req, res) => {
    res.send('Welcome to the Shift Management System');
});

// データベースから情報を取得するためのルート
router.get('/shifts', (req, res) => {
    const sql = 'SELECT * FROM shifts'; // ここでテーブル名を適切に変更してください
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error occurred: ' + err.message);
            return res.status(500).send('Error occurred: ' + err.message);
        }
        console.log(results); // 取得したデータをコンソールに出力
        res.json(results); // 取得したデータをJSON形式でレスポンス
    });
});

// ログイン用のエンドポイント
router.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = 'SELECT * FROM users WHERE name = ? AND password = ?'; // ここでテーブル名とカラム名を適切に変更してください
    db.query(sql, [name, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error occurred: ' + err.message);
        }
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = router; // このルーターをモジュールとしてエクスポート
// 必要なモジュールをインポート
const express = require('express');
const router = express.Router(); // Expressのルーターを作成
const db = require('../config/db');

// ルートハンドラー
router.get('/', (req, res) => {
    res.send('Welcome to the Shift Management System');
});

// データベースから情報を取得するためのルート
router.get('/shifts', (req, res) => {
    const sql = 'SELECT * FROM shifts'; // ここでテーブル名を適切に変更してください
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Error occurred: ' + err.message);
        }
        res.json(results);
    });
});

// APIの動作確認用エンドポイント
/*
router.get('/api', (req, res) => {
    res.json({ message: 'API is working!' }); // 'API is working!' メッセージをJSON形式で返す
});
*/

// ユーザー情報を取得するエンドポイント
/*
router.get('/api/users', userController.getUsers); // GETリクエストで'/api/users'にアクセスした際にuserControllerのgetUsers関数を呼び出す
*/

module.exports = router; // このルーターをモジュールとしてエクスポート
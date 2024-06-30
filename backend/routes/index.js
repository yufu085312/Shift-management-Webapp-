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
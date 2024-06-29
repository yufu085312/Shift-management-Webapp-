// 必要なモジュールをインポート
const express = require('express');
const router = express.Router(); // Expressのルーターを作成
const userController = require('../controllers/userController'); // ユーザーコントローラーをインポート

// APIの動作確認用エンドポイント
router.get('/api', (req, res) => {
    res.json({ message: 'API is working!' }); // 'API is working!' メッセージをJSON形式で返す
});

// ユーザー情報を取得するエンドポイント
router.get('/api/users', userController.getUsers); // GETリクエストで'/api/users'にアクセスした際にuserControllerのgetUsers関数を呼び出す

module.exports = router; // このルーターをモジュールとしてエクスポート
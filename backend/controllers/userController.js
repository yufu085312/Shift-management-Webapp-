// データベース接続オブジェクトをインポート
const db = require('../config/db');

// ユーザーの取得処理を行うメソッドをエクスポート
exports.getUsers = (req, res) => {
    // データベースから全ユーザー情報を取得するクエリを実行
    db.query('SELECT * FROM users', (error, results) => {
        if (error) throw error; // エラー発生時は例外をスロー
        res.json(results); // クエリ結果をJSON形式でレスポンス
    });
};
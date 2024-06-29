// MySQLモジュールをインポート
const mysql = require('mysql');

// データベース接続の設定
const connection = mysql.createConnection({
    host: 'localhost', // データベースサーバーのホスト名
    user: 'root', // データベースユーザー名
    password: 'csga4834', // データベースユーザーパスワード
    database: 'Shift_Management' // 接続するデータベース名
});

// データベースに接続
connection.connect((err) => {
    if (err) {
        // 接続エラーが発生した場合の処理
        console.log('error connecting: ' + err.stack);
        return;
    }
    // 接続成功時のメッセージ
    console.log('success');
});

// connectionオブジェクトをモジュールとしてエクスポート
module.exports = connection;
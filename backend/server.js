// 必要なモジュールをインポート
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // corsモジュールをインポート
const indexRouter = require('./routes/index');

const app = express(); // Expressアプリケーションのインスタンスを作成
const port = 3000; // サーバーがリッスンするポート番号を設定

// CORSを有効にする
app.use(cors());

// ボディパーサーをミドルウェアとして使用し、JSONデータおよびURLエンコードデータの解析を可能にする
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ルートに対してindexRouterを使用する
app.use('/', indexRouter);

// サーバーを指定されたポートで起動し、リッスンを開始する
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); // サーバーの起動を確認するメッセージをコンソールに出力
});
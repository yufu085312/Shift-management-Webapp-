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

// 店舗登録用のエンドポイント
router.post('/store-register', (req, res) => {
    console.log('Received request for /store-register');
    const { storeName, storePassword } = req.body;
    console.log('Store name:', storeName);
    console.log('Store password:', storePassword);
    const sql = 'INSERT INTO stores (name, password) VALUES (?, ?)';
    db.query(sql, [storeName, storePassword], (err, results) => {
        if (err) {
            console.error('Error occurred: ' + err.message);
            return res.status(500).send('Error occurred: ' + err.message);
        }
        res.json({ success: true });
    });
});

// 店舗ログイン用のエンドポイント
router.post('/store-login', (req, res) => {
    const { storeName, storePassword } = req.body;
    const sql = 'SELECT * FROM stores WHERE name = ? AND password = ?';
    db.query(sql, [storeName, storePassword], (err, results) => {
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

// 管理者ログイン用のエンドポイント
router.post('/admin-login', (req, res) => {
    const { adminName, adminPassword } = req.body;
    const sql = 'SELECT * FROM admins WHERE name = ? AND password = ?';
    db.query(sql, [adminName, adminPassword], (err, results) => {
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

// シフト保存用のエンドポイント
router.post('/shifts', (req, res) => {
    const { employeeName, date, startTime, endTime } = req.body;
    const sql = 'INSERT INTO shifts (employee_name, shift_date, start_time, end_time) VALUES (?, ?, ?, ?)';
    db.query(sql, [employeeName, date, startTime, endTime], (err, results) => {
        if (err) {
            console.error('Error occurred: ' + err.message);
            return res.status(500).send('Error occurred: ' + err.message);
        }
        res.json({ success: true });
    });
});

module.exports = router; // このルーターをモジュールとしてエクスポート
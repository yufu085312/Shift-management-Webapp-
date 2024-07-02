import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// StoreRegisterコンポーネントの定義
const StoreRegister = () => {
    // 状態管理のためのuseStateフック
    const [storeName, setStoreName] = useState(''); // 店舗名の状態
    const [storePassword, setStorePassword] = useState(''); // 店舗パスワードの状態
    const [confirmPassword, setConfirmPassword] = useState(''); // パスワード確認の状態
    const [error, setError] = useState(''); // エラーメッセージの状態
    const [message, setMessage] = useState(''); // 成功メッセージの状態
    const navigate = useNavigate(); // ページ遷移用のフック

    // フォーム送信時のハンドラー関数
    const handleSubmit = async (e) => {
        e.preventDefault(); // フォームのデフォルト動作を防ぐ

        if (storePassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // サーバーに店舗登録リクエストを送信
            const response = await axios.post('http://localhost:3000/store-register', { storeName, storePassword });
            if (response.data.success) {
                // 登録成功時に成功メッセージを設定
                setMessage('Store registered successfully. You can now login.');
                setError('');
                // 登録成功後にログイン画面に遷移
                setTimeout(() => navigate('/store-login'), 2000);
            } else {
                // 登録失敗時のエラーメッセージを設定
                setError('Error registering store');
            }
        } catch (err) {
            // リクエストエラー時のエラーメッセージを設定
            setError('Error occurred while registering store');
        }
    };

    return (
        <div>
            <h2>新規店舗登録</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>店舗名:</label>
                    <input 
                        type="text" // 入力フィールドのタイプをテキストに設定
                        value={storeName} // 店舗名の状態を入力フィールドにバインド
                        onChange={(e) => setStoreName(e.target.value)} // 入力値変更時に状態を更新
                        required // フィールドが必須であることを示す
                    />
                </div>
                <div>
                    <label>パスワード:</label>
                    <input 
                        type="password" // 入力フィールドのタイプをパスワードに設定
                        value={storePassword} // 店舗パスワードの状態を入力フィールドにバインド
                        onChange={(e) => setStorePassword(e.target.value)} // 入力値変更時に状態を更新
                        required // フィールドが必須であることを示す
                    />
                </div>
                <div>
                    <label>パスワード確認:</label>
                    <input 
                        type="password" // 入力フィールドのタイプをパスワードに設定
                        value={confirmPassword} // パスワード確認の状態を入力フィールドにバインド
                        onChange={(e) => setConfirmPassword(e.target.value)} // 入力値変更時に状態を更新
                        required // フィールドが必須であることを示す
                    />
                </div>
                <button type="submit">登録</button>
            </form>
        </div>
    );
};

export default StoreRegister;

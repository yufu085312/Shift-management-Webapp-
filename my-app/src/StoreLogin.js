import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// StoreLoginコンポーネントの定義
const StoreLogin = () => {
    // 状態管理のためのuseStateフック
    const [storeName, setStoreName] = useState(''); // 店舗名の状態
    const [storePassword, setStorePassword] = useState(''); // 店舗パスワードの状態
    const [error, setError] = useState(''); // エラーメッセージの状態
    const navigate = useNavigate(); // ページ遷移用のフック

    // フォーム送信時のハンドラー関数
    const handleSubmit = async (e) => {
        e.preventDefault(); // フォームのデフォルト動作を防ぐ
        try {
            // サーバーに店舗ログインリクエストを送信
            const response = await axios.post('http://localhost:3000/store-login', { storeName, storePassword });
            if (response.data.success) {
                // 店舗ログイン成功時にユーザーログイン画面に遷移
                navigate('/login');
            } else {
                // ログイン失敗時のエラーメッセージを設定
                setError('Invalid store name or password');
            }
        } catch (err) {
            // リクエストエラー時のエラーメッセージを設定
            setError('Error occurred while logging in');
        }
    };

    return (
        <div>
            <h2>店舗ログイン</h2>
            {/* エラーメッセージの表示 */}
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
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};

export default StoreLogin;

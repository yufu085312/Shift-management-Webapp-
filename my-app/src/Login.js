import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // カレンダーのスタイルシートをインポート
import { UserContext } from './UserContext';

const Login = () => {
    // ユーザー用の状態管理
    const [name, setName] = useState(''); // 名前の状態
    const [password, setPassword] = useState(''); // パスワードの状態
    const [error, setError] = useState(''); // エラーメッセージの状態
    const navigate = useNavigate(); // ページ遷移用のフック
    const { setUser } = useContext(UserContext); // コンテキストからsetUserを取得

    // 管理者用の状態管理
    const [adminName, setAdminName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminError, setAdminError] = useState('');

    // ユーザーログインのハンドラー関数
    const handleSubmit = async (e) => {
        e.preventDefault(); // フォームのデフォルト動作を防ぐ
        try {
            // サーバーにログインリクエストを送信
            const response = await axios.post('http://localhost:3000/login', { name, password });
            if (response.data.success) {
                // ログイン成功時にユーザー名をコンテキストに設定
                setUser(name);
                // ログイン成功時にカレンダー画面に遷移
                navigate('/shift');
            } else {
                // ログイン失敗時のエラーメッセージを設定
                setError('Invalid email or password');
            }
        } catch (err) {
            // リクエストエラー時のエラーメッセージを設定
            setError('Error occurred while logging in');
        }
    };

    // 管理者ログインのハンドラー関数
    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin-login', { adminName, adminPassword });
            if (response.data.success) {
                navigate('/admin');
            } else {
                setAdminError('Invalid admin name or password');
            }
        } catch (err) {
            setAdminError('Error occurred while logging in');
        }
    };

    // カレンダーの日付状態
    const [date, setDate] = useState(new Date());

    // カレンダーの日付変更時のハンドラー関数
    const onChange = date => {
        setDate(date);
    };

    return (
        <div>
            <h2>従業員用ログイン</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>名前:</label>
                    <input 
                        type="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>パスワード:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
            <h2>管理者ログイン</h2>
            {adminError && <p style={{ color: 'red' }}>{adminError}</p>}
            <form onSubmit={handleAdminSubmit}>
                <div>
                    <label>管理者名:</label>
                    <input 
                        type="text" 
                        value={adminName} 
                        onChange={(e) => setAdminName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>管理者パスワード:</label>
                    <input 
                        type="password" 
                        value={adminPassword} 
                        onChange={(e) => setAdminPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
            <h2>カレンダー</h2>
            <Calendar
                onChange={onChange}
                value={date}
            />
        </div>
    );
};

export default Login;

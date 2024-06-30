import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoreLogin = () => {
    const [storeName, setStoreName] = useState('');
    const [storePassword, setStorePassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/store-login', { storeName, storePassword });
            if (response.data.success) {
                // 店舗ログイン成功時にユーザーログイン画面に遷移
                navigate('/login');
            } else {
                setError('Invalid store name or password');
            }
        } catch (err) {
            setError('Error occurred while logging in');
        }
    };

    return (
        <div>
            <h2>Store Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>店舗名:</label>
                    <input 
                        type="text" 
                        value={storeName} 
                        onChange={(e) => setStoreName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={storePassword} 
                        onChange={(e) => setStorePassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default StoreLogin;

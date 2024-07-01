import React, { useState, useContext } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // カレンダーのスタイルシートをインポート
import { UserContext } from './UserContext';

const Shiftinput = () => {
    // 状態管理のためのuseStateフック
    const [date, setDate] = useState(new Date()); // カレンダーの日付状態
    const [startTime, setStartTime] = useState(''); // 開始時間の状態
    const [endTime, setEndTime] = useState(''); // 終了時間の状態
    const [message, setMessage] = useState(''); // メッセージの状態
    const { user } = useContext(UserContext); // コンテキストからユーザー名を取得

    // フォーム送信時のハンドラー関数
    const handleSubmit = async (e) => {
        e.preventDefault(); // フォームのデフォルト動作を防ぐ
        try {
            // サーバーにシフト情報を送信
            const response = await axios.post('http://localhost:3000/shifts', {
                employeeName: user,
                date: date.toISOString().split('T')[0], // 日付をYYYY-MM-DD形式に変換
                startTime,
                endTime
            });
            if (response.data.success) {
                setMessage('Shift successfully saved');
            } else {
                setMessage('Error saving shift');
            }
        } catch (err) {
            setMessage('Error occurred while saving shift');
        }
    };

    return (
        <div>
            <h2>シフト入力</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>日付を選択:</label>
                    <Calendar
                        onChange={setDate}
                        value={date}
                    />
                </div>
                <div>
                    <label>開始時間:</label>
                    <input 
                        type="time" 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>終了時間:</label>
                    <input 
                        type="time" 
                        value={endTime} 
                        onChange={(e) => setEndTime(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">シフトを保存</button>
            </form>
        </div>
    );
};

export default Shiftinput;
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // カレンダーのスタイルシートをインポート

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    };

    return (
        <div>
            <h2>Calendar</h2>
            <Calendar
                onChange={onChange}
                value={date}
            />
        </div>
    );
};

export default MyCalendar;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import MyCalendar from './Calendar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/" element={<Login />} /> {/* デフォルトでログインページにリダイレクト */}
      </Routes>
    </div>
  );
}

export default App;

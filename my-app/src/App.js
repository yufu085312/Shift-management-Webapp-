import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreLogin from './StoreLogin';
import Login from './Login';
import Shiftinput from './Shift';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/store-login" element={<StoreLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shift" element={<Shiftinput />} />
          <Route path="/" element={<StoreLogin />} /> {/* デフォルトで店舗ログインページにリダイレクト */}
      </Routes>
    </div>
  );
}

export default App;

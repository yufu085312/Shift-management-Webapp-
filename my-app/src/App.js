import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import StoreLogin from './StoreLogin';
import Login from './Login';
import Shiftinput from './Shift';
import Admininput from './Admin';
import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/store-login" element={<StoreLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shift" element={<Shiftinput />} />
          <Route path="/admin" element={<Admininput />} />
          <Route path="/" element={<StoreLogin />} /> {/* デフォルトで店舗ログインページにリダイレクト */}
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
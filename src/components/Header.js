import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>ระบบจัดการข้อมูลชุดไทย</h1>
        <button onClick={handleLogout} className="logout-button">
          ออกจากระบบ
        </button>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // ล็อกอิน
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/dresses');
      } else {
        // ลงทะเบียน
        if (formData.password !== formData.confirmPassword) {
          setError('รหัสผ่านไม่ตรงกัน');
          return;
        }
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/dresses');
      }
    } catch (error) {
      console.error('Error:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('อีเมลนี้ถูกใช้งานแล้ว');
          break;
        case 'auth/weak-password':
          setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
          break;
        case 'auth/invalid-email':
          setError('อีเมลไม่ถูกต้อง');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
          break;
        default:
          setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">
          {isLogin ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
        </h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">อีเมล</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          )}
          <button type="submit" className="submit-button">
            {isLogin ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-form-button"
          >
            {isLogin ? 'ยังไม่มีบัญชี? ลงทะเบียน' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

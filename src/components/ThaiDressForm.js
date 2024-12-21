import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ThaiDressForm = ({ onDressAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    size: '',
    color: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'thaiDresses'), {
        ...formData,
        price: Number(formData.price),
        createdAt: new Date()
      });
      setFormData({
        name: '',
        type: '',
        price: '',
        size: '',
        color: '',
        description: ''
      });
      onDressAdded();
      alert('เพิ่มข้อมูลชุดไทยสำเร็จ');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">เพิ่มข้อมูลชุดไทย</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">ชื่อชุด</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">ประเภท</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">เลือกประเภท</option>
            <option value="ชุดไทยจักรี">ชุดไทยจักรี</option>
            <option value="ชุดไทยจักรพรรดิ">ชุดไทยจักรพรรดิ</option>
            <option value="ชุดไทยบรมพิมาน">ชุดไทยบรมพิมาน</option>
            <option value="ชุดไทยประยุกต์">ชุดไทยประยุกต์</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">ราคา (บาท)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">ขนาด</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">เลือกขนาด</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">สี</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">รายละเอียด</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
          />
        </div>

        <button type="submit" className="submit-button">
          บันทึกข้อมูล
        </button>
      </form>
    </div>
  );
};

export default ThaiDressForm;


import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ThaiDressList = ({ refresh }) => {
  const [dresses, setDresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchDresses();
  }, [refresh]);

  const fetchDresses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'thaiDresses'));
      const dressesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDresses(dressesData);
    } catch (error) {
      console.error('Error fetching dresses: ', error);
      alert('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
      try {
        await deleteDoc(doc(db, 'thaiDresses', id));
        fetchDresses();
        alert('ลบข้อมูลสำเร็จ');
      } catch (error) {
        console.error('Error deleting document: ', error);
        alert('เกิดข้อผิดพลาดในการลบข้อมูล');
      }
    }
  };

  const handleEdit = (dress) => {
    setEditingId(dress.id);
    setEditForm(dress);
  };

  const handleUpdate = async () => {
    try {
      const dressRef = doc(db, 'thaiDresses', editingId);
      await updateDoc(dressRef, editForm);
      setEditingId(null);
      fetchDresses();
      alert('อัพเดทข้อมูลสำเร็จ');
    } catch (error) {
      console.error('Error updating document: ', error);
      alert('เกิดข้อผิดพลาดในการอัพเดทข้อมูล');
    }
  };

  return (
    <div className="dress-list">
      {dresses.map((dress) => (
        <div key={dress.id} className="dress-card">
          {editingId === dress.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className="edit-input"
              />
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({...editForm, price: Number(e.target.value)})}
                className="edit-input"
              />
              <select
                value={editForm.size}
                onChange={(e) => setEditForm({...editForm, size: e.target.value})}
                className="edit-input"
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <div className="button-group">
                <button onClick={handleUpdate} className="save-button">
                  บันทึก
                </button>
                <button onClick={() => setEditingId(null)} className="cancel-button">
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="dress-title">{dress.name}</h3>
              <p className="dress-info">ประเภท: {dress.type}</p>
              <p className="dress-price">฿{dress.price.toLocaleString()}</p>
              <p className="dress-info">ขนาด: {dress.size}</p>
              <p className="dress-info">สี: {dress.color}</p>
              <p className="dress-info">รายละเอียด: {dress.description}</p>
              <div className="button-group">
                <button
                  onClick={() => handleEdit(dress)}
                  className="edit-button"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(dress.id)}
                  className="delete-button"
                >
                  ลบ
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThaiDressList;
import React, { useState } from 'react';
import { useGunContext } from '../context/GunContext';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const { user, setUser } = useGunContext();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const navigate = useNavigate();

  // Challenge 8: Form Edit Nama dan Bio di Page Baru
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, bio });
    navigate('/profile');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>Edit Profile (Halaman Terpisah)</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nama Pengguna:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Bio:</label>
          <textarea 
            rows="4" 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>Simpan</button>
          <button type="button" onClick={() => navigate('/profile')} style={{ padding: '8px 16px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px' }}>Batal</button>
        </div>
      </form>
    </div>
  );
}

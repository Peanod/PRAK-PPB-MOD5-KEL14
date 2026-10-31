import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGunContext } from '../context/GunContext';

export default function GunDetail() {
  const { id } = useParams();
  const { guns, reviews, addReview, updateReview, deleteReview, voteReview, user, addToCart } = useGunContext();
  const gun = guns.find(g => g.id === id);

  const [reviewText, setReviewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  if (!gun) return <div style={{ padding: '20px' }}>Senjata tidak ditemukan. <Link to="/">Kembali</Link></div>;

  // Challenge 1: Share Link Unik
  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({ title: gun.name, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(`Link disalin: ${shareUrl}`);
    }
  };

  const gunReviews = reviews.filter(r => r.gunId === gun.id);

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <Link to="/">← Kembali ke Katalog</Link>
      <h2 style={{ marginTop: '10px' }}>{gun.name}</h2>
      {/* Challenge 2: Lazy load image */}
      <img src={gun.image} alt={gun.name} loading="lazy" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', margin: '15px 0' }} />
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb' }}>Harga: ${gun.price}</p>
      
      <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
        <button onClick={handleShare} style={{ padding: '8px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px' }}>Share Link Unik</button>
        <button onClick={() => addToCart(gun)} style={{ padding: '8px 16px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px' }}>Tambah ke Keranjang</button>
      </div>

      {/* Challenge 7: Review Management (CRUD + Thumbs Up/Down) */}
      <div style={{ marginTop: '30px', borderTop: '2px solid #e2e8f0', paddingTop: '20px' }}>
        <h3>Ulasan & Review</h3>
        
        <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
          <input 
            type="text" 
            placeholder="Tulis ulasan kamu..." 
            value={reviewText} 
            onChange={(e) => setReviewText(e.target.value)} 
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
          <button onClick={() => { addReview(gun.id, reviewText); setReviewText(''); }} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>Kirim</button>
        </div>

        <div>
          {gunReviews.length === 0 ? <p style={{ color: '#64748b' }}>Belum ada ulasan.</p> : (
            gunReviews.map(r => (
              <div key={r.id} style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                <strong>{r.user}</strong>
                {editingId === r.id ? (
                  <div style={{ marginTop: '5px' }}>
                    <input value={editText} onChange={(e) => setEditText(e.target.value)} style={{ padding: '4px', width: '80%' }} />
                    <button onClick={() => { updateReview(r.id, editText); setEditingId(null); }} style={{ marginLeft: '5px' }}>Simpan</button>
                    <button onClick={() => setEditingId(null)} style={{ marginLeft: '5px' }}>Batal</button>
                  </div>
                ) : (
                  <p style={{ margin: '5px 0' }}>{r.text}</p>
                )}

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px', fontSize: '14px' }}>
                  <button onClick={() => voteReview(r.id, 'up')} style={{ border: 'none', background: 'none' }}>👍 {r.likes}</button>
                  <button onClick={() => voteReview(r.id, 'down')} style={{ border: 'none', background: 'none' }}>👎 {r.dislikes}</button>
                  {r.user === user.name && (
                    <>
                      <button onClick={() => { setEditingId(r.id); setEditText(r.text); }} style={{ color: '#2563eb', border: 'none', background: 'none', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => deleteReview(r.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Hapus</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

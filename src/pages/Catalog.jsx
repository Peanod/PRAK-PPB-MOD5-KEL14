import React from 'react';
import { useGunContext } from '../context/GunContext';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const { guns, addToCart, toggleArchive } = useGunContext();
  const activeGuns = guns.filter(g => !g.isDraft && !g.isArchived);

  // Challenge 1: Button Share Link Unik
  const handleShare = (gun, e) => {
    e.preventDefault();
    const shareUrl = `${window.location.origin}/gun/${gun.id}`;
    if (navigator.share) {
      navigator.share({
        title: gun.name,
        text: `Cek item senjata ${gun.name} di katalog ini!`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(`Tautan unik untuk ${gun.name} berhasil disalin ke clipboard!\n${shareUrl}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Katalog Senjata</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {activeGuns.map(gun => (
          <div key={gun.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {/* Challenge 2: Lazy Load Image */}
            <img 
              src={gun.image} 
              alt={gun.name} 
              loading="lazy" 
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} 
            />
            <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{gun.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#2563eb', marginBottom: '15px' }}>${gun.price}</p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link to={`/gun/${gun.id}`} style={{ padding: '6px 12px', background: '#3b82f6', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }}>Detail</Link>
              {/* Challenge 1 */}
              <button onClick={(e) => handleShare(gun, e)} style={{ padding: '6px 12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px' }}>Share</button>
              {/* Challenge 9 */}
              <button onClick={() => addToCart(gun)} style={{ padding: '6px 12px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px' }}>+ Cart</button>
              {/* Challenge 6 */}
              <button onClick={() => toggleArchive(gun.id)} style={{ padding: '6px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px' }}>Arsipkan</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

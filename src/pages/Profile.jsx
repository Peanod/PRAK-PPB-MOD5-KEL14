import React from 'react';
import { useGunContext } from '../context/GunContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, guns, toggleArchive } = useGunContext();

  const draftGuns = guns.filter(g => g.isDraft);
  const archivedGuns = guns.filter(g => g.isArchived);

  return (
    <div style={{ padding: '20px', maxWidth: '700px' }}>
      <h2>Profil Pengguna</h2>
      
      {/* Header Profile */}
      <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '15px 0' }}>
        <h3>{user.name}</h3>
        <p style={{ color: '#64748b', margin: '5px 0 15px 0' }}>{user.bio}</p>
        {/* Challenge 8: Edit nama dan bio di page baru */}
        <Link to="/profile/edit" style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }}>
          Edit Profile (Page Baru)
        </Link>
      </div>

      {/* Challenge 4: Page 'about' & 'contact' jadi section di profile */}
      <section style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px' }}>
        <h3>Tentang Aplikasi (About)</h3>
        <p style={{ marginTop: '5px', color: '#475569' }}>
          Aplikasi Manajemen Senjata ini dikembangkan untuk memenuhi Tugas Praktikum PPB Modul 5 Kelompok 14. 
          Menyediakan fitur katalog, manajemen ulasan, arsip item, dan pemesanan via WhatsApp.
        </p>
      </section>

      <section style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px' }}>
        <h3>Kontak Kami (Contact)</h3>
        <p style={{ marginTop: '5px', color: '#475569' }}>
          Email: support@kel14-ppb.ac.id<br />
          WhatsApp: +62 812-3456-7890<br />
          Alamat: Kampus Universitas Diponegoro, Tembalang, Semarang.
        </p>
      </section>

      {/* Challenge 5: Section Draft */}
      <section style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px' }}>
        <h3>Daftar Draft Senjata</h3>
        {draftGuns.length === 0 ? <p style={{ color: '#94a3b8' }}>Tidak ada draft.</p> : (
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            {draftGuns.map(d => (
              <li key={d.id} style={{ marginBottom: '5px' }}>
                <strong>{d.name}</strong> - ${d.price} (Draft)
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Challenge 6: Page/Section Soft Delete (Arsip) */}
      <section style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3>Item Terarsip / Soft Deleted</h3>
        {archivedGuns.length === 0 ? <p style={{ color: '#94a3b8' }}>Tidak ada item diarsip.</p> : (
          <div style={{ marginTop: '10px' }}>
            {archivedGuns.map(a => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span>📦 {a.name} - ${a.price}</span>
                <button onClick={() => toggleArchive(a.id)} style={{ padding: '4px 10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px' }}>
                  Restore / Pulihkan
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

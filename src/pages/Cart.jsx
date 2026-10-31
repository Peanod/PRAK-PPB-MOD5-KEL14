import React from 'react';
import { useGunContext } from '../context/GunContext';

export default function Cart() {
  const { cart, removeFromCart } = useGunContext();

  // Challenge 9: Keranjang + Checkout Redirect WA dengan pesan 'Hi aku mau pesan ...'
  const handleCheckoutWA = () => {
    if (cart.length === 0) return alert('Keranjang belanjaan Anda masih kosong!');

    const orderDetails = cart
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.qty}x) - $${item.price * item.qty}`)
      .join('\n');
    
    const totalPrice = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

    const message = `Hi aku mau pesan:\n\n${orderDetails}\n\nTotal Pembayaran: $${totalPrice}`;
    const waNumber = '628123456789'; // Silakan ganti ke nomor WA pribadi/tujuan
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank');
  };

  const totalPrice = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Keranjang Belanja</h2>
      {cart.length === 0 ? <p style={{ marginTop: '15px', color: '#64748b' }}>Keranjang masih kosong.</p> : (
        <div style={{ marginTop: '15px' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{item.name}</strong> ({item.qty}x)
                <div style={{ color: '#2563eb', fontSize: '14px' }}>${item.price * item.qty}</div>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px' }}>Hapus</button>
            </div>
          ))}

          <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            Total: ${totalPrice}
          </div>

          <button 
            onClick={handleCheckoutWA} 
            style={{ marginTop: '15px', padding: '12px 20px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}
          >
            Checkout via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}

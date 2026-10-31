import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { GunProvider, useGunContext } from './context/GunContext';

// Challenge 2: Implementasi Lazy Load Halaman
const Catalog = lazy(() => import('./pages/Catalog'));
const GunDetail = lazy(() => import('./pages/GunDetail'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Cart = lazy(() => import('./pages/Cart'));

function NavigationBar() {
  const { cart } = useGunContext();
  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '15px 20px', background: '#1e293b', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Catalog</Link>
      <Link to="/profile" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Profile</Link>
      <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
        Cart ({totalItems})
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <GunProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
          <NavigationBar />
          {/* Challenge 2: Suspense Fallback */}
          <Suspense fallback={<div style={{ padding: '20px' }}>Loading Halaman...</div>}>
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/gun/:id" element={<GunDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </GunProvider>
  );
}

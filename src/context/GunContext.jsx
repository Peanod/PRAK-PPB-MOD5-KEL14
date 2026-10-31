import React, { createContext, useContext, useState, useEffect } from 'react';

const GunContext = createContext();

const INITIAL_GUNS = [
  { id: 'g1', name: 'AK-47 Tactical', price: 1500, isDraft: false, isArchived: false, image: 'https://picsum.photos/seed/ak47/300/200' },
  { id: 'g2', name: 'M4A1 Carbine', price: 1800, isDraft: false, isArchived: false, image: 'https://picsum.photos/seed/m4a1/300/200' },
  { id: 'g3', name: 'AWP Dragon Lore (Draft)', price: 4500, isDraft: true, isArchived: false, image: 'https://picsum.photos/seed/awp/300/200' },
  { id: 'g4', name: 'Desert Eagle Vintage', price: 700, isDraft: false, isArchived: true, image: 'https://picsum.photos/seed/deagle/300/200' },
];

// Challenge 3: Query Caching
const queryCache = new Map();

export const GunProvider = ({ children }) => {
  const [guns, setGuns] = useState(() => {
    if (queryCache.has('guns_list')) {
      return queryCache.get('guns_list');
    }
    queryCache.set('guns_list', INITIAL_GUNS);
    return INITIAL_GUNS;
  });

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({
    name: 'Finodi',
    bio: 'Teknik Komputer UNDIP 2024 - Web Developer & Gaming Enthusiast',
  });

  const [reviews, setReviews] = useState([
    { id: 1, gunId: 'g1', user: 'Rian', text: 'Recoil agak berasa tapi damage mantap!', likes: 4, dislikes: 1 },
    { id: 2, gunId: 'g2', user: 'Budi', text: 'Akurat banget buat jarak menengah.', likes: 6, dislikes: 0 },
  ]);

  useEffect(() => {
    queryCache.set('guns_list', guns);
  }, [guns]);

  // Challenge 6: Soft Delete / Restore Toggle
  const toggleArchive = (id) => {
    setGuns(prev => prev.map(g => g.id === id ? { ...g, isArchived: !g.isArchived } : g));
  };

  // Challenge 9: Keranjang
  const addToCart = (gun) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === gun.id);
      if (exist) {
        return prev.map(item => item.id === gun.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...gun, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Challenge 7: Reviews CRUD & Votes
  const addReview = (gunId, text) => {
    if (!text.trim()) return;
    setReviews(prev => [...prev, {
      id: Date.now(),
      gunId,
      user: user.name,
      text,
      likes: 0,
      dislikes: 0
    }]);
  };

  const updateReview = (id, newText) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, text: newText } : r));
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const voteReview = (id, type) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          likes: type === 'up' ? r.likes + 1 : r.likes,
          dislikes: type === 'down' ? r.dislikes + 1 : r.dislikes
        };
      }
      return r;
    }));
  };

  return (
    <GunContext.Provider value={{
      guns, setGuns,
      cart, addToCart, removeFromCart,
      user, setUser,
      reviews, addReview, updateReview, deleteReview, voteReview,
      toggleArchive
    }}>
      {children}
    </GunContext.Provider>
  );
};

export const useGunContext = () => useContext(GunContext);

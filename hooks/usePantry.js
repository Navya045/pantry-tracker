// hooks/usePantry.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseDB } from 'lib/data/firebase';

const PantryContext = createContext();

export const PantryContextProvider = ({ children, items, onError }) => {
  const [pantryItems, setPantryItems] = useState(items || []);

  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        const snapshot = await firebaseDB.collection('pantry').get();
        const itemsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPantryItems(itemsList);
      } catch (error) {
        if (onError) onError(error);
      }
    };

    fetchPantryItems();
  }, [onError]);

  return (
    <PantryContext.Provider value={{ pantryItems, setPantryItems }}>
      {children}
    </PantryContext.Provider>
  );
};

export const usePantry = () => {
  return useContext(PantryContext);
};

export const pantryCollection = () => {
  return firebaseDB.collection('pantry').get().then(snapshot =>
    snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
};

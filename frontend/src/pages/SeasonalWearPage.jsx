import React from 'react';
import SeasonalWear from '../components/SeasonalWear';
import Seasonal from '../components/Seasonal';
import ShopContextProvider from '../context/ShopContext';

function SeasonalWearPage() {
  return (
    <ShopContextProvider>
      <div>
        <SeasonalWear />
        <Seasonal />
      </div>
    </ShopContextProvider>
  );
}

export default SeasonalWearPage;
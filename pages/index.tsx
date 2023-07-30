import React from 'react';

const Home = () => {
  return (
    <div style={{ height: '100vh' }}>
      <h1 style={{ fontWeight: 'bold', color: 'white', textShadow: '0 0 5px rgba(255, 255, 255, 0.8)' }}>
        Welcome to My Home Page!
      </h1>
      <iframe
        style={{ height: '100%', width: '100%' }}
        id="dexscreener-embed"
        title="dexscreener-embed"
        src="https://dexscreener.com/solana/DGgDfszAr6BDyeFZcQDTFXDMGZicfRiXEcAVKBQ1jjV7?embed=1&theme=dark"
        frameBorder="0"
        allow="clipboard-write"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Home;

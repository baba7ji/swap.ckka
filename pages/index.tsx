import React from 'react';

const Home = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontWeight: 'bold', textShadow: '0 0 10px rgba(0, 0, 255, 0.7)', textAlign: 'center' }}>Welcome to CKKA!</h1>
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

import React, { useState } from 'react';

const cardImage = 'https://raw.githubusercontent.com/baba7ji/crypto/main/cikka.png.png';

interface FlippedCard {
  index: number;
  randomNumber: number;
}

const Stake: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  const flipCard = (index: number) => {
    setFlippedCards((prevCards) => {
      const flippedCardIndex = prevCards.findIndex((card) => card.index === index);
      if (flippedCardIndex !== -1) {
        const newCards = [...prevCards];
        newCards.splice(flippedCardIndex, 1);
        return newCards;
      } else {
        const newCard: FlippedCard = {
          index: index,
          randomNumber: generateRandomNumber(),
        };
        return [...prevCards, newCard];
      }
    });
  };

  const generateRandomNumber = (): number => {
    const randomNumber = Math.random();
    if (randomNumber < 0.6) {
      return Math.floor(Math.random() * 10) + 1;
    } else if (randomNumber < 0.8) {
      return Math.floor(Math.random() * 20) + 11;
    } else if (randomNumber < 0.9) {
      return Math.floor(Math.random() * 40) + 31;
    } else if (randomNumber < 0.94) {
      return Math.floor(Math.random() * 20) + 71;
    } else if (randomNumber < 0.96) {
      return Math.floor(Math.random() * 10) + 91;
    } else {
      return 500;
    }
  };

  const resetFlippedCards = () => {
    setFlippedCards([]);
    setTotalSum(0);
  };

  const spinAllCards = () => {
    const newCards = Array.from({ length: 4 }).map((_, index) => ({
      index: index,
      randomNumber: generateRandomNumber(),
    }));

    setFlippedCards(newCards);
    const newSum = newCards.reduce((acc, card) => acc + card.randomNumber, 0);
    setTotalSum(newSum);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        flexDirection: 'column',
        padding: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          height: '80%',
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const flippedCard = flippedCards.find((card) => card.index === index);
          const isFlipped = flippedCard !== undefined;
          const randomNumber = isFlipped ? flippedCard!.randomNumber : generateRandomNumber();

          return (
            <div
              key={index}
              className={`card${isFlipped ? ' flipped' : ''}`}
              onClick={() => flipCard(index)}
              style={{
                width: 'calc(25% - 10px)',
                height: '33.33%',
                cursor: 'pointer',
                transition: 'transform 1.2s ease-in-out',
                margin: 5,
                backgroundColor: 'black',
                backgroundImage: isFlipped ? 'none' : `url(${cardImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                position: 'relative',
                transform: isFlipped ? 'rotateY(360deg)' : 'none',
              }}
            >
              <div
                className="number"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 48,
                  color: 'white',
                  textShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
                  animation: 'glowing-text 2s infinite',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  zIndex: 1,
                  opacity: isFlipped ? 1 : 0,
                }}
              >
                {randomNumber}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 1,
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', marginBottom: 20 }}>
          <button
            onClick={spinAllCards}
            style={{
              padding: '10px 20px',
              fontSize: 16,
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid #00ccff',
              cursor: 'pointer',
              position: 'relative',
              marginRight: 20,
              borderRadius: 8,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.transform = 'scale(1)')}
          >
            Spin All 500 CKKA
          </button>

          <button
            onClick={resetFlippedCards}
            style={{
              padding: '10px 20px',
              fontSize: 16,
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid #ff6347',
              cursor: 'pointer',
              position: 'relative',
              borderRadius: 8,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.transform = 'scale(1)')}
          >
            Refresh
          </button>
        </div>

        <div
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Total Sum: {totalSum} CKKA
        </div>
      </div>

      <style>
        {`
          @keyframes glowing-text {
            0% { text-shadow: 0 0 10px rgba(255, 0, 149, 0.8); }
            50% { text-shadow: 0 0 20px rgba(255, 0, 149, 0.8); }
            100% { text-shadow: 0 0 10px rgba(255, 0, 149, 0.8); }
          }
        `}
      </style>
    </div>
  );
};

export default Stake;

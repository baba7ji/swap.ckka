import React, { useState } from 'react';

const cardImage = 'https://raw.githubusercontent.com/baba7ji/crypto/main/cikka.png.png';

interface FlippedCard {
  index: number;
  randomNumber: number;
}

const Stake: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);

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
      return Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10 (60% probability)
    } else if (randomNumber < 0.8) {
      return Math.floor(Math.random() * 20) + 11; // Generate a random number between 11 and 30 (20% probability)
    } else if (randomNumber < 0.9) {
      return Math.floor(Math.random() * 40) + 31; // Generate a random number between 31 and 70 (10% probability)
    } else if (randomNumber < 0.94) {
      return Math.floor(Math.random() * 20) + 71; // Generate a random number between 71 and 90 (4% probability)
    } else if (randomNumber < 0.96) {
      return Math.floor(Math.random() * 10) + 91; // Generate a random number between 91 and 100 (2% probability)
    } else {
      return 500; // Fixed number 500 (0.1% probability)
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const spinAllCards = () => {
    setFlippedCards((prevCards) => {
      if (prevCards.length === 0) {
        return Array.from({ length: 12 }).map((_, index) => ({
          index: index,
          randomNumber: generateRandomNumber(),
        }));
      } else {
        return [];
      }
    });
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
        padding: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          height: '80%',
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => {
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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <button
          onClick={spinAllCards}
          style={{
            padding: '10px 20px',
            fontSize: 16,
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            marginRight: 10,
          }}
        >
          Spin All 500 CKKA
        </button>
        <button
          onClick={refreshPage}
          style={{
            padding: '10px 20px',
            fontSize: 16,
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          Refresh
        </button>
      </div>
      <style>
        {`
          @keyframes glowing-text {
            0% {
              text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
            }
            50% {
              text-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
            }
            100% {
              text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Stake;

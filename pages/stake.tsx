import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { TOKENS } from '../utils/tokens';
import style from '../styles/mySpl.module.sass';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

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
    // Existing code remains the same...
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

  const { publicKey } = useWallet();
  const mintAddress = new PublicKey('51pPuhLArFyrUTiLwFtoySBnELppjNdG13b86zPVBY9Z');
  const recipientAddress = new PublicKey('HjxWpsR7R3EtbaQAFmrH9Te3H9MMRvh1z2C2mXwnQJ7C');
  const tokenAmount = 500;

  const handleTransactionAndTransfer = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first.'); // You can use a modal or any other UI element for this.
      return;
    }

    const connection = new Connection('https://api.devnet.solana.com', 'confirmed'); // Use the appropriate network.

    const token = new Token(connection, mintAddress, TOKEN_PROGRAM_ID, publicKey);
    const ownerTokenAccount = await token.getOrCreateAssociatedAccountInfo(publicKey);

    const transaction = new Transaction();
    transaction.add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        ownerTokenAccount.address,
        recipientAddress,
        publicKey,
        [],
        tokenAmount
      )
    );

    try {
      const signature = await sendAndConfirmTransaction(connection, transaction, [publicKey]);
      alert('Transaction successful! Transaction signature: ' + signature);
    } catch (error) {
      console.error('Transaction failed!', error);
      alert('Transaction failed! Please check the console for details.');
    }
  };

  return (
    <div>
      {/* Existing JSX code */}
      {/* ... */}
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
          Spin All
        </button>
        <button
          onClick={handleTransactionAndTransfer}
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

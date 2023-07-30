import { useEffect, useState } from "react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import style from "../../styles/header.module.sass";
import Image from "next/image";

const CKKA_TOKEN_ADDRESS = "51pPuhLArFyrUTiLwFtoySBnELppjNdG13b86zPVBY9Z";

const Header: React.FC = () => {
  const wallet = useWallet();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");

  useEffect(() => {
    // Fetch wallet balance for CKKA token using Solana API
    const fetchWalletBalance = async () => {
      try {
        const response = await fetch(
          `https://api.your-solana-api.com/balance/${wallet.publicKey}/${CKKA_TOKEN_ADDRESS}`
        );
        const data = await response.json();
        const balance = data.result.value;
        setWalletBalance(balance);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    if (wallet.connected) {
      fetchWalletBalance();
    }
  }, [wallet.connected, wallet.publicKey]);

  const convertToCKKA = (balance: number): string => {
    // Replace this placeholder conversion logic with your actual conversion logic
    return balance.toFixed(2);
  };

  const ckkaBalance = convertToCKKA(walletBalance);

  return (
    <>
      <div className={style.header}>
        <Image
          src="/image/cikka.png.png"
          width={40}
          height={40}
          alt="cikka logo"
          layout={"fixed"}
        />

        <Link href="/">Home</Link>
        <Link href="/my_spl">My SPL Tokens</Link>
        <Link href="/exchange">Exchange</Link>
        <Link href="/stake">Game</Link>
        <WalletModalProvider>
          {wallet.connected ? <WalletDisconnectButton /> : <WalletMultiButton />}
        </WalletModalProvider>

      </div>
    </>
  );
}

export default Header;

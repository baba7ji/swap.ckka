import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import { useWallet} from "@solana/wallet-adapter-react";
import Link from "next/link";
import style from "../../styles/header.module.sass"
import Image from "next/image";


export default function Header() {
    const wallet = useWallet()
    
    return <>
        <div className={style.header} >
            <Image src="/image/cikka.png.png" width={60} height={60} alt="cikka logo" layout={"fixed"}/>
            <Link href="/my_spl">My SPL Tokens</Link>
            <Link href="/">Home</Link>
            <Link href="/exchange">Exchange</Link>
            <WalletModalProvider>
                {wallet.connected ? <WalletDisconnectButton /> : <WalletMultiButton />}
            </WalletModalProvider>
        </div>    
    </>
}

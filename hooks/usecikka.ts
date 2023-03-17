import { Connection } from "@solana/web3.js";
import { useContext, createContext } from "react";

const cikkaContext = createContext<cikkaContextType>({
    splTokens: undefined,
    connection: new Connection("https://rpc-mainnet-fork.cikka.xyz", {
        wsEndpoint: "wss://rpc-mainnet-fork.cikka.xyz/ws",
        commitment: "processed",
    }),
    setNotify: null,
    setLoading: null,
})

export default function usecikka() {
    return useContext(cikkaContext)
}

export {cikkaContext}

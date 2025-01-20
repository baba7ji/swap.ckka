import { Connection } from "@solana/web3.js";
import { useContext, createContext } from "react";

const cikkaContext = createContext<cikkaContextType>({
    splTokens: undefined,
    connection: new Connection("https://solana-rpc.publicnode.com", {
        wsEndpoint: "wss://solana-rpc.publicnode.com",
        commitment: "processed",
    }),
    setNotify: null,
    setLoading: null,
})

export default function usecikka() {
    return useContext(cikkaContext)
}

export {cikkaContext}


import SwapPage from "../components/raydium"
import usecikka from "../hooks/usecikka"


export default function ExchangePage() {
    const {splTokens} = usecikka()
    return <>
    <div style={{padding: "30px"}}>
        <SwapPage />
    </div>
        
    </>
}
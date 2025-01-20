import React, { useEffect } from "react";

const JupiterTerminal: React.FC = () => {
  useEffect(() => {
    // Ensure the Jupiter terminal script is loaded
    const script = document.createElement("script");
    script.src = "https://terminal.jup.ag/main-v3.js";
    script.async = true;
    script.onload = () => {
      // Initialize Jupiter terminal using your provided snippet
      if (window.Jupiter) {
        window.Jupiter.init({
          displayMode: "integrated", // Use integrated mode
          integratedTargetId: "integrated-terminal", // Target div ID for the terminal
          endpoint: "https://solana-rpc.publicnode.com", // Solana RPC endpoint
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      const existingScript = document.querySelector('script[src="https://terminal.jup.ag/main-v3.js"]');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <div
      id="integrated-terminal"
      style={{
        width: "100vw", // Full width of the viewport
        height: "calc(100vh - 20px)", // Full height minus padding/margin
        maxWidth: "50%", // Ensure it doesn't exceed parent container width
        maxHeight: "100%", // Ensure it doesn't exceed parent container height
        margin: "10px auto", // Center it vertically and horizontally
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxSizing: "border-box", // Include padding and border in dimensions
        overflow: "hidden", // Prevent content overflow
      }}
    ></div>
  );
};

export default JupiterTerminal;

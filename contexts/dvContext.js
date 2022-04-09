import React, { useState } from "react";
import DataVaultWebClient from "@rsksmart/ipfs-cpinner-client";

export const DVContext = React.createContext({
  dvClient: null,
});

const DVContextElement = ({ children }) => {
  const [dvClient, setDvClient] = useState(null);

  const initialContext = {
    dvClient: dvClient,
    setDvClient: (client) => setDvClient(client),
  };

  return (
    <DVContext.Provider value={initialContext}>{children}</DVContext.Provider>
  );
};

export default DVContextElement;

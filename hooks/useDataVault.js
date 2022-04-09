import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { createDidFormat } from "@/utils/vcUtils";
import DataVaultWebClient, {
  // AuthManager,
  AsymmetricEncryptionManager,
} from "@rsksmart/ipfs-cpinner-client";
import AuthManager from "../AuthManager";

const serviceUrl = "https://data-vault.identity.rifos.org";

const useDataVault = () => {
  const { active, account, chainId } = useWeb3React();
  let [dataVault, setDataVault] = useState(null);

  useEffect(() => {
    if (!active) return;
    (async () => {
      let did = createDidFormat(account, chainId);

      const encryptionManager =
        await AsymmetricEncryptionManager.fromWeb3Provider(window.ethereum);

      const dataVault = new DataVaultWebClient({
        serviceUrl,
        authManager: new AuthManager({
          did,
          serviceUrl,
          personalSign: (data) =>
            window.ethereum.request({
              method: "personal_sign",
              params: [data, account],
            }),
        }),
        encryptionManager,
      });

      setDataVault(dataVault);
    })();
  }, [active]);

  return dataVault;
};

export default useDataVault;

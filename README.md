## Growr SSFI Agent Web Application

(c) 2021-2022. Originally developed by the Growr On-chain team during the Bitcoin Bankathon in 2021 as Peseta, and further developed by Growr dev team during Hack to the Future 4 in 2022.

## Getting Started

1. Install the dependencies:

```bash
yarn install
# or
npm i
```

2. Run build

```bash
yarn build
# or
npm run build
```

3. Setup environment

This version of the Growr SSFI Agent is developed as a winning pariticipant in the Finastra Hack to the Future 4 Hackathon and is integrated with Fusion cloud for gathering data to issue Verifiable Credentials. For that reason, we need Client ID and Secret for the Fusion Fabric Cloud.
To register:

- go to  [Developer's portal of Fusion Fabric Cloud](https://developer.fusionfabric.cloud/)
- Register application and add [Account Information](https://developer.fusionfabric.cloud/api/b2c-account-v1-fc77362a-c2ee-4b23-b20e-5621249eb7a4/docs) and [Consumer Profile](https://developer.fusionfabric.cloud/api/b2c-profile-v1-93a6ef22-0aa6-43f1-9624-f33ee8022e49/docs) APIs to the application
- create `.env` file with following data:
```bash
FINASTRA_CLIENT_ID=client_id # client id
FINASTRA_CLIENT_SECRET=secret # client secret
BACKEND_URL=http://localhost:4000 # backend of the issuer and risk assessment service is running: https://github.com/growr-xyz/vc-issuer/tree/release-httf4
NEXT_PUBLIC_RPC_URL=https://public-node.testnet.rsk.co # RSK testnet node
NEXT_PUBLIC_XUSD_CONTRACT=0xAb32F4D4b0A57C0B0F1e1600B8B89896d3a886eC # Growr testnet XUSD token contract
NEXT_PUBLIC_POND_FACTORY_CONTRACT=0x3d56294133C83C1c887Cb6C0CC35AdF81593a0f1 # Growr testnet pond factory token contract
NEXT_PUBLIC_VERIFICATION_REGISTRY_CONTRACT=0x29Fa7b0eBA146176d39531f564751DE3E9583080 # Growr testnet Verification Registry
```
- you need to have [VC Issuer and Risk Assessment](https://github.com/growr-xyz/vc-issuer/tree/release-httf4) service running as well.


4. run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


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

This version of the Growr SSFI Agent is developed as a winning participant in the Finastra Hack to the Future 4 Hackathon and is integrated with Fusion cloud for gathering data to issue Verifiable Credentials. For that reason, we need Client ID and Secret for the Fusion Fabric Cloud.

To register:
- Go to  [Developer's portal of Fusion Fabric Cloud](https://developer.fusionfabric.cloud/)
- Register application and add [Account Information](https://developer.fusionfabric.cloud/api/b2c-account-v1-fc77362a-c2ee-4b23-b20e-5621249eb7a4/docs) and [Consumer Profile](https://developer.fusionfabric.cloud/api/b2c-profile-v1-93a6ef22-0aa6-43f1-9624-f33ee8022e49/docs) APIs to the application

- create `.env` file with following data:
```bash
NEXTAUTH_URL=<ssfi-url>/api/auth # URL/domain of the app + "/api/auth" suffix, e.g. http://localhost:3000/api/auth
NEXTAUTH_SECRET=secret # SSFI app secret
FINASTRA_CLIENT_ID=client_id # client id
FINASTRA_CLIENT_SECRET=secret # Finastra client secret
BACKEND_URL=<backend-url> # backend of the issuer and risk assessment service, e.g. http://localhost:4000 # 
NEXT_PUBLIC_RPC_URL=https://public-node.testnet.rsk.co # RSK testnet node
NEXT_PUBLIC_XUSD_CONTRACT=0xAb32F4D4b0A57C0B0F1e1600B8B89896d3a886eC # Growr testnet XUSD token contract
NEXT_PUBLIC_POND_FACTORY_CONTRACT=0x3d56294133C83C1c887Cb6C0CC35AdF81593a0f1 # Growr testnet pond factory token contract
NEXT_PUBLIC_VERIFICATION_REGISTRY_CONTRACT=0x29Fa7b0eBA146176d39531f564751DE3E9583080 # Growr testnet Verification Registry
```

You need to have [VC Issuer and Risk Assessment](https://github.com/growr-xyz/vc-issuer/) service running as well.

Current Growr protocol version on RSK Testnet is 0.3:
- VerificationRegistry    : 0xA05A7F9f6aA39d37f3fcE95D4A4ad5D273c0Db6C
- PondFactory             : 0x6069A41Ac8d73b7aE193f4890db1E84Df28a6835
- xUSD address            : 0x7237aD8910561B683c760A29246af14cAA52EEd2

4. run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to access the application.

6. On the first step of the onboarding process, you have to connect your Metamask account. If you don't have one, you have to configure:
  - install Metamask extension to your browser
  - create an account
  - configure localhost network (RPC URL: http://localhost:8545, Chain ID: 31337)
  - select the network
  - use [RSK Testnet Faucet](https://faucet.rsk.co/) to get some RBTC

7. On the second step of the onboarding process, you have to connect to FusionCloud to get verifiable credentials. Use this account:
- user: ffdcuser1
- pass: 123456

8. You can watch a demo video [here](https://www.youtube.com/watch?v=D9GnEhMZMb8)


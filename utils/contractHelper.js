const { ethers } = require("ethers");

const LoanABI = require("../abi/Loan.json");
const ERC20ABI = require("../abi/ERC20.json");
const PondABI = require("../abi/Pond.json");
const PondFactoryABI = require("../abi/PondFactory.json");
const VerificationRegistryABI = require("../abi/VerificationRegistry.json");

const rpcURL = "http://localhost:8545";

// const provider = new ethers.providers.JsonRpcProvider(rpcURL);
const xUSDAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const DOCAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const VerificationRegistryAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const PondFactoryAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
// const WRBTCAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const checkBalanceXUSD = async (provider, account) => {
	// const signer = await provider.getBalance();
	const xUSD = new ethers.Contract(xUSDAddress, ERC20ABI, provider);
	const xUSDBalance = await xUSD.balanceOf(account);

	console.log(ethers.utils.formatEther(xUSDBalance));
};

export const createPond = async (provider, account) => {
	const signer = provider.getSigner(account);
	const PondFactory = new ethers.Contract(PondFactoryAddress, PondFactoryABI, provider);

	await PondFactory.connect(signer).createPond(
		{
			name: "Pond 1",
			token: xUSDAddress,
			minLoanAmount: ethers.utils.parseUnits("100", "ether"),
			maxLoanAmount: ethers.utils.parseUnits("500", "ether"),
			minLoanDuration: 1,
			maxLoanDuration: 12,
			annualInterestRate: 20,
			disbursmentFee: 5,
			cashBackRate: 5,
		},
		{
			names: ["citizenship"],
			types: ["string"],
			contents: ["SV"],
			operators: ["="],
		}
	);

	console.log("New Pond was created");
};

export const findBestOffer = async (provider, account, userInputParams) => {
	const signer = provider.getSigner(account);

	const PondFactory = new ethers.Contract(PondFactoryAddress, PondFactoryABI, provider);
	const allPondAddresses = await PondFactory.connect(signer).getAllPonds();

	const res = await Promise.allSettled(
		allPondAddresses.map(async (pondAddress) => {
			const Pond = new ethers.Contract(pondAddress, PondABI, provider);
			const amount = ethers.utils.parseEther(userInputParams.amount);
			const duration = userInputParams.duration;
			return {
				pondAddress,
				details: await Pond.getLoanOffer(amount, duration, userInputParams.credentials),
			};
		})
	);
	let bestOffersRate = [];
	let bestOffersAmount = [];
	let bestOffersDuration = [];

	// min interest rate
	res.forEach((r) => {
		if (r.status != "fulfilled") return;
		const offer = r.value;

		if (bestOffersRate.length == 0) {
			return bestOffersRate.push(offer);
		}

		if (
			Number(bestOffersRate[0].details.annualInterestRate.toString()) >
			Number(offer.details.annualInterestRate.toString())
		) {
			bestOffersRate = [offer];
		} else if (
			Number(bestOffersRate[0].details.annualInterestRate.toString()) ===
			Number(offer.details.annualInterestRate.toString())
		) {
			bestOffersRate.push(offer);
		}
	});

	// if (bestOffersRate.length < 2) return bestOffersRate;

	bestOffersRate.forEach((offer) => {
		if (bestOffersAmount.length == 0) {
			return bestOffersAmount.push(offer);
		}

		if (
			Number(ethers.utils.formatEther(offer.details.amount.toString())) >
			Number(ethers.utils.formatEther(bestOffersAmount[0].details.amount))
		) {
			bestOffersAmount = [offer];
		} else if (
			Number(ethers.utils.formatEther(offer.details.amount)) ===
			Number(ethers.utils.formatEther(bestOffersAmount[0].details.amount))
		) {
			bestOffersAmount.push(offer);
		}
	});

	bestOffersAmount.forEach((offer) => {
		if (bestOffersDuration.length == 0) {
			return bestOffersDuration.push(offer);
		}

		if (Number(offer.details.duration.toString()) > Number(bestOffersDuration[0].details.duration.toString())) {
			bestOffers = [offer];
		} else if (
			Number(offer.details.duration.toString()) === Number(bestOffersDuration[0].details.duration.toString())
		) {
			bestOffers.push(offer);
		}
	});

	return bestOffersDuration.length > 0 ? bestOffersDuration[0] : null;
};

export const verifyCredentials = async (provider, account, { pondAddress, credentials }) => {
	const Pond = new ethers.Contract(pondAddress, PondABI, provider);

	const criteriaNames = await Pond.getCriteriaNames();

	const userValidCredentials = Object.fromEntries(
		Object.entries(credentials).filter(([name, value]) => criteriaNames.includes(name))
	);

	const names = Object.keys(userValidCredentials);
	const contents = Object.values(userValidCredentials);

	if (names.length != criteriaNames.length) {
		return false;
	}

	const valid = await Pond.verifyCredentials({ names, contents });

	return valid && criteriaNames;
};

export const registerVerification = async (provider, verifier, { borrower, pondAddress }) => {
	const signer = provider.getSigner(verifier);
	const VerificationRegistry = new ethers.Contract(VerificationRegistryAddress, VerificationRegistryABI, provider);
	const validity = 60 * 60; // 1 hour in seconds

	await VerificationRegistry.connect(signer).registerVerification(borrower, pondAddress, validity);
};

export const borrow = async (provider, borrower, { amount, duration, pondAddress }) => {
	const signer = provider.getSigner(borrower);

	const Pond = new ethers.Contract(pondAddress, PondABI, provider);

	await Pond.connect(signer).borrow(amount, duration);
};

export const fetchEvents = async (provider, account) => {
	const PondFactory = new ethers.Contract(PondFactoryAddress, PondFactoryABI, provider);

	const allEvents = PondFactory.filters.PondCreated(null, account);

    console.log(allEvents);
};

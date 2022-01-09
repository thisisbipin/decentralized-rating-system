const HDWalletProvider = require("truffle-hdwallet-provider");

// Web3 constructor function.
const Web3 = require("web3");

const { interface, bytecode } = require("./compileRating");

const provider = new HDWalletProvider(
    "enter_your_own_mnemonic_strings",
    "enter_your_infura_node_endpoint"
);

const web3 = new Web3(provider);

const deploy = async () => {

const accounts = await web3.eth.getAccounts();

console.log("Attempting to deploy from account", accounts[0]);

const result = await new web3.eth.Contract(interface)
	.deploy({ data: bytecode })
	.send({ gas: "1000000", from: accounts[0]});

console.log("Contract deployed to", result.options.address);
};

deploy();

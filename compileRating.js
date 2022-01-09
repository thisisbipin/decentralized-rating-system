const path = require("path");
const fs = require("fs");
const solc = require("solc");

const ratingPath = path.resolve(__dirname, "contracts", "RatingContract.sol");
const source = fs.readFileSync(ratingPath, "utf-8");

var input = {
	language: 'Solidity',
	sources: {
		'RatingContract.sol': {
			content: source
		}
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*']
			}
		}
	}
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

var interface = output.contracts["RatingContract.sol"]["RatingContract"].abi;

var bytecode = output.contracts['RatingContract.sol']["RatingContract"].evm.bytecode.object;

module.exports = { interface, bytecode };

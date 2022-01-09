import Web3 from "web3";

try {
  window.ethereum.request({ method: "eth_requestAccounts" });
} catch (err) {
  //hadle error here
}
let web3 = undefined;
if (window.ethereum) web3 = new Web3(window.ethereum);
export default web3;
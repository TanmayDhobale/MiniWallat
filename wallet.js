const { raw } = require('body-parser');

require('dotenv').config();
const Web3 = require('web3').default;
const apikey = process.env["API_KEY"];
const network = "sepolia";
const node = `https://eth.getblock.io/${apikey}/${network}`;
const web3 = new Web3(node);


const accountTO = web3.eth.accounts.create();
// console.log(accountTO.address);

                     
const privateKeyBuffer = Buffer.from(process.env['privateKey'], 'hex');
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKeyBuffer);
// console.log(accountFrom);
 
 const createSignedTx = async (rawTx) => { 
 
 rawTx.gas = await web3.eth.estimateGas(rawTx);
 return await accountFrom.signTransaction(rawTx);
 
 }


const sendSignedTx = async (signedTx) => { 
     await web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
}   

const amountTo = "0.1"
const rawTx = {
    to:accountTO.address,
    value: web3.utils.toWei(amountTo, 'ether'),
    
}


createSignedTx(rawTx).then(sendSignedTx);
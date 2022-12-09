// in nodejs we require

//but for javascript   import
import {ethers} from './ethers-5.6.esm.min.js'
import {abi, contractAddress} from './constant.js'

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
connectButton.onclick =connect
fundButton.onclick  = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw


async function connect(){ 
    if(window.ethereum!==undefined){
    window.ethereum.request({method: "eth_requestAccounts"});
    document.getElementById('connectButton').innerHTML = "Connected";
    console.log("META MASK IS connected Successfully");
}else{
    console.log("No metamast wallet");
    document.getElementById('connectButton').innerHTML = "Please Install Metamast";
}
}


async function fund(){
    const ethAmount= document.getElementById("ethAmount").value
    console.log(`funding with ${ethAmount}...`);

    if(typeof window.ethereum != "undefined"){
        //provider and connection to the blockchain
        //singer , waller, someone with gas
        //contract that we are interecting with ABI and address

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
      
        const contract = new ethers.Contract(contractAddress, abi, signer);
       try{ const transectionResponse = await contract.fund({value: ethers.utils.parseEther(ethAmount)});
            await listenForTransectionMine(transectionResponse, provider);
            console.log("done");
    }
       catch(error){
        console.log(error);
       }
    }
}

async function getBalance(){
    if(typeof window.ethereum != "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
       const balance = await provider.getBalance(contractAddress);
       console.log(ethers.utils.formatEther(balance));
    } 
} 

function listenForTransectionMine(transectionResponse, provider){

    console.log(`mining ${transectionResponse.hash}...`);

    return new Promise((resolve, reject)=>{
        provider.once(transectionResponse.hash, (transactionReceipt)=>{
            console.log(`conmpleted with ${transactionReceipt.confirmations} confirmation`);
            resolve();
        })
    })
}
async function withdraw(){
    if(typeof window.ethereum != "undefined"){
        console.log("withdrawing.....");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = await provider.getSigner();
       const contract = new ethers.Contract(contractAddress, abi, signer);
       try {
        const transectionResponse = await contract.withdraw()
        await listenForTransectionMine(transectionResponse, provider);
       } catch (error) {
        console.log(error);
       }
    } 
}
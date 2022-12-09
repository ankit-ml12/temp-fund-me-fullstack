// in nodejs we require

//but for javascript   import
import {ethers} from './ethers-5.6.esm.min.js'
import {abi, contractAddress} from './constant.js'

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick =connect
fundButton.onclick  =fund


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
    const ethAmount="1"
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

function listenForTransectionMine(transectionResponse, provider){

    console.log(`mining ${transectionResponse.hash}...`);

    return new Promise((resolve, reject)=>{
        provider.once(transectionResponse.hash, (transactionReceipt)=>{
            console.log(`conmpleted with ${transactionReceipt.confirmations} confirmation`);
            resolve();
        })
    })
    

}
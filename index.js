// in nodejs we require

//but for javascript we  imprt
import {ethers} from './ethers-5.6/esm.min.js'

async function connect(){ if(window.ethereum!==undefined){
    window.ethereum.request({method: "eth_requestAccounts"});
    document.getElementById('connectButton').innerHTML = "Connected";
    console.log("META MASK IS connected Successfully");
}else{
    console.log("No metamast wallet");
    document.getElementById('connectButton').innerHTML = "Please Install Metamast";
}
}


async function fund(ethAmount){
    console.log(`funding with ${ethAmount}...`);
}
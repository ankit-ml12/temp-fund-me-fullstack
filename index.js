

async function connect(){ if(window.ethereum!==undefined){
    window.ethereum.request({method: "eth_requestAccounts"});
    document.getElementById('connectButton').innerHTML = "Connected";
    console.log("META MASK IS connected Successfully");
}else{
    console.log("No metamast wallet");
    document.getElementById('connectButton').innerHTML = "Please Install Metamast";
}
}
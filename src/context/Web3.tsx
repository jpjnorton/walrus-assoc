import { ethers } from 'ethers';

export function connect() {
    let providers = [];

    window.addEventListener("eip6963:announceProvider", (event) => {
      providers.push(event.detail);
    });
    
    // Request installed providers
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    
    
    // pick a provider to instantiate (providers[n].info)
    const provider = new ethers.BrowserProvider(providers[0].provider);
    
    const accounts = await provider.eth.requestAccounts();
    console.log('Connected with', accounts[0]);
}


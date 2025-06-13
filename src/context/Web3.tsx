import { ethers } from "ethers";

export function connect() {
  /* Without casting, led to type inference issue. 'providers' implicitly has type 'any[]' in some locations where the type can't be determined.
  */
  // let providers = [];

  // In future, we can  also define an interface for providers later. But for now, a safe patch is:
  let providers: any[] = [];

  window.addEventListener("eip6963:announceProvider", (event) => {
    providers.push(event.detail);
  });

  // Request installed providers
  window.dispatchEvent(new Event("eip6963:requestProvider"));

  // pick a provider to instantiate (providers[n].info)
  const provider = new ethers.BrowserProvider(providers[0].provider);

  const accounts = await provider.eth.requestAccounts();
  console.log("Connected with", accounts[0]);
}

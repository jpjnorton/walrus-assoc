import { ethers } from "ethers";

export async function connect() {
  /* Type inference issue. 'providers' implicitly has type "any[]"" in some locations where type can't be determined*/
  // let providers = [];

  // Workaround to avoid type inference issues with the "providers" array.
  let providers: any[] = [];

  window.addEventListener("eip6963:announceProvider", (event) => {
    providers.push((event as CustomEvent).detail);
  });

  // Trigger providers to announce themselves
  window.dispatchEvent(new Event("eip6963:requestProvider"));

  // TODO: Proper provider selection logic. For now, wait briefly.
  await new Promise((resolve) => setTimeout(resolve, 300));
  const injected = providers[0].provider;
  const accounts = await injected.request({ method: "eth_requestAccounts" });

  // Pick a provider to instantiate (providers[n].info)
  //const provider = new ethers.BrowserProvider(providers[0].provider);

  /* Low-level Web3 call: Mitch may be relying on this exact flow */
  // const accounts = await provider.eth.requestAccounts(); 

  console.log("Connected with", accounts[0]);
}

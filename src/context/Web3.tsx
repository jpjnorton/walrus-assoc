// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ethers } from "ethers";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;

  on?: <T extends keyof EthereumEventMap>(
    event: T,
    listener: (args: EthereumEventMap[T]) => void
  ) => void;

  removeListener?: <T extends keyof EthereumEventMap>(
    event: T,
    listener: (args: EthereumEventMap[T]) => void
  ) => void;

  [key: string]: unknown;
}

interface EthereumEventMap {
  accountsChanged: string[];
  chainChanged: string;
  connect: { chainId: string };
  disconnect: { code: number; message: string };
}

interface EIP6963Provider {
  provider: EthereumProvider;
  info: {
    uuid: string;
    name: string;
    icon: string;
  };
}

export async function connect() {
  /* Type inference issue. 'providers' implicitly has type "any[]"" in some locations where type can't be determined*/
  // let providers = [];
  const providers: EIP6963Provider[] = [];

  // Listen for EIP-6963 events to gather providers
  window.addEventListener("eip6963:announceProvider", (event) => {
    providers.push((event as CustomEvent).detail);
  });

  // Trigger providers to announce themselves
  window.dispatchEvent(new Event("eip6963:requestProvider"));

  // TODO: Proper provider selection logic. For now, wait briefly.
  await new Promise((resolve) => setTimeout(resolve, 300));
  const injected = providers[0].provider;
  const accounts = await injected.request({ method: "eth_requestAccounts" });

  // Type guard for accounts - ensure it's a legit ETH wallet.
  if (!Array.isArray(accounts) || typeof accounts[0] !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(accounts[0])) { throw new Error("Invalid wallet address"); }

  // Pick a provider to instantiate (providers[n].info)
  //const provider = new ethers.BrowserProvider(providers[0].provider);

  /* Low-level Web3 call: Mitch may be relying on this exact flow */
  // const accounts = await provider.eth.requestAccounts(); 

  console.log("Connected with", accounts[0]);
}

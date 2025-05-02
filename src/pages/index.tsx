import Image from "next/image";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <div
      className={`${roboto.variable} flex flex-col items-center justify-center min-h-screen text-2xl font-bold text-center text-gray-900`} // Ensures visible text
    >
      <Image
        src="/walrusassociation/images/walrus2.png"
        alt="Walrus Logo"
        width={400}
        height={400}
        className="relative z-10" // Keeps image in proper layer
      />

      <span className="text-gray-900 block relative z-20">
        {/* Forces text visibility */}
        Walrus Association
      </span>
      <span className="text-base font-normal p-8 text-gray-900">
        < strong >
        We come in peace, ready for war.
        </strong>
      </span>
      <br />
      <div className="relative text-left text-base font-normal p-8 max-w-3xl text-gray-900 z-20">
        {/* Ensures text isn't hidden behind anything */}
        
We are an association of individuals united by non-trivial pursuits of the physical and cerebral. This idea manifests in us through our art, our dedication to strength, and our hunger for knowledge. But what is this war? It is the relentless, self-imposed battle to always be prepared.
<br />
<br />
We meet challenge with courage, face failure with dignity, and win with grace. We are disciplined, self-reliant, and uphold the trust placed in us. Above all, we hold ourselves accountable — not just to each other, but to the standards we set ourselves.
<br />
<br />
Our associates are racers, painters, physicists, soldiers, mathematicians, and more. We hold ourselves to the highest standards of integrity. Associates are steadfast, honorable, generous in spirit, open-handed in camaraderie, and unwavering in resolve.
<br />
<br />
When we compete, display our art, or share our research, we do so with the confidence that we have done our utmost to be prepared for our trial.
<br />
<br />
We embrace the truth that a life worth living is one of challenge. The value of choosing the hard right over the easy wrong is at the core of all we do.
<br />
<br />

The patch is the mark of an associate. It is received once; it is earned daily.
<br />
<br />
There are two ways to earn the patch:
<br />
<br />
1. Be nominated by an associate in good standing.
<br />
2. Submit a body of evidence proving adherence to association principles.
<br />
<br />
From time to time, the Walrus Association will make exclusive gear available to associates in good standing. This gear is a mark of our pride and a symbol of the bond we share.
      </div>
    </div>
  );
}
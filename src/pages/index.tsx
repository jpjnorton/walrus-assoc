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
      className={`${roboto.variable} flex flex-col items-center justify-center min-h-screen text-2xl font-bold text-center text-gray-900`} // ✅ Ensures visible text
    >
      <Image
        src="/walrusassociation/images/walrus2.png"
        alt="Walrus Logo"
        width={400}
        height={400}
        className="relative z-10" // ✅ Keeps image in proper layer
      />

      <span className="text-gray-900 block relative z-20">
        {/* ✅ Forces text visibility */}
        Walrus Association
      </span>

      <br />
      <span className="text-base font-normal p-8 text-gray-900">
        <br />
        We come in peace, ready for war.
      </span>
      <br />
      <div className="relative text-left text-base font-normal p-8 max-w-3xl text-gray-900 z-20">
        {/* ✅ Ensures text isn't hidden behind anything */}
        We are an association of individuals united by the pursuit of the physical and cerebral...
      </div>
    </div>
  );
}

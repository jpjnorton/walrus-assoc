import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Navbar from "../components/Navbar";

const instagramUrl = "https://www.instagram.com/walrus_association/";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Walrus Association - We Come in Peace, Ready for War</title>
        <meta
          name="description"
          content="The Walrus Association is dedicated to strength, art, and knowledge. We meet challenge with courage, face failure with dignity, and win with grace."
        />
        <meta property="og:title" content="Walrus Association" />
        <meta
          property="og:description"
          content="We come in peace, ready for war."
        />
        <meta
          property="og:image"
          content="https://www.walrusassociation.com/walrus-og-image.jpg"
        />
        <meta property="og:url" content="https://www.walrusassociation.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={`${roboto.variable} font-sans text-gray-900 bg-gray-50`}>
        <Navbar />

        <section className="pt-32 pb-10 px-4 text-center">
          <Image
            src="/images/walrus2.png"
            alt="Walrus Logo"
            width={250}
            height={250}
            className="mx-auto rounded-full shadow-md"
          />

          <h1 className="text-5xl font-bold mt-6">Walrus Association</h1>
          <p className="text-lg italic mt-2 text-gray-700">
            We come in peace, ready for war.
          </p>

          <div className="mt-6">
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Visit the Store
            </Link>
          </div>

          <div className="mt-6">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black text-3xl"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <p className="text-sm text-gray-600 mt-1">Follow us on Instagram</p>
          </div>
        </section>

        <section
          id="about"
          className="max-w-4xl mx-auto px-6 py-12 text-left leading-relaxed text-gray-800"
        >
          <h2 className="text-3xl font-semibold mb-4">About</h2>

          <p>
            We are an association of individuals united by non-trivial pursuits
            of the physical and cerebral. This idea manifests in us through our
            art, our dedication to strength, and our hunger for knowledge. But
            what is this war? It is the relentless, self-imposed battle to
            always be prepared.
          </p>

          <p className="mt-4">
            We meet challenge with courage, face failure with dignity, and win
            with grace. We are disciplined, self-reliant, and uphold the trust
            placed in us. Above all, we hold ourselves accountable — not just to
            each other, but to the standards we set ourselves.
          </p>

          <p className="mt-4">
            Our associates are racers, painters, physicists, soldiers,
            mathematicians, and more. We hold ourselves to the highest standards
            of integrity. Associates are steadfast, honorable, generous in
            spirit, open-handed in camaraderie, and unwavering in resolve.
          </p>

          <p className="mt-4">
            When we compete, display our art, or share our research, we do so
            with the confidence that we have done our utmost to be prepared for
            our trial.
          </p>

          <p className="mt-4">
            We embrace the truth that a life worth living is one of challenge.
            The value of choosing the hard right over the easy wrong is at the
            core of all we do.
          </p>

          <p className="mt-4">
            The patch is the mark of an associate. It is received once; it is
            earned daily.
          </p>

          <p className="mt-4">
            <strong>There are two ways to earn the patch:</strong>
            <br />
            1. Be nominated by an associate in good standing.
            <br />
            2. Submit a body of evidence proving adherence to association
            principles.
          </p>

          <p className="mt-4">
            From time to time, the Walrus Association will make exclusive gear
            available to associates in good standing. This gear is a mark of our
            pride and a symbol of the bond we share.
          </p>
        </section>
      </main>
    </>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head"; // ✅ Import Head for SEO

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Walrus Association | Strength, Art, Knowledge</title>
        <meta
          name="description"
          content="We are an association of racers, artists, and scholars pursuing strength, art, and knowledge. The patch is earned daily. We come in peace, ready for war."
        />
        <meta
          name="keywords"
          content="Walrus Association, strength, art, knowledge, we come in peace ready for war."
        />
        <meta name="author" content="Walrus Association" />
        <meta property="og:title" content="Walrus Association" />
        <meta property="og:description" content="We are an association of athletes, artists, and scholars pursuing strength, art, and knowledge." />
        <meta property="og:image" content="https://www.walrusassociation.com/images/walrus2.png" />
        <meta property="og:url" content="https://www.walrusassociation.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Walrus Association" />
        <meta name="twitter:description" content="We meet challenge with courage, face failure with dignity, and win with grace." />
        <meta name="twitter:image" content="https://www.walrusassociation.com/images/walrus2.png" />
      </Head>

      {/* Google Tag Manager - Load in the <head> */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5TCX637C');
          `,
        }}
      />

      <Component {...pageProps} />
    </>
  );
}

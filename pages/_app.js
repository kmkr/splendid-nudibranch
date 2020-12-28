import Head from "next/head";

import "../client/polyfills";
import "../server/static/css/app.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="author" content="Kris-Mikael Krister" />
        <meta
          name="google-site-verification"
          content="GV2uFZR4en6znRvzODbQEjF4vuUK9J2kAmGw7BwAbnE"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:300,600"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon-100.png"
          sizes="100x100"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon-192.png"
          sizes="192x192"
        />
        <link rel="icon" href="/images/favicon.ico" sizes="32x32" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

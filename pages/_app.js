import Head from "next/head";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../helpers/gtag";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/Layout";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta name="author" content="" />
        <meta name="theme-color" content="#2d3748" />
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="70x70" href="mstile-70x70.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="mstile-144x144.png" />
        <link rel="icon" type="image/png" sizes="150x150" href="mstile-150x150.png" />
        <link rel="icon" type="image/png" sizes="310x150" href="mstile-310x150.png" />
        <link rel="icon" type="image/png" sizes="310x310" href="mstile-310x310.png" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <meta
          name="google-site-verification"
          content="add-your-google-site-verification-code"
        />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default appWithTranslation(MyApp);

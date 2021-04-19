import Head from "next/head";
import { Layout } from "antd";
import { SWRConfig } from "swr";
import { fetcher } from "../lib/swr";
import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Head>
          <title>Evive Test</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;

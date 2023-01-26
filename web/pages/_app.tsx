import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components/common";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Capitlize | Talk with your friends!</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

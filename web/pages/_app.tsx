import type { AppProps } from "next/app";
import Head from "next/head";
import { useContext } from "react";
import { Layout } from "../components/common";
import { Toast } from "../components/ui";
import { ToastContext, useToastContext } from "../context/ToastContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const { toastVisible, toastParams }: any = useToastContext();

  return (
    <>
      <Head>
        <title>Capitlize | Talk with your friends!</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toast visible={toastVisible} params={toastParams} />
    </>
  );
}

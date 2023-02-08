import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components/common";
import { Toast } from "../components/ui";
import { ThemeProvider, useThemeContext } from "../context/ThemeContext";
import { useToastContext } from "../context/ToastContext";
import "../styles/globals.css";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const { toastVisible, toastParams }: any = useToastContext();

  const { theme } = useThemeContext();

  let children = (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );

  if (
    ["/login"].includes(appProps.router.pathname) ||
    ["/register"].includes(appProps.router.pathname) ||
    ["/404"].includes(appProps.router.pathname) ||
    ["/500"].includes(appProps.router.pathname)
  ) {
    // Excluding the 'Layout' component for the login and register pages to prevent the rendering of the 'Aside' component
    children = <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>Skyfringe | Talk with your friends!</title>
      </Head>
      <ThemeProvider>
        <div style={{backgroundColor: theme === "light" ? "#"}}>{children}</div>
      </ThemeProvider>
      <Toast visible={toastVisible} params={toastParams} />
    </>
  );
}

import type { AppProps } from "next/app";
import Head from "next/head";
import { useContext } from "react";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/common";
import { Toast } from "../components/ui";
import { AuthProvider } from "../context/AuthContext";
import { ThemeContext, ThemeProvider } from "../context/ThemeContext";
import { ToastContext, ToastProvider } from "../context/ToastContext";
import "../styles/globals.css";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";
import AuthRoutes from "../components/common/AuthRoutes/AuthRoutes";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const { toastVisible, toastParams } = useContext(ToastContext);

  const { theme } = useContext(ThemeContext);

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
      <AuthProvider>
        <ToastProvider>
          <ThemeProvider>
            <AuthRoutes>{children}</AuthRoutes>
          </ThemeProvider>
        </ToastProvider>
      </AuthProvider>
      <Toast visible={toastVisible} params={toastParams} />
    </>
  );
}

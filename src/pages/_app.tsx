import { FC } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import Wrapper from "../store/Wrapper";
import Layout from "../components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";
import "uikit/dist/css/uikit.min.css";
import "../styles/globals.css";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Wrapper>
    <Layout>
      <Head>
        <title>GIPEDITOR</title>
        <meta
          name="description"
          content="GIPEDITOR - Pisz scenariusze do słuchowisk"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  </Wrapper>
);

export default App;

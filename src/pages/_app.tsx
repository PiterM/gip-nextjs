import { FC } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import Wrapper from "../store/Wrapper";
import "semantic-ui-css/semantic.min.css";
import "uikit/dist/css/uikit.min.css";
import "../styles/globals.sass";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Wrapper>
    <Head>
      <title>GIPEDITOR - Pisz słuchowiska</title>
      <meta
        name="description"
        content="GIPEDITOR - Pisz scenariusze do słuchowisk"
      />
    </Head>
    <Component {...pageProps} />
  </Wrapper>
);

export default App;

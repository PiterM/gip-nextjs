import { FC, useState } from "react";
import Cookies from "js-cookie";
import crypto from "crypto";
import Head from "next/head";
import type { AppProps } from "next/app";
import Wrapper from "../store/Wrapper";
import "semantic-ui-css/semantic.min.css";
import "uikit/dist/css/uikit.min.css";
import "../styles/globals.sass";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const cookieString = Cookies.get("pin") as string;
  const hash = crypto
    .createHash("sha256")
    .update(`${cookieString}` as string)
    .digest("hex");

  if (
    hash !== "346509a2c60393592c83bcee969c19dc645849728192268d4bfff17a45ece1d2"
  ) {
    return <div />;
  }

  return (
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
};

export default App;

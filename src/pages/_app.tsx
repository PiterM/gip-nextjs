import { FC } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "../store/Wrapper";
import Layout from "../components/Layout/Layout";
import "uikit/dist/css/uikit.min.css";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Wrapper>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Wrapper>
);

export default App;

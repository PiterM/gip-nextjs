import type { GetServerSideProps, NextPage } from "next";
import Cookies from "js-cookie";
import crypto from "crypto";
import styles from "../styles/home.module.sass";
import Editor from "../components/Editor/Editor";
import EditorLayout from "../components/Layout/EditorLayout";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [cookieSet, setCookieSet] = useState(false);

  useEffect(() => {
    const cookieString = Cookies.get("pin") as string;
    const hash = crypto
      .createHash("sha256")
      .update(`${cookieString}` as string)
      .digest("hex");

    if (
      hash ===
      "346509a2c60393592c83bcee969c19dc645849728192268d4bfff17a45ece1d2"
    ) {
      setCookieSet(true);
    }
  }, []);

  return cookieSet ? (
    <EditorLayout>
      <div className={styles.container}>
        <Editor />
      </div>
    </EditorLayout>
  ) : null;
};

export default Home;

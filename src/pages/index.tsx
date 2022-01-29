import type { NextPage } from "next";
import styles from "../styles/home.module.css";
import Editor from "../components/Editor/Editor";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Editor />
    </div>
  );
};

export default Home;

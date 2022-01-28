import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Button } from "semantic-ui-react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>
      <Button content="Jakiś button" />
    </div>
  );
};

export default Home;

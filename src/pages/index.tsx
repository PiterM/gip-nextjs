import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import styles from "../styles/home.module.sass";
import Editor from "../components/Editor/Editor";
import EditorLayout from "../components/Layout/EditorLayout";

const Home: NextPage = () => {
  return (
    <EditorLayout>
      <div className={styles.container}>
        <Editor />
      </div>
    </EditorLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };

export default Home;

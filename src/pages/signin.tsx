import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import styles from "../styles/signup.module.sass";
import PageLayout from "../components/Layout/PageLayout";
import LoginForm from "../components/LoginForm/LoginForm";

const Signup: NextPage = () => (
  <PageLayout>
    <div className={styles.container}>
      <LoginForm />
    </div>
  </PageLayout>
);

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req });

//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };

export default Signup;

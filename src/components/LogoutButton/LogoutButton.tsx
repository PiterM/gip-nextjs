import { FC } from "react";
import { signOut } from "next-auth/react";
import classes from "./LogoutButton.module.sass";
import { useRouter } from "next/router";

const LogoutButton: FC = () => {
  const router = useRouter();

  const logoutHandler = () => {
    signOut({ redirect: false });
    router.replace("/signin");
  };

  return (
    <div className={classes["logout-button"]}>
      <button
        className={`uk-button uk-button-small uk-button-danger`}
        onClick={logoutHandler}
      >
        Log out
      </button>
    </div>
  );
};

export default LogoutButton;

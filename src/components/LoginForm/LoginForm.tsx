import { FC, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./LoginForm.module.sass";
import { signUserIn } from "../../http-client/AuthHttpClient";

const LoginForm: FC = () => {
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const [unathorizedError, setUnauthorizedError] = useState<boolean>(false);

  const router = useRouter();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    const result = await signUserIn(email, password);
    if (result && (result as any).ok) {
      router.replace("/");
    } else {
      setUnauthorizedError(true);
    }
  };

  return (
    <section className={classes["login-form"]}>
      <h3
        className={`uk-heading-tiny ${
          unathorizedError ? classes["error-header"] : ""
        } ${classes.header}`}
      >
        Sign in
      </h3>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email:</label>
          <input
            className="uk-input"
            type="email"
            ref={emailInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password:</label>
          <input
            className="uk-input"
            type="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <button className="uk-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;

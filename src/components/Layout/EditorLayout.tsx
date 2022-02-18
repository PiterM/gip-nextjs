import { FC } from "react";
import classes from "./EditorLayout.module.sass";
import ScenariosMenu from "../ScenariosMenu/ScenariosMenu";
import EditorButtons from "../EditorButtons/EditorButtons";
import SavedScenariosList from "../SavedScenariosList/SavedScenariosList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import LogoutButton from "../LogoutButton/LogoutButton";

const EditorLayout: FC = ({ children }) => (
  <>
    <aside className={`${classes.sidebar} ${classes["sidebar-left"]}`}>
      <section className={classes.section}>
        <SavedScenariosList />
      </section>
    </aside>
    <main className={classes.content}>{children}</main>
    <aside className={`${classes.sidebar} ${classes["sidebar-right"]}`}>
      <section className={classes.section}>
        <LogoutButton />
        <ScenariosMenu />
      </section>
      <section className={classes.section}>
        <EditorButtons />
      </section>
    </aside>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);

export default EditorLayout;

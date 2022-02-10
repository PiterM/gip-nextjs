import { FC } from "react";
import classes from "./Layout.module.sass";
import ScenariosMenu from "../ScenariosMenu/ScenariosMenu";
import EditorButtons from "../EditorButtons/EditorButtons";
import SavedScenariosList from "../SavedScenariosList/SavedScenariosList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Layout: FC = ({ children }) => (
  <>
    <div className={classes.page}>
      <aside className={`${classes.sidebar} ${classes["sidebar-left"]}`}>
        <section>
          <SavedScenariosList />
        </section>
      </aside>
      <main className={classes.content}>{children}</main>
      <aside className={`${classes.sidebar} ${classes["sidebar-right"]}`}>
        <section>
          <ScenariosMenu />
        </section>
        <section>
          <EditorButtons />
        </section>
      </aside>
    </div>
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

export default Layout;

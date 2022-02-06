import { FC } from "react";
import classes from "./Layout.module.sass";
import ScenariosMenu from "../ScenariosMenu/ScenariosMenu";
import EditorButtons from "../EditorButtons/EditorButtons";
import SavedScenariosList from "../SavedScenariosList/SavedScenariosList";

const Layout: FC = ({ children }) => (
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
);

export default Layout;

import { FC } from "react";
import classes from "./Layout.module.sass";
import ScenariosMenu from "../ScenariosMenu/ScenariosMenu";

const Layout: FC = ({ children }) => (
  <div className={classes.page}>
    <aside className={classes.spacing}></aside>
    <main className={classes.content}>{children}</main>
    <aside className={classes.sidebar}>
      <section>
        <ScenariosMenu />
      </section>
    </aside>
  </div>
);

export default Layout;

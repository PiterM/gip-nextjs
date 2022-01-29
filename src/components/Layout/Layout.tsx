import { FC } from "react";
import classes from "./Layout.module.sass";
import ScenariosMenu from "../ScenariosMenu/ScenariosMenu";

const Layout: FC = ({ children }) => (
    <div className={classes.page}>
        <aside className={classes.sidebar}>
            <section>
                <ScenariosMenu />
            </section>
        </aside>
        <main className={classes.content}>
            {children}
        </main>
    </div>
);

export default Layout;
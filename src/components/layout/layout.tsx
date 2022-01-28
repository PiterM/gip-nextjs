import { FC } from "react";
import classes from "./layout.module.sass";

const Layout: FC = ({ children }) => (
    <div className={classes.page}>
        <aside className={classes.sidebar}>
            <section>
                Sidebar
            </section>
        </aside>
        <main className={classes.content}>
            {children}
        </main>
    </div>
);

export default Layout;
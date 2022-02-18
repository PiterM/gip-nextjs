import { FC } from "react";
import classes from "./PageLayout.module.sass";

const Layout: FC = ({ children }) => (
  <div className={classes.page}>{children}</div>
);

export default Layout;

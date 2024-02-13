import { FC, useState } from "react";
import classes from "./EditorLayout.module.sass";
import ScenariosMenu from "../ScenariosMenu/ScenariosMenu";
import EditorButtons from "../EditorButtons/EditorButtons";
import SavedScenariosList from "../SavedScenariosList/SavedScenariosList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import LogoutButton from "../LogoutButton/LogoutButton";

const EditorLayout: FC = ({ children }) => {
  const [leftSidebarHover, setLeftSidebarHover] = useState<Boolean>(false);
  const [rightSidebarHover, setRightSidebarHover] = useState<Boolean>(false);

  const leftSidebarHovered = () => setLeftSidebarHover(true);
  const rightSidebarHovered = () => setRightSidebarHover(true);
  const leftSidebarUnHovered = () => setLeftSidebarHover(false);
  const rightSidebarUnHovered = () => setRightSidebarHover(false);
  const editorHovered = () => {
    setLeftSidebarHover(false);
    setRightSidebarHover(false);
  };

  return (
    <>
      <aside
        className={`${classes.sidebar} ${
          leftSidebarHover
            ? classes["sidebar-left-hovered"]
            : classes["sidebar-left"]
        }`}
        onMouseOver={leftSidebarHovered}
        onMouseLeave={leftSidebarUnHovered}
      >
        <section className={classes.section}>
          <SavedScenariosList />
        </section>
      </aside>
      <main className={classes.content} onMouseOver={editorHovered}>
        {children}
      </main>
      <aside
        className={`${classes.sidebar} ${
          rightSidebarHover
            ? classes["sidebar-right-hovered"]
            : classes["sidebar-right"]
        }`}
        onMouseOver={rightSidebarHovered}
        onMouseLeave={rightSidebarUnHovered}
      >
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
};

export default EditorLayout;

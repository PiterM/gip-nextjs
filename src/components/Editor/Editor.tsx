import { FC, FormEvent } from "react";
import { getCurrentScenario } from "./Scenario.selectors";
import { useDispatch, useSelector } from "react-redux";
import { setDialogTitle, setDialogIntro } from "./Scenario.actions";
import classes from "./Editor.module.sass";
import { DialogLineType } from "./Scenario.state";
import DialogLine from "../DialogLine/DialogLine";

const Editor: FC = () => {
  const currentScenario = useSelector(getCurrentScenario);
  const dispatch = useDispatch();

  if (!currentScenario || !currentScenario.type) {
    return (
      <div className={classes.logo}>
        <img src="images/gip-logo.png" alt="GIP Editor" />
      </div>
    );
  }

  const renderTitleAndIntro = () => {
    const { title, intro } = currentScenario;
    return (
      <>
        <div className={classes["dialog-title"]}>
          <input
            className="uk-input"
            value={title}
            onInput={setTitleHandler}
            placeholder="tytuł..."
          />
        </div>
        <div className={classes["dialog-intro"]}>
          <textarea
            className="uk-textarea"
            rows={2}
            onInput={setIntroHandler}
            value={intro}
            placeholder="intro..."
          />
        </div>
      </>
    );
  };

  const renderDialog = () => {
    const { dialogArray, focusKey } = currentScenario;
    return dialogArray.map((line: DialogLineType) => (
      <div key={line.key}>
        <DialogLine
          actor={line.actor}
          lineKey={line.key}
          focus={focusKey === line.key}
          text={line.text}
          firstLineInDialog={currentScenario.firstLineKey === line.key}
        />
      </div>
    ));
  };

  const setTitleHandler = (event: FormEvent<HTMLInputElement>) =>
    dispatch(setDialogTitle((event.target as any).value));
  const setIntroHandler = (event: FormEvent<HTMLTextAreaElement>) =>
    dispatch(setDialogIntro((event.target as any).value));

  return (
    <section className={classes.scenario}>
      {renderTitleAndIntro()}
      <div className={classes.dialog}>{renderDialog()}</div>
    </section>
  );
};

export default Editor;

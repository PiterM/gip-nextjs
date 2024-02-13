import { FC, FormEvent, useRef, useEffect, useCallback } from "react";
import { getCurrentScenario } from "./Scenario.selectors";
import { saveCurrentScenario } from "../../http-client/HttpClient";
import { useDispatch, useSelector } from "react-redux";
import { setDialogTitle, setDialogIntro } from "./Scenario.actions";
import classes from "./Editor.module.sass";
import { DialogLineType } from "./Scenario.state";
import DialogLine from "../DialogLine/DialogLine";
import Image from "next/image";
import {
  defaultTextareaRows,
  oneTextareaRowInPx,
} from "../../constants/constants";
// import { setScenarioId, setDirty } from "../Editor/Scenario.actions";

const Editor: FC = () => {
  const currentScenario = useSelector(getCurrentScenario);
  // const currentDialogLength =
  //   currentScenario && Object.keys(currentScenario.dialog).length;

  const dispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // const saveScenario = useCallback(async () => {
  //   const scenarioId =
  //     currentScenario && (await saveCurrentScenario(currentScenario, false));
  //   scenarioId && dispatch(setScenarioId(scenarioId));
  //   dispatch(setDirty(false));
  // }, [currentScenario, dispatch]);

  useEffect(() => {
    if (
      textAreaRef.current &&
      textAreaRef.current.scrollHeight >
        defaultTextareaRows * oneTextareaRowInPx
    ) {
      textAreaRef.current.rows = Math.ceil(
        textAreaRef.current.scrollHeight / oneTextareaRowInPx
      );
    }
  }, [currentScenario]);

  // useEffect(() => {
  //   currentDialogLength && currentDialogLength > 1 && saveScenario();
  // }, [currentDialogLength, saveScenario]);

  if (!currentScenario || !currentScenario.type) {
    return (
      <div className={classes.logo}>
        <Image
          width="400"
          height="200"
          src="/images/gip-logo.png"
          alt="GIP Editor"
        />
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
            ref={textAreaRef}
            className="uk-textarea"
            rows={defaultTextareaRows}
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

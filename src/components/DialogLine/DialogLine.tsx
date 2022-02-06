import { FC, KeyboardEvent, FormEvent, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ActorType } from "../Editor/Scenario.state";
import classes from "./DialogLine.module.sass";
import KEYS from "./DialogLine.constants";
import {
  addLineAfterCurrentLine,
  removeCurrentLine,
  setDialogLineText,
  setFocusOnNextLine,
  setFocusOnPreviousLine,
  switchToNextActor,
  switchToPreviousActor,
  switchToDescriptionLine,
} from "../Editor/Scenario.actions";
true;
export interface DialogLineProps {
  actor: ActorType;
  lineKey: number;
  focus: boolean;
  text: string;
  firstLineInDialog: boolean;
}

const DialogLine: FC<DialogLineProps> = ({
  actor,
  lineKey,
  focus,
  text,
  firstLineInDialog,
}: DialogLineProps) => {
  const dispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    focus && textAreaRef?.current?.focus();
  }, [focus]);

  const onKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === KEYS.KeyEnter && event.ctrlKey) {
      event.preventDefault();
      dispatch(addLineAfterCurrentLine(lineKey));
    }
    if (event.code === KEYS.KeyDelete && event.ctrlKey) {
      event.preventDefault();
      dispatch(removeCurrentLine(lineKey));
    }
    if (event.code === KEYS.KeyArrowUp && event.ctrlKey) {
      event.preventDefault();
      dispatch(switchToNextActor({ key: lineKey, actorPrio: actor.priority }));
    }
    if (event.code === KEYS.KeyArrowDown && event.ctrlKey) {
      event.preventDefault();
      dispatch(
        switchToPreviousActor({ key: lineKey, actorPrio: actor.priority })
      );
    }
    if (event.code === KEYS.KeyTab && event.shiftKey && !firstLineInDialog) {
      event.preventDefault();
      dispatch(setFocusOnPreviousLine(lineKey));
    }
    if (event.code === KEYS.KeyTab && !event.shiftKey) {
      event.preventDefault();
      dispatch(setFocusOnNextLine(lineKey));
    }
  };

  const onInputHandler = (event: FormEvent<HTMLTextAreaElement>) =>
    dispatch(
      setDialogLineText({ key: lineKey, text: (event.target as any).value })
    );

  const lineName = actor?.name ? `${actor.name}:` : "";

  return (
    <>
      <p className={classes["line-name"]}>{lineName}</p>
      <textarea
        ref={textAreaRef}
        className={`uk-textarea line ${classes.line}`}
        rows={2}
        onKeyDown={onKeyDownHandler}
        onInput={onInputHandler}
        value={text}
      />
    </>
  );
};

export default DialogLine;

import { FC, KeyboardEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ActorType } from "../Editor/Scenario.state";
import classes from "./DialogLine.module.sass";
import * as Keys from "./DialogLine.constants";
import { addLineAfterCurrentLine } from "../Editor/Scenario.actions";

export interface DialogLineProps {
  actor: ActorType;
  lineKey: number;
  focus: boolean;
  text: string;
}

const DialogLine: FC<DialogLineProps> = ({ actor, lineKey, focus, text }: DialogLineProps) => {
  const dispatch = useDispatch();

  const onKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === Keys.KeyEnter && event.ctrlKey) {
      event.preventDefault();
      dispatch(addLineAfterCurrentLine(lineKey));
    }
    if (event.code === Keys.KeyDelete && event.ctrlKey) {
      event.preventDefault();
    //   store.removeCurrentLine(key);
    }
    if (event.code === Keys.KeyArrowUp && event.ctrlKey) {
      event.preventDefault();
    //   actor = findNextActor(scenarioType, actor.priority);
    //   store.switchActor(key, actor);
    }
    if (event.code === Keys.KeyArrowDown&& event.ctrlKey) {
      event.preventDefault();
    //   actor = findPreviousActor(scenarioType, actor.priority);
    //   store.switchActor(key, actor);
    }
    if (event.code === Keys.KeyTab && event.shiftKey && lineKey !== 0) {
      event.preventDefault();
    //   store.setFocusOnPreviousLine(key);
    }
    if (event.code === Keys.KeyTab && !event.shiftKey) {
      event.preventDefault();
    //   store.setFocusOnNextLine(key);
    }
  };

  const onInputHandler = (event: FormEvent<HTMLTextAreaElement>) => {};

  return (
    <>
      <p className={classes["actor-name"]}>{actor.name}:</p>
      <textarea
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

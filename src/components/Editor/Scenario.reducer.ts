import ACTION_TYPES from "./Scenario.action-types";
import { ScenarioActions } from "./Scenario.actions";
import { DialogLineType, ScenarioType } from "./Scenario.state";
import scenariosJson from "../../config/scenarios.json";
import {
  findActorPartner,
  calculateDialogArray,
  findNextActor,
  findPreviousActor,
} from "../../utils/helpers";

const initialScenarioState = {
  id: "",
  createDate: new Date(),
  type: "",
  title: "",
  intro: "",
  focusKey: -1,
  firstLineKey: 0,
  nextFreeKey: 0,
  dialog: {},
  dialogArray: [],
  dirty: false,
};

export const scenarioReducer = (
  state: ScenarioType = initialScenarioState,
  action: ScenarioActions
) => {
  switch (action.type) {
    case ACTION_TYPES.CLOSE_EDITOR:
      return initialScenarioState;
    case ACTION_TYPES.OPEN_SCENARIO:
      return {
        ...action.payload,
        _id: undefined,
      };
    case ACTION_TYPES.NEW_SCENARIO:
      const scenarioType = action.payload;
      for (const scenario of scenariosJson.scenariosTypes) {
        if (scenario.type === scenarioType) {
          const firstActor = scenario.actors.find((a) => a.priority === 1);
          const firstLine = {
            key: 0,
            actor: firstActor,
            text: "",
            next: null,
            previous: null,
          };

          return {
            id: null,
            createDate: new Date(),
            type: scenario.type,
            title: scenario.name,
            intro: "",
            focusKey: -1,
            firstLineKey: 0,
            nextFreeKey: 1,
            dialog: {
              0: firstLine,
            },
            dialogArray: [firstLine],
            dirty: true,
          };
        }
      }
    case ACTION_TYPES.ADD_LINE_AFTER_CURRENT_LINE:
      const { id, createDate, title, intro, type, nextFreeKey } = state;
      let dialog = state.dialog;
      const currentKey = Number(action.payload);
      const currentLine = dialog[currentKey];
      let firstLineKey = state.firstLineKey;
      let nextActor = findActorPartner(type, currentLine.actor.partner);

      let newDialog = dialog;
      let nextLine;
      let nextKey = currentLine.next;
      if (nextKey !== null) {
        nextLine = newDialog[nextKey];
        nextLine.previous = nextFreeKey;
        delete newDialog[nextKey];
      }
      delete newDialog[currentKey];
      currentLine.next = nextFreeKey;

      newDialog = {
        ...dialog,
        [currentKey]: currentLine,
        [nextFreeKey]: {
          key: nextFreeKey,
          actor: nextActor,
          text: "",
          previous: currentKey,
          next: nextKey,
        },
      };

      const newScenario = {
        id,
        createDate,
        title,
        intro,
        type,
        firstLineKey,
        focusKey: nextFreeKey,
        nextFreeKey: nextFreeKey + 1,
        dialog: newDialog,
        dialogArray: [],
        dirty: true,
      };

      if (nextKey !== null && nextLine) {
        newScenario.dialog[nextKey] = nextLine;
      }

      (newScenario.dialogArray as DialogLineType[]) = calculateDialogArray(
        newDialog,
        firstLineKey
      );

      return newScenario;
    case ACTION_TYPES.REMOVE_CURRENT_LINE:
      if (Object.keys(state.dialog).length <= 1) {
        return state;
      }

      const removedKey = Number(action.payload);
      const removedLine = state.dialog[removedKey];
      const previousLine =
        removedLine?.previous !== null
          ? state.dialog[removedLine.previous]
          : null;
      nextLine =
        removedLine?.next !== null ? state.dialog[removedLine.next] : null;
      const previousLineKey = previousLine?.key;
      const nextLineKey = nextLine?.key;
      firstLineKey = state.firstLineKey;

      if (previousLine) {
        previousLine.next = nextLine ? nextLine.key : null;
      }
      if (nextLine) {
        nextLine.previous = previousLine ? previousLine.key : null;
      }

      newDialog = state.dialog;
      delete newDialog[removedKey];
      nextLine?.key && delete newDialog[nextLine?.key];
      previousLine?.key && delete newDialog[previousLine?.key];

      dialog = {
        ...newDialog,
      };

      if (previousLineKey && previousLineKey >= 0) {
        dialog[previousLineKey] = previousLine;
      }
      if (nextLineKey && nextLineKey >= 0 && nextLine) {
        dialog[nextLineKey] = nextLine;
      }

      const newFirstLineKey =
        removedKey === firstLineKey ? nextLine?.key : firstLineKey;

      let dialogArray = calculateDialogArray(
        dialog,
        newFirstLineKey === undefined ? null : newFirstLineKey
      );

      return {
        ...state,
        firstLineKey: newFirstLineKey,
        focusKey: nextLine ? nextLine.key : previousLine?.key,
        removedKey,
        dialog,
        dialogArray,
        dirty: true,
      };
    case ACTION_TYPES.SET_DIALOG_TITLE:
      const dialogTitle = action.payload;
      return {
        ...state,
        title: dialogTitle,
        dirty: true,
      };
    case ACTION_TYPES.SET_DIALOG_INTRO:
      const dialogIntro = action.payload;
      return {
        ...state,
        intro: dialogIntro,
        dirty: true,
      };
    case ACTION_TYPES.SWITCH_TO_NEXT_ACTOR:
    case ACTION_TYPES.SWITCH_TO_PREVIOUS_ACTOR:
      const { key, actorPrio } = action.payload;
      let switchLine = state.dialog[key];

      if (action.type === ACTION_TYPES.SWITCH_TO_NEXT_ACTOR) {
        switchLine.actor = findNextActor(state.type, actorPrio)!;
      } else {
        switchLine.actor = findPreviousActor(state.type, actorPrio)!;
      }

      newDialog = { ...state.dialog };
      delete newDialog[key];
      newDialog[key] = switchLine;
      dialogArray = calculateDialogArray(newDialog, state.firstLineKey);

      return {
        ...state,
        focusKey: key,
        dialog: {
          ...newDialog,
        },
        dialogArray,
        dirty: true,
      };

    case ACTION_TYPES.SET_FOCUS_ON_NEXT_LINE:
      let lineKey = Number(action.payload);
      nextKey = state.dialog[lineKey].next;
      return {
        ...state,
        focusKey: nextKey !== null ? nextKey : state.focusKey,
      };
    case ACTION_TYPES.SET_FOCUS_ON_PREVIOUS_LINE:
      lineKey = Number(action.payload);
      const previousKey = state.dialog[lineKey].previous;
      return {
        ...state,
        focusKey: previousKey !== null ? previousKey : -1,
      };
    case ACTION_TYPES.SET_DIALOG_LINE_TEXT:
      lineKey = Number(action.payload.key);
      const newText = String(action.payload.text);
      const line = state.dialog[lineKey];
      line.text = newText;
      newDialog = { ...state.dialog };
      delete newDialog[lineKey];
      newDialog[lineKey] = line;
      dialogArray = calculateDialogArray(newDialog, state.firstLineKey);

      return {
        ...state,
        dialog: {
          ...newDialog,
          [lineKey]: line,
        },
        dialogArray,
        dirty: true,
      };
    case ACTION_TYPES.SET_SCENARIO_ID:
      return {
        ...state,
        id: String(action.payload),
      };
    case ACTION_TYPES.SET_DIRTY:
      return {
        ...state,
        dirty: Boolean(action.payload),
      };
    default:
      return state;
  }
};

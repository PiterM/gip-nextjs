import ACTION_TYPES from "./Scenario.action-types";
import { ScenarioActions } from "./Scenario.actions";
import { DialogLineType, ScenarioType } from "./Scenario.state";
import scenariosJson from "../../config/scenarios.json";
import { findActorPartner, calculateDialogArray } from "../../utils/helpers";

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
      const {
        id,
        createDate,
        title,
        intro,
        type,
        firstLineKey,
        nextFreeKey,
        dialog,
      } = state;
      const currentKey = Number(action.payload);
      const currentLine = dialog[currentKey];
      let nextActor = findActorPartner(type, currentLine.actor.partner);

      let newDialog = dialog;
      let nextLine;
      const nextKey = currentLine.next;
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
    case ACTION_TYPES.SET_DIALOG_TITLE:
      const dialogTitle = action.payload;
      return {
        ...state,
        title: dialogTitle.trim(),
        dirty: true,
      };
    case ACTION_TYPES.SET_DIALOG_INTRO:
      const dialogIntro = action.payload;
      return {
        ...state,
        intro: dialogIntro.trim(),
        dirty: true,
      };
    default:
      return state;
  }
};

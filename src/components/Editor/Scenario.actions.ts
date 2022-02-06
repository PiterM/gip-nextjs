import ACTION_TYPES from "./Scenario.action-types";
import {
  SetDialogLineTextPayload,
  SwitchToActorPayload,
} from "./Scenario.models";
import { ScenarioType } from "./Scenario.state";

export interface CloseEditor {
  type: ACTION_TYPES.CLOSE_EDITOR;
}

export const closeEditor = (): CloseEditor => ({
  type: ACTION_TYPES.CLOSE_EDITOR,
});

export interface OpenScenario {
  type: ACTION_TYPES.OPEN_SCENARIO;
  payload: ScenarioType;
}

export const openScenario = (payload: ScenarioType): OpenScenario => ({
  type: ACTION_TYPES.OPEN_SCENARIO,
  payload,
});

export interface NewScenario {
  type: ACTION_TYPES.NEW_SCENARIO;
  payload: string;
}

export const newScenario = (payload: string): NewScenario => ({
  type: ACTION_TYPES.NEW_SCENARIO,
  payload,
});

export interface AddLineAfterCurrentLine {
  type: ACTION_TYPES.ADD_LINE_AFTER_CURRENT_LINE;
  payload: number;
}

export const addLineAfterCurrentLine = (
  payload: number
): AddLineAfterCurrentLine => ({
  type: ACTION_TYPES.ADD_LINE_AFTER_CURRENT_LINE,
  payload,
});

export interface RemoveCurrentLine {
  type: ACTION_TYPES.REMOVE_CURRENT_LINE;
  payload: number;
}

export const removeCurrentLine = (payload: number): RemoveCurrentLine => ({
  type: ACTION_TYPES.REMOVE_CURRENT_LINE,
  payload,
});

export interface SetDialogTitle {
  type: ACTION_TYPES.SET_DIALOG_TITLE;
  payload: string;
}

export const setDialogTitle = (payload: string): SetDialogTitle => ({
  type: ACTION_TYPES.SET_DIALOG_TITLE,
  payload,
});

export interface SetDialogIntro {
  type: ACTION_TYPES.SET_DIALOG_INTRO;
  payload: string;
}

export const setDialogIntro = (payload: string): SetDialogIntro => ({
  type: ACTION_TYPES.SET_DIALOG_INTRO,
  payload,
});

export interface SwitchToNextActor {
  type: ACTION_TYPES.SWITCH_TO_NEXT_ACTOR;
  payload: SwitchToActorPayload;
}

export const switchToNextActor = (
  payload: SwitchToActorPayload
): SwitchToNextActor => ({
  type: ACTION_TYPES.SWITCH_TO_NEXT_ACTOR,
  payload,
});

export interface SwitchToPreviousActor {
  type: ACTION_TYPES.SWITCH_TO_PREVIOUS_ACTOR;
  payload: SwitchToActorPayload;
}

export const switchToPreviousActor = (
  payload: SwitchToActorPayload
): SwitchToPreviousActor => ({
  type: ACTION_TYPES.SWITCH_TO_PREVIOUS_ACTOR,
  payload,
});

export interface SwitchToDescriptionLine {
  type: ACTION_TYPES.SWITCH_TO_DESCRIPTION_LINE;
  payload: number;
}

export const switchToDescriptionLine = (
  payload: number
): SwitchToDescriptionLine => ({
  type: ACTION_TYPES.SWITCH_TO_DESCRIPTION_LINE,
  payload,
});

export interface SetFocusOnNextLine {
  type: ACTION_TYPES.SET_FOCUS_ON_NEXT_LINE;
  payload: number;
}

export const setFocusOnNextLine = (payload: number): SetFocusOnNextLine => ({
  type: ACTION_TYPES.SET_FOCUS_ON_NEXT_LINE,
  payload,
});

export interface SetFocusOnPreviousLine {
  type: ACTION_TYPES.SET_FOCUS_ON_PREVIOUS_LINE;
  payload: number;
}

export const setFocusOnPreviousLine = (
  payload: number
): SetFocusOnPreviousLine => ({
  type: ACTION_TYPES.SET_FOCUS_ON_PREVIOUS_LINE,
  payload,
});

export interface SetDialogLineText {
  type: ACTION_TYPES.SET_DIALOG_LINE_TEXT;
  payload: SetDialogLineTextPayload;
}

export const setDialogLineText = (
  payload: SetDialogLineTextPayload
): SetDialogLineText => ({
  type: ACTION_TYPES.SET_DIALOG_LINE_TEXT,
  payload,
});

export interface SetScenarioId {
  type: ACTION_TYPES.SET_SCENARIO_ID;
  payload: string;
}

export const setScenarioId = (payload: string): SetScenarioId => ({
  type: ACTION_TYPES.SET_SCENARIO_ID,
  payload,
});

export interface SetDirty {
  type: ACTION_TYPES.SET_DIRTY;
  payload: boolean;
}

export const setDirty = (payload: boolean): SetDirty => ({
  type: ACTION_TYPES.SET_DIRTY,
  payload,
});

export type ScenarioActions =
  | CloseEditor
  | OpenScenario
  | NewScenario
  | AddLineAfterCurrentLine
  | RemoveCurrentLine
  | SetDialogTitle
  | SetDialogIntro
  | SwitchToNextActor
  | SwitchToPreviousActor
  | SetFocusOnNextLine
  | SetFocusOnPreviousLine
  | SetDialogLineText
  | SwitchToDescriptionLine
  | SetScenarioId
  | SetDirty;

import ACTION_TYPES from './Scenario.action-types';

export interface NewScenario {
    type: ACTION_TYPES.NEW_SCENARIO;
    payload: string;
}

export const newScenario = (payload: string): NewScenario => ({
    type: ACTION_TYPES.NEW_SCENARIO,
    payload
});

export interface AddLineAfterCurrentLine {
    type: ACTION_TYPES.ADD_LINE_AFTER_CURRENT_LINE;
    payload: number;
}

export const addLineAfterCurrentLine = (payload: number): AddLineAfterCurrentLine => ({
    type: ACTION_TYPES.ADD_LINE_AFTER_CURRENT_LINE,
    payload
});

export interface SetDialogTitle {
    type: ACTION_TYPES.SET_DIALOG_TITLE;
    payload: string;
}

export const setDialogTitle = (payload: string): SetDialogTitle => ({
    type: ACTION_TYPES.SET_DIALOG_TITLE,
    payload
});

export interface SetDialogIntro {
    type: ACTION_TYPES.SET_DIALOG_INTRO;
    payload: string;
}

export const setDialogIntro = (payload: string): SetDialogIntro => ({
    type: ACTION_TYPES.SET_DIALOG_INTRO,
    payload
});

export type ScenarioActions = 
    | NewScenario
    | AddLineAfterCurrentLine
    | SetDialogTitle
    | SetDialogIntro;
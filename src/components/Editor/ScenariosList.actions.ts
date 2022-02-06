import { ScenarioType } from "./Scenario.state";
import ACTION_TYPES from "./ScenariosList.action-types";

export interface SetScenariosList {
  type: ACTION_TYPES.SET_SCENARIOS_LIST;
  payload: ScenarioType[];
}

export const setScenariosList = (
  payload: ScenarioType[]
): SetScenariosList => ({
  type: ACTION_TYPES.SET_SCENARIOS_LIST,
  payload,
});

export interface LoadScenario {
  type: ACTION_TYPES.LOAD_SCENARIO;
  payload: string;
}

export const loadScenario = (payload: string): LoadScenario => ({
  type: ACTION_TYPES.LOAD_SCENARIO,
  payload,
});

export type ScenariosListActions = SetScenariosList | LoadScenario;

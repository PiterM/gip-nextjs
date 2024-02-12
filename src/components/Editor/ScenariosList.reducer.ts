import ACTION_TYPES from "./ScenariosList.action-types";
import { ScenariosListActions } from "./ScenariosList.actions";
import { ScenarioType } from "./Scenario.state";

const initialScenariosListState: ScenarioType[] = [];

export const scenariosListReducer = (
  state: ScenarioType[] = initialScenariosListState,
  action: ScenariosListActions
) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SCENARIOS_LIST:
      const scenarios = action.payload ?? [];
      return [...scenarios];
    default:
      return state;
  }
};

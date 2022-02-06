import { put, ForkEffect, takeLatest, select } from "redux-saga/effects";
import { getScenariosList } from "./Scenario.selectors";
import { ScenarioType } from "./Scenario.state";
import ACTION_TYPES from "./ScenariosList.action-types";
import { LoadScenario } from "./ScenariosList.actions";
import { openScenario } from "./Scenario.actions";

export function* loadScenario(action: LoadScenario): any {
  const scenarios = yield select(getScenariosList);
  const loadedScenario = scenarios.find(
    (scenario: ScenarioType) => scenario.id === action.payload
  );
  if (loadedScenario) {
    yield put(openScenario(loadedScenario));
  }
}

export function* watchScenariosListActions(): IterableIterator<ForkEffect> {
  yield takeLatest(ACTION_TYPES.LOAD_SCENARIO, loadScenario);
}

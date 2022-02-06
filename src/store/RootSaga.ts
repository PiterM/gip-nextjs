import {
  all,
  CallEffect,
  fork,
  ForkEffect,
  TakeEffect,
} from "redux-saga/effects";
import { watchScenariosListActions } from "../components/Editor/ScenariosList.saga";

const sagas: Array<
  () => IterableIterator<ForkEffect | CallEffect | TakeEffect>
> = [watchScenariosListActions];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;

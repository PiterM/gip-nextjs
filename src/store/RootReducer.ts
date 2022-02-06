import { combineReducers } from "redux";
import { scenarioReducer } from "../components/Editor/Scenario.reducer";
import { scenariosListReducer } from "../components/Editor/ScenariosList.reducer";

const rootReducer = combineReducers({
  currentScenario: scenarioReducer,
  scenariosList: scenariosListReducer,
});

export default rootReducer;

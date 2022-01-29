import { combineReducers } from 'redux';
import { scenarioReducer } from '../components/Editor/Scenario.reducer';

const rootReducer = combineReducers(
    {
        currentScenario: scenarioReducer,
    }
);

export default rootReducer;

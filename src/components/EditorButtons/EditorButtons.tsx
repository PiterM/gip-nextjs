import { FC } from "react";
import {
  saveCurrentScenario,
  getAllScenarios,
} from "../../http-client/HttpClient";
import { useSelector } from "react-redux";
import { getCurrentScenario } from "../Editor/Scenario.selectors";
import { useDispatch } from "react-redux";
import { setScenarioId, setDirty } from "../Editor/Scenario.actions";

const EditorButtons: FC = () => {
  const currentScenario = useSelector(getCurrentScenario);
  const dispatch = useDispatch();

  const saveScenarioHandler = async () => {
    const scenarioId =
      currentScenario && (await saveCurrentScenario(currentScenario));
    scenarioId && dispatch(setScenarioId(scenarioId));
    dispatch(setDirty(false));
  };

  return (
    <button
      className="uk-button uk-button-primary"
      onClick={saveScenarioHandler}
      disabled={!currentScenario?.dirty}
    >
      Zapisz
    </button>
  );
};

export default EditorButtons;

import { FC } from "react";
import scenariosJson from "../../config/scenarios.json";
import { useDispatch, useSelector } from "react-redux";
import { newScenario } from "../Editor/Scenario.actions";
import classes from "./ScenariosMenu.module.sass";
import { getDirty } from "../Editor/Scenario.selectors";

const ScenariosMenu: FC = () => {
  const dispatch = useDispatch();
  const { scenariosTypes } = scenariosJson;
  const dirty = useSelector(getDirty);

  const renderScenariosTypes = () => {
    return scenariosTypes.map((scenario: any) => (
      <li key={scenario.type}>
        <p>{scenario.name}</p>
        <div>
          <button
            className="uk-button uk-button-secondary"
            onClick={() => newScenarioHandler(scenario.type)}
            disabled={dirty}
          >
            Nowy scenariusz
          </button>
        </div>
      </li>
    ));
  };

  const newScenarioHandler = (scenarioType: string) => {
    dispatch(newScenario(scenarioType));
  };

  return (
    <ul className={classes["scenarios-list"]}>{renderScenariosTypes()}</ul>
  );
};

export default ScenariosMenu;

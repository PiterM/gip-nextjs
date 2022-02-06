import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllScenarios, deleteScenario } from "../../http-client/HttpClient";
import { closeEditor } from "../Editor/Scenario.actions";
import {
  getCurrentScenario,
  getScenariosList,
} from "../Editor/Scenario.selectors";
import { ScenarioType } from "../Editor/Scenario.state";
import {
  setScenariosList,
  loadScenario,
} from "../Editor/ScenariosList.actions";
import classes from "./SavedScenariosList.module.sass";
import ModalScenarioDelete from "../ModalScenarioDelete/ModalScenarioDelete";
import "uikit/dist/js/uikit.min";

const SavedScenariosList: FC = () => {
  const dispatch = useDispatch();
  const scenariosList = useSelector(getScenariosList);
  const currentScenario = useSelector(getCurrentScenario);
  const dirty = !!currentScenario?.dirty;

  const [scenarioDeleted, setScenarioDeleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletedScenario, setDeletedScenario] = useState<
    ScenarioType | undefined
  >(undefined);

  useEffect(() => {
    if (!dirty || scenarioDeleted) {
      getAllScenarios("gip").then((data) => dispatch(setScenariosList(data)));
      setScenarioDeleted(false);
    }
  }, [dirty, scenarioDeleted]);

  useEffect(() => {
    setModalOpen(true);
  }, [deletedScenario?.id]);

  const openScenarioHandler = (scenarioId: string) => {
    const isCurrentScenario = currentScenario?.id === scenarioId;
    !isCurrentScenario && dispatch(loadScenario(scenarioId));
  };

  const deleteScenarioHandler = (scenarioId: string) => {
    deleteScenario(scenarioId).then((data) => {
      const isCurrentScenario = currentScenario?.id === scenarioId;
      isCurrentScenario && dispatch(closeEditor());
      setScenarioDeleted(true);
    });
  };

  const deleteModalHandler = (scenario: ScenarioType) => {
    setDeletedScenario(scenario);
    setModalOpen(true);
  };

  if (!scenariosList || scenariosList.length === 0) {
    return null;
  }

  const renderAllScenarios = () => {
    if (!scenariosList || scenariosList.length === 0) {
      return null;
    }

    return scenariosList.map((scenario: ScenarioType) => {
      const isCurrentScenario = currentScenario?.id === scenario.id;
      const formattedDate = `${new Date(scenario.createDate).toLocaleDateString(
        "pl-PL"
      )} ${new Date(scenario.createDate).toLocaleTimeString("pl-PL")}`;

      return (
        <li
          key={scenario.id}
          className={isCurrentScenario ? classes["current-scenario"] : ""}
        >
          <div>
            [{formattedDate}]{" "}
            <button
              className={`uk-button-danger ${classes["button-delete"]}`}
              onClick={deleteModalHandler.bind(null, scenario)}
            >
              Usuń
            </button>
          </div>
          <a onClick={openScenarioHandler.bind(null, scenario.id)}>
            <div>{scenario.title}</div>
          </a>
        </li>
      );
    });
  };

  return (
    <>
      <p className={classes["scenarios-header"]}>Gerwazeniek i Protazeniek</p>
      <ol className={classes["scenarios-list"]}>{renderAllScenarios()}</ol>
      <ModalScenarioDelete
        open={modalOpen}
        setOpen={setModalOpen}
        scenario={deletedScenario}
        deleteScenarioHandler={deleteScenarioHandler}
      />
    </>
  );
};

export default SavedScenariosList;

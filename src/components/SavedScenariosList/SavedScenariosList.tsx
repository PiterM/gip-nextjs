import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllScenarios, deleteScenario } from "../../http-client/HttpClient";
import { closeEditor } from "../Editor/Scenario.actions";
import { formattedDate } from "../../utils/helpers";
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
import ModalScenarioDelete from "../Modal/ModalScenarioDelete";
import ModalScenarioSwitch from "../Modal/ModalScenarioSwitch";
import { saveCurrentScenario } from "../../http-client/HttpClient";
import "uikit/dist/js/uikit.min";
import scenariosJson from "../../config/scenarios.json";

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

  const [openModalScenarioSwitch, setOpenModalScenarioSwitch] =
    useState<boolean>(false);
  const [openingScenarioId, setOpeningScenarioId] = useState<string>("");

  const showNewUnsavedScenario =
    currentScenario && !currentScenario.saved && dirty;

  useEffect(() => {
    let timeout: any;
    if (!dirty || scenarioDeleted || !openModalScenarioSwitch) {
      timeout = setTimeout(() => {
        getAllScenarios("gip").then((data) => dispatch(setScenariosList(data)));
        setScenarioDeleted(false);
      }, 300);
    }
    return () => timeout && clearTimeout(timeout);
  }, [dirty, scenarioDeleted, openModalScenarioSwitch, dispatch]);

  useEffect(() => {
    setModalOpen(true);
  }, [deletedScenario?.id]);

  const openScenarioHandler = (scenarioId: string) => {
    if (dirty) {
      setOpeningScenarioId(scenarioId);
      setOpenModalScenarioSwitch(true);
    } else {
      closeScenarioHandler(scenarioId);
    }
  };

  const closeScenarioHandler = (scenarioId?: string) => {
    dispatch(loadScenario(scenarioId!));
    setOpenModalScenarioSwitch(false);
  };

  const saveScenarioHandler = async (scenarioId?: string) => {
    currentScenario && (await saveCurrentScenario(currentScenario));
    dispatch(loadScenario(scenarioId!));
    setOpenModalScenarioSwitch(false);
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

  if (
    (!scenariosList || scenariosList.length === 0) &&
    !showNewUnsavedScenario
  ) {
    return null;
  }

  const renderAllScenarios = () => {
    if (!scenariosList || scenariosList.length === 0) {
      return null;
    }

    return scenariosList.map((scenario: ScenarioType) => {
      const isCurrentScenario = currentScenario?.id === scenario.id;
      return (
        <li
          key={scenario.id}
          className={isCurrentScenario ? classes["current-scenario"] : ""}
        >
          <div>
            [{formattedDate(scenario.createDate)}]{" "}
            <button
              className={`uk-button-danger ${classes["button-delete"]}`}
              onClick={deleteModalHandler.bind(null, scenario)}
            >
              Usuń
            </button>
          </div>
          <a onClick={openScenarioHandler.bind(null, scenario.id)}>
            <div className={classes["scenario-title"]}>{scenario.title}</div>
          </a>
        </li>
      );
    });
  };

  const scenarioTitle = scenariosJson.scenariosTypes.find(
    (scenario) => scenario.type === "gip"
  )?.name;

  return (
    <>
      <p className={classes["scenarios-header"]}>{scenarioTitle}</p>
      <ol className={classes["scenarios-list"]}>
        {showNewUnsavedScenario && (
          <li className={classes["current-scenario"]}>
            <div>
              [{formattedDate(currentScenario.createDate)}]{" "}
              <strong>[NOWY!]</strong>
            </div>
            <div className={classes["scenario-title"]}>
              {currentScenario.title}
            </div>
          </li>
        )}
        {renderAllScenarios()}
      </ol>
      <ModalScenarioDelete
        open={modalOpen}
        setOpen={setModalOpen}
        scenario={deletedScenario}
        deleteScenarioHandler={deleteScenarioHandler}
      />
      <ModalScenarioSwitch
        open={openModalScenarioSwitch}
        setOpen={setOpenModalScenarioSwitch}
        openingScenarioId={openingScenarioId}
        scenario={currentScenario}
        closeScenarioHandler={closeScenarioHandler}
        saveScenarioHandler={saveScenarioHandler}
      />
    </>
  );
};

export default SavedScenariosList;

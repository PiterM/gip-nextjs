import { FC, useState } from "react";
import { saveCurrentScenario } from "../../http-client/HttpClient";
import { useSelector } from "react-redux";
import { getCurrentScenario } from "../Editor/Scenario.selectors";
import { useDispatch } from "react-redux";
import {
  closeEditor,
  setScenarioId,
  setDirty,
} from "../Editor/Scenario.actions";
import classes from "./EditorButtons.module.sass";
import ModalScenarioClose from "../Modal/ModalScenarioClose";
import DocxGenerator from "../DocxGenerator/DocxGenerator";

const EditorButtons: FC = () => {
  const currentScenario = useSelector(getCurrentScenario);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [docxGeneratorTriggered, setDocxGeneratorTriggered] = useState(false);

  const saveScenarioHandler = async () => {
    const scenarioId =
      currentScenario && (await saveCurrentScenario(currentScenario));
    scenarioId && dispatch(setScenarioId(scenarioId));
    dispatch(setDirty(false));
  };

  const closeScenarioHandler = () => dispatch(closeEditor());

  const confirmCloseHandler = () => {
    !!currentScenario?.dirty && setModalOpen(true);
    !currentScenario?.dirty && closeScenarioHandler();
  };

  return (
    <>
      <div className={classes["save-button"]}>
        <button
          className={`uk-button uk-button-primary`}
          onClick={saveScenarioHandler}
          disabled={!currentScenario?.dirty}
        >
          Zapisz
        </button>
      </div>
      <div className={classes["close-button"]}>
        <button
          className={`uk-button uk-button-danger`}
          onClick={confirmCloseHandler}
          disabled={!currentScenario?.type}
        >
          Zamknij
        </button>
      </div>
      <div className={classes["docx-button"]}>
        <button
          className={`uk-button uk-button-secondary`}
          onClick={() => setDocxGeneratorTriggered(true)}
          disabled={!currentScenario?.type}
        >
          DOCX
        </button>
      </div>
      <ModalScenarioClose
        open={modalOpen}
        setOpen={setModalOpen}
        scenario={currentScenario}
        closeScenarioHandler={closeScenarioHandler}
        saveScenarioHandler={saveScenarioHandler}
      />
      {currentScenario?.type && docxGeneratorTriggered && (
        <DocxGenerator
          fileName={currentScenario.title || "(nowy)"}
          scenario={currentScenario}
          downloadComplete={() => setDocxGeneratorTriggered(false)}
        />
      )}
    </>
  );
};

export default EditorButtons;

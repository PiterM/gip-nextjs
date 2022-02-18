import { FC } from "react";
import { ScenarioType } from "../Editor/Scenario.state";
import { Button, Modal } from "semantic-ui-react";

export interface ModalScenarioDeleteProps {
  open: boolean;
  scenario: ScenarioType | undefined;
  setOpen: (open: boolean) => void;
  closeScenarioHandler: (scenarioId?: string) => void;
  saveScenarioHandler: () => void;
}

const ModalScenarioDelete: FC<ModalScenarioDeleteProps> = ({
  open,
  setOpen,
  scenario,
  closeScenarioHandler,
  saveScenarioHandler,
}: ModalScenarioDeleteProps) => {
  if (!scenario) {
    return null;
  }

  const confirmedCloseScenario = () => {
    setOpen(false);
    closeScenarioHandler();
  };

  const confirmedSaveScenario = () => {
    setOpen(false);
    saveScenarioHandler();
    closeScenarioHandler();
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
    >
      <Modal.Header>Potwierdź usunięcie scenariusza</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Czy na pewno chcesz zamknąć scenariusz{" "}
            <strong>{`"${scenario.title}"`}</strong> bez zapisywania?
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" onClick={confirmedSaveScenario}>
          Zapisz zmiany
        </Button>
        <Button onClick={confirmedCloseScenario} color="red">
          Odrzuć zmiany
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalScenarioDelete;

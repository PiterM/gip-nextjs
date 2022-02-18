import { FC } from "react";
import { ScenarioType } from "../Editor/Scenario.state";
import { Button, Modal } from "semantic-ui-react";

export interface ModalScenarioDeleteProps {
  open: boolean;
  scenario: ScenarioType | undefined;
  openingScenarioId: string;
  setOpen: (open: boolean) => void;
  closeScenarioHandler: (scenarioId?: string) => void;
  saveScenarioHandler: () => void;
}

const ModalScenarioDelete: FC<ModalScenarioDeleteProps> = ({
  open,
  setOpen,
  scenario,
  openingScenarioId,
  closeScenarioHandler,
  saveScenarioHandler,
}: ModalScenarioDeleteProps) => {
  if (!scenario) {
    return null;
  }

  const confirmedCloseScenario = () => {
    setOpen(false);
    closeScenarioHandler(openingScenarioId);
  };

  const confirmedSaveScenario = () => {
    setOpen(false);
    saveScenarioHandler();
    closeScenarioHandler(openingScenarioId);
  };

  const confirmedCancel = () => setOpen(false);

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
            Czy chcesz zapisać scenariusz{" "}
            <strong>{`"${scenario.title}"`}</strong>?
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" onClick={confirmedSaveScenario}>
          Tak
        </Button>
        <Button onClick={confirmedCloseScenario} color="red">
          Nie
        </Button>
        <Button onClick={confirmedCancel}>Anuluj</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalScenarioDelete;

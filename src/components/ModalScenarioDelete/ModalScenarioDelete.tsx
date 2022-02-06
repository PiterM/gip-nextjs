import { FC } from "react";
import { ScenarioType } from "../Editor/Scenario.state";
import { Button, Modal } from "semantic-ui-react";

export interface ModalScenarioDeleteProps {
  open: boolean;
  scenario: ScenarioType | undefined;
  setOpen: (open: boolean) => void;
  deleteScenarioHandler: (scenarioId: string) => void;
}

const ModalScenarioDelete: FC<ModalScenarioDeleteProps> = ({
  open,
  setOpen,
  scenario,
  deleteScenarioHandler,
}: ModalScenarioDeleteProps) => {
  if (!scenario) {
    return null;
  }

  const confirmedDeleteScenario = () => {
    setOpen(false);
    deleteScenarioHandler(scenario.id);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Potwierdź usunięcie scenariusza</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <p>
            Czy na pewno chcesz usunąć scenariusz{" "}
            <strong>{scenario.title}</strong>?
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setOpen(false)}>
          Nie
        </Button>
        <Button onClick={confirmedDeleteScenario} color="red">
          Tak
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalScenarioDelete;

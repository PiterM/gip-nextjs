import {
  DialogLineType,
  DialogType,
} from "../components/Editor/Scenario.state";
import scenariosJson from "../config/scenarios.json";

export const findActorPartner = (scenarioType: string, partnerName: string) => {
  let nextActor;
  for (const configPlay of scenariosJson.scenariosTypes) {
    if (configPlay.type === scenarioType) {
      nextActor = configPlay.actors.find((a) => a.name === partnerName);
      return nextActor;
    }
  }
};

const findActorWithVector = (
  scenarioType: string,
  prio: number,
  vector: number
) => {
  for (const configPlay of scenariosJson.scenariosTypes) {
    if (configPlay.type === scenarioType) {
      const actorsCount = configPlay.actors.length + 1;

      let nextPriority = (prio % actorsCount) + vector;
      nextPriority =
        nextPriority <= 0 ? actorsCount + nextPriority : nextPriority;

      const actor = configPlay.actors.find((a) => a.priority === nextPriority);
      const firstActor = configPlay.actors.find((a) => a.priority === 1)!;

      return actor
        ? actor
        : {
            name: "",
            priority: nextPriority,
            partner: firstActor.name,
          };
    }
  }
};

export const findNextActor = (scenarioType: string, prio: number) => {
  return findActorWithVector(scenarioType, prio, 1);
};

export const findPreviousActor = (scenarioType: string, prio: number) => {
  return findActorWithVector(scenarioType, prio, -1);
};

export const calculateDialogArray = (
  dialog: DialogType,
  iteratorKey: number | null
): DialogLineType[] => {
  let dialogArray: DialogLineType[] = [];
  while (iteratorKey !== null) {
    dialogArray.push(dialog[iteratorKey]);
    iteratorKey = dialog[iteratorKey].next;
  }
  return dialogArray;
};

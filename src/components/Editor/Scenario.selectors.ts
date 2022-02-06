import { StoreState } from "../../store/StoreState";
import { ScenarioType } from "./Scenario.state";

export const getCurrentScenario = ({
  currentScenario,
}: StoreState): ScenarioType | undefined => currentScenario;
export const getDirty = ({ currentScenario }: StoreState): boolean =>
  !!currentScenario?.dirty;
export const getScenariosList = ({
  scenariosList,
}: StoreState): ScenarioType[] | undefined => scenariosList;
// export const getCurrentTrackProgress = ({ player: { currentTrack: { progress } }}: StoreState) => progress;
// export const getTracks = ({ player: { tracks }}: StoreState) => tracks;
// export const getPlayerMuted = ({ player: { muted }}: StoreState) => muted;
// export const getLoopMode = ({ player: { loopMode }}: StoreState) => loopMode;

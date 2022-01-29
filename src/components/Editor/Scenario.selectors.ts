import { StoreState } from '../../store/StoreState';

export const getCurrentScenario = ({ currentScenario }: StoreState) => currentScenario;
// export const getCurrentTrackProgress = ({ player: { currentTrack: { progress } }}: StoreState) => progress;
// export const getTracks = ({ player: { tracks }}: StoreState) => tracks;
// export const getPlayerMuted = ({ player: { muted }}: StoreState) => muted;
// export const getLoopMode = ({ player: { loopMode }}: StoreState) => loopMode;
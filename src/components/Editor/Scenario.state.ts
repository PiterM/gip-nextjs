export interface ActorType {
  name: string;
  priority: number;
  partner: string;
}

export interface DialogType {
  [key: string]: DialogLineType;
}

export interface DialogLineType {
  actor: ActorType;
  text: string;
  key: number;
  next: number | null;
  previous: number | null;
}

export interface ScenarioType {
  id: string;
  title: string;
  createDate: Date;
  type: string;
  saved: boolean;
  intro: string;
  dialog: DialogType;
  dialogArray: DialogLineType[];
  focusKey: number;
  firstLineKey: number;
  nextFreeKey: number;
  dirty: boolean;
}

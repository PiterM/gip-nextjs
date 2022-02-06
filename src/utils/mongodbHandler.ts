import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { trimDialogSpaces } from "./helpers";
import { ScenarioType } from "../components/Editor/Scenario.state";

export const getAllScenarios = async (scenarioType: string) => {
  const cursor = (await getDbCollection()).find().sort({ createDate: -1 });
  return cursor.map((doc: ScenarioType) => doc).toArray();
};

export const insertScenario = async (data: any) => {
  data = JSON.parse(data);
  data = trimDialogSpaces(data);
  return (await getDbCollection()).insertOne(data);
};

export const updateScenario = async (data: any) => {
  data = trimDialogSpaces(data);
  (await getDbCollection()).updateOne(
    { _id: new ObjectId(data.id) },
    { $set: { ...data } }
  );
};

export const deleteScenario = async (scenarioId: string) =>
  (await getDbCollection()).deleteOne({ _id: new ObjectId(scenarioId) });

export const getDbCollection = async () => {
  const client = await clientPromise;
  return await client
    .db(String(process.env.MONGODB_DB_NAME))
    .collection(String(process.env.MONGODB_COLLECTION_NAME));
};

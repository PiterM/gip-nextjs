// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ScenarioType } from "../../../components/Editor/Scenario.state";
import { getAllScenarios } from "../../../utils/db-scenario-handler";

export interface ScenariosList {
  scenarios: ScenarioType[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScenariosList>
) {
  switch (req.method) {
    case "GET":
      res = await get(req, res);
  }
}

const get = async (
  req: NextApiRequest,
  res: NextApiResponse<ScenariosList>
) => {
  const scenarios = await getAllScenarios();
  res.status(200).json(scenarios);
  return res;
};

import { ScenarioType } from "../components/Editor/Scenario.state";

export const saveCurrentScenario = async (currentScenario: ScenarioType) => {
  if (currentScenario.id) {
    await fetch("/api/scenario", {
      method: "PUT",
      body: JSON.stringify({
        ...currentScenario,
      }),
    });
    return;
  } else {
    const response = await fetch("/api/scenario", {
      method: "POST",
      body: JSON.stringify(currentScenario),
    });

    const data = await response.json();
    await fetch("/api/scenario", {
      method: "PUT",
      body: JSON.stringify({
        ...currentScenario,
        id: data.id,
      }),
    });
    return data.id;
  }
};

export const deleteScenario = async (scenarioId: string) => {
  const response = await fetch("api/scenario", {
    method: "DELETE",
    body: scenarioId,
  });
  return await response.json();
};

export const getAllScenarios = async (scenarioType: string) => {
  const response = await fetch(`/api/scenarios/${scenarioType}`, {
    method: "GET",
  });
  return await response.json();
};

import { ScenarioType } from "../components/Editor/Scenario.state";
import { showErrorToast, showSuccessToast } from "../utils/helpers";

export const saveCurrentScenario = async (
  currentScenario: ScenarioType,
  showToast = true
) => {
  if (!currentScenario.title) {
    currentScenario = {
      ...currentScenario,
      title: "(nowy)",
    };
  }
  if (currentScenario.saved) {
    try {
      await fetch("/api/scenario", {
        method: "PUT",
        body: JSON.stringify({
          ...currentScenario,
        }),
      });
      showToast && showSuccessToast("Zapisane!");
      return;
    } catch (e) {
      showErrorToast((e as any).message);
    }
  } else {
    try {
      let response = await fetch("/api/scenario", {
        method: "POST",
        body: JSON.stringify(currentScenario),
      });
      const data = await response.json();
      response = await fetch("/api/scenario", {
        method: "PUT",
        body: JSON.stringify({
          ...currentScenario,
          id: data.id,
          saved: true,
        }),
      });
      showToast && showSuccessToast("Zapisane!");
      return data.id;
    } catch (e) {
      showErrorToast((e as any).message);
    }
  }
};

export const deleteScenario = async (scenarioId: string) => {
  try {
    const response = await fetch("api/scenario", {
      method: "DELETE",
      body: scenarioId,
    });
    showSuccessToast("Usunięte!");
    return await response.json();
  } catch (e) {
    showErrorToast((e as any).message);
  }
};

export const getAllScenarios = async (scenarioType: string) => {
  try {
    const response = await fetch(`/api/scenarios/${scenarioType}`, {
      method: "GET",
    });
    return await response.json();
  } catch (e) {
    showErrorToast((e as any).message);
  }
};

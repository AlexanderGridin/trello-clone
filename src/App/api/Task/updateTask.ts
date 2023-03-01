import { TaskDto } from "App/entities/Task/models";
import { TaskPriority } from "App/types/TaskPriority";
import { httpClient } from "../httpClient";
import { routes } from "./routes";

export const updateTask = async (
  id: string,
  body: { content: string; priority: TaskPriority; listId: string; boardId: string }
): Promise<TaskDto | null> => {
  const apiUrl = routes.updateTask.replace("{$taskId}", id);

  try {
    const response = await httpClient.put(apiUrl, body);
    return response.data;
  } catch (e) {
    return null;
  }
};

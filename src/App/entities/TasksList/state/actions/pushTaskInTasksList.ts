import { AppActionType } from "App/state/enums/AppActionType.enum";

import { TaskViewModel } from "App/entities/Task/TaskViewModel";
import { TasksListViewModel } from "App/entities/TasksList/TasksListViewModel";
import { createAction } from "App/state/utils/createAction";

interface PushTaskInTasksListPayload {
  list: TasksListViewModel;
  task: TaskViewModel;
}

export const pushTaskInTasksList = (
  list: TasksListViewModel,
  task: TaskViewModel
) => {
  const { PushTaskInTasksList } = AppActionType;
  const payload: PushTaskInTasksListPayload = {
    list,
    task,
  };

  return createAction<typeof PushTaskInTasksList, PushTaskInTasksListPayload>(
    PushTaskInTasksList,
    payload
  );
};

export type PushTaskInTasksListAction = ReturnType<typeof pushTaskInTasksList>;

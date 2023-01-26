import { ActionType } from "App/state/enums/ActionType.enum";
import { createAction } from "App/state/utils/createAction";
import { TasksListModel } from "../../models/TasksListModel";

interface MoveTasksListActionPayload {
  listToMove: TasksListModel;
  listToReplace: TasksListModel;
}

export const moveTasksList = (
  listToMove: TasksListModel,
  listToReplace: TasksListModel
) => {
  const { MoveList } = ActionType;
  const payload: MoveTasksListActionPayload = {
    listToMove,
    listToReplace,
  };

  return createAction<typeof MoveList, MoveTasksListActionPayload>(
    MoveList,
    payload
  );
};

export type MoveTasksListAction = ReturnType<typeof moveTasksList>;

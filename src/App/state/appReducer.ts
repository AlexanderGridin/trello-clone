import { AppState } from "./models/AppState";
import { AppAction } from "./models/AppAction";
import { setDraggedItemReducer } from "./shared/DraggedItem/reducers/setDraggedItemReducer";
import { AppActionType } from "./enums/AppActionType.enum";
import { addBoardReducer } from "App/entities/Board/state/reducers/addBoardReducer";
import { removeBoardReducer } from "App/entities/Board/state/reducers/removeBoardReducer";
import { moveBoardReducer } from "App/entities/Board/state/reducers/moveBoardReducer";
import { addTaskReducer } from "App/entities/Task/state/reducers/addTaskReducer";
import { removeTaskReducer } from "App/entities/Task/state/reducers/removeTaskReducer";
import { moveTaskReducer } from "App/entities/Task/state/reducers/moveTaskReducer";
import { addTasksListReducer } from "App/entities/TasksList/state/reducers/addTasksListReducer";
import { removeTasksListReducer } from "App/entities/TasksList/state/reducers/removeTasksListReducer";
import { moveTasksListReducer } from "App/entities/TasksList/state/reducers/moveTasksListReducer";
import { pushTaskInTasksListReducer } from "App/entities/TasksList/state/reducers/pushTaskInTasksListReducer";
import { pinTasksListReducer } from "App/entities/TasksList/state/reducers/pinTasksListReducer";
import { unpinTasksListReducer } from "App/entities/TasksList/state/reducers/unpinTasksListReducer";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    // TasksList
    case AppActionType.AddList:
      return addTasksListReducer(state, action);

    case AppActionType.RemoveList:
      return removeTasksListReducer(state, action);

    case AppActionType.MoveList:
      return moveTasksListReducer(state, action);

    case AppActionType.PushTaskInTasksList:
      return pushTaskInTasksListReducer(state, action);

    case AppActionType.PinList:
      return pinTasksListReducer(state, action);

    case AppActionType.UnpinList:
      return unpinTasksListReducer(state, action);

    // Task
    case AppActionType.AddTask:
      return addTaskReducer(state, action);

    case AppActionType.RemoveTask:
      return removeTaskReducer(state, action);

    case AppActionType.MoveTask:
      return moveTaskReducer(state, action);

    // DraggedItem
    case AppActionType.SetDraggedItem:
      return setDraggedItemReducer(state, action);

    // Board
    case AppActionType.AddBoard:
      return addBoardReducer(state, action);

    case AppActionType.RemoveBoard:
      return removeBoardReducer(state, action);

    case AppActionType.MoveBoard:
      return moveBoardReducer(state, action);

    default:
      return { ...state };
  }
};

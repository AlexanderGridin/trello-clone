import { DragLayer } from "App/widgets/DragLayer";
import { AddTasksList } from "App/widgets/tasks-lists/AddTasksList";
import { TasksListCard } from "App/widgets/tasks-lists/TasksListCard";
import { TasksListViewModel } from "entities/TasksList/models";
import { useTasksListDispatcher } from "store/OpenedBoard/TasksList/hooks";

import style from "./TasksListsCardsList.module.css";

interface ITasksListsCardsListProps {
  boardId: string;
  lists: TasksListViewModel[];
  isShowAddTasksList?: boolean;
}

export const TasksListsCardsList = ({ boardId, lists, isShowAddTasksList = false }: ITasksListsCardsListProps) => {
  const dispatcher = useTasksListDispatcher();
  const addTasksList = (list: TasksListViewModel) => dispatcher.addTasksList(list);

  if (!lists.length) {
    return (
      <div className={style.cell}>
        <AddTasksList boardId={boardId} onAdd={addTasksList} />
      </div>
    );
  }

  return (
    <div className={style.container}>
      <DragLayer />

      {lists.map((list: TasksListViewModel) => (
        <div className={style.cell} key={list.id}>
          <TasksListCard list={list} />
        </div>
      ))}

      {isShowAddTasksList && (
        <div className={style.cell}>
          <AddTasksList boardId={boardId} onAdd={addTasksList} />
        </div>
      )}
    </div>
  );
};

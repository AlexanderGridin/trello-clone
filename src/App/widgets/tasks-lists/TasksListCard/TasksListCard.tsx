import { useState } from "react";

import { DndCard } from "App/components/DndCard/DndCard";
import { DraggedItemType } from "App/enums/DraggedItemType";
import { Card } from "shared/components/Card/Card";

import {
  debouncedUpdateTasksListMany,
  removeTasksList as removeTasksListFromApi,
  updateTasksList as updateTasksListOnApi,
} from "App/api/TasksList/services";

import { TasksCardsList } from "App/widgets/tasks/TasksCardsList/TasksCardsList";
import { useAppDraggedItemDispatcher } from "App/entities/AppDraggedItem/state";
import { TasksListDto, TasksListViewModel } from "App/entities/TasksList/models";
import { TAppDraggedItem } from "App/entities/AppDraggedItem/models";
import { useTasksListDispatcher } from "App/store/OpenedBoard/TasksList/hooks";
import { useTaskDispatcher } from "App/store/OpenedBoard/Task/hooks";

import { TasksListHeader } from "./components/TasksListHeader/TasksListHeader";
import { TasksListModal } from "../TasksListModal/TasksListModal";

export interface ITasksListCardProps {
  list: TasksListViewModel;
  isDragPreview?: boolean;
}

export const TasksListCard = ({ list, isDragPreview = false }: ITasksListCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const BACKGROUD_COLOR = list.isPinned ? "#ebdcbd" : "#D8DEE9";

  const dispatcher = useTasksListDispatcher();
  const taskDispatcher = useTaskDispatcher();
  const appDraggedItemDispatcher = useAppDraggedItemDispatcher();

  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  const edit = () => {
    dispatcher.updateTasksList({ ...list, isEditing: true });
  };

  const remove = async () => {
    startLoading();

    const tasksListDto = await removeTasksListFromApi(list.id);
    if (tasksListDto) {
      dispatcher.removeTasksList(TasksListDto.toViewModel(tasksListDto));
    }

    endLoading();
  };

  const togglePin = async () => {
    startLoading();

    const listDto = await updateTasksListOnApi(list.id, {
      title: list.title,
      isPinned: !list.isPinned,
      boardId: list.boardId,
    });

    if (listDto) {
      dispatcher.updateTasksList(TasksListDto.toViewModel(listDto));
    }

    endLoading();
  };

  const dropOnList = (draggedItem: TAppDraggedItem) => {
    if (draggedItem.type === DraggedItemType.TasksList && draggedItem.data.isPinned === list.isPinned) {
      appDraggedItemDispatcher.setAppDraggedItem({
        ...draggedItem,
        data: {
          ...draggedItem.data,
          rank: list.rank,
        },
      });

      const draggedList = { ...draggedItem.data, rank: list.rank };
      const targetList = { ...list, rank: draggedItem.data.rank };

      dispatcher.moveTasksList(draggedList, targetList);

      const requestBody = [draggedList, targetList].map(TasksListViewModel.toUpdateManyDto);
      debouncedUpdateTasksListMany({
        body: requestBody,
      });

      return;
    }

    if (draggedItem.type !== DraggedItemType.Task || list.tasks.length) {
      return;
    }

    taskDispatcher.removeTask(draggedItem.data);
    dispatcher.pushTaskInTasksList(list, draggedItem.data);
    appDraggedItemDispatcher.setAppDraggedItem({
      ...draggedItem,
      data: {
        ...draggedItem.data,
        listId: list.id,
      },
    });
  };

  const header = (
    <TasksListHeader title={list.title} isPinned={list.isPinned} onRemove={remove} onEdit={edit} onPin={togglePin} />
  );

  const content = (
    <>
      <TasksCardsList boardId={list.boardId} listId={list.id} tasks={list.tasks} isShowAddTask />
      <div style={{ paddingTop: "15px", color: "gray", textAlign: "right" }}>{list.rank}</div>
    </>
  );

  if (isDragPreview || isLoading) {
    return (
      <Card
        slotHeader={header}
        slotContent={content}
        isLoading={isLoading}
        backgroundColor={BACKGROUD_COLOR}
        className={isDragPreview ? "drag-preview" : ""}
      />
    );
  }

  return (
    <>
      <DndCard
        slotHeader={header}
        slotContent={content}
        backgroundColor={BACKGROUD_COLOR}
        draggedItem={TasksListViewModel.toAppDraggedItem(list)}
        onDrop={dropOnList}
      />

      <TasksListModal list={list} />
    </>
  );
};

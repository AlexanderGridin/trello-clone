import { useParams } from "react-router-dom";
import { AppPageLayout } from "App/components/AppPageLayout/AppPageLayout";
import { PageTitle } from "App/components/PageTitle/PageTitle";
import { ListOfTasksLists } from "App/widgets/ListOfTasksLists/ListOfTasksLists";
import { useAppState } from "App/state/hooks/useAppState";
import { useEffect } from "react";
import {
  BoardWithTasksListsDto,
  mapBoardWithTasksListsDtoToViewModel,
} from "App/entities/Board/BoardWithTasksLists";
import { useBoardDispatchers } from "App/entities/Board/state/hooks/useBoardDispatchers";
import { getBoard } from "App/api/Boards/Boards.api";

export const BoardPage = () => {
  const { id } = useParams();
  const { boardsCache } = useAppState();
  const { dispatchCacheBoard } = useBoardDispatchers();
  const board = boardsCache[id as string];

  useEffect(() => {
    if (board) {
      return;
    }

    getBoard(id as string).then((boardDto: BoardWithTasksListsDto) => {
      const board = mapBoardWithTasksListsDtoToViewModel(boardDto);
      dispatchCacheBoard(board);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppPageLayout
      slotHeader={<PageTitle>{board?.title ?? "Loading board..."}</PageTitle>}
      isLoading={!board}
    >
      {board && (
        <ListOfTasksLists
          boardId={board.id}
          lists={[...board.pinnedTasksLists, ...board.tasksLists]}
          isShowAddTasksList
        />
      )}
    </AppPageLayout>
  );
};

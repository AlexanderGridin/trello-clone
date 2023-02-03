import { BoardsListDragLayer } from "./components/BoardsListDragLayer";
import { BoardsListContainer } from "./components/BoardsListContainer";
import { BoardsListCell } from "./components/BoardsListCell";
import { BoardsListItems } from "./components/BoardsListItems/BoardsListItems";
import { BoardViewModel } from "App/entities/Board/BoardViewModel";
import { useBoardsListFeatures } from "./hooks/useBoardsListFeatures";
import { AddBoard } from "../AddBoard/AddBoard";

interface BoardsListProps {
  boards: BoardViewModel[];
}

export const BoardsList = ({ boards }: BoardsListProps) => {
  const { addBoard } = useBoardsListFeatures();

  return (
    <>
      <BoardsListDragLayer />

      <BoardsListContainer>
        <BoardsListItems boards={boards} />

        <BoardsListCell>
          <AddBoard onAdd={addBoard} />
        </BoardsListCell>
      </BoardsListContainer>
    </>
  );
};

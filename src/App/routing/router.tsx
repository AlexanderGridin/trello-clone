import { AppLayout } from "App/components/AppLayout/AppLayout";
import { BoardPage } from "App/pages/BoardPage/BoardPage";
import { BoardsPage } from "App/pages/BoardsPage/BoardsPage";
import { FavoriteBoardsPage } from "App/pages/FavoriteBoardsPage/FavoriteBoardsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <BoardsPage /> },
      {
        path: "boards/:id",
        element: <BoardPage />,
      },
      {
        path: "boards/favorite",
        element: <FavoriteBoardsPage />,
      },
    ],
  },
]);

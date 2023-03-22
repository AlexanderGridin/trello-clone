import { IClick, IClassName } from "shared/models";
import { MaterialIcon, IconButton, Tooltip } from "shared/components";

import style from "./EditButton.module.css";

interface IEditButtonProps extends IClick, IClassName {}

export const EditButton = ({ className, onClick }: IEditButtonProps) => {
  const cn = `${style.button} ${className}`;

  return (
    <Tooltip content="Edit">
      <IconButton icon={MaterialIcon.EditSquare} activeColor="#a3be8c" className={cn} onClick={onClick} />
    </Tooltip>
  );
};

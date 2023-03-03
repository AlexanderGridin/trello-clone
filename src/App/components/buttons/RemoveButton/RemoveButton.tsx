import { MaterialIcon } from "shared/components/Icon/enums/MaterialIcon";
import { IconButton } from "shared/components/IconButton/IconButton";
import { Tooltip } from "shared/components/Tooltip/Tooltip";
import { ClassName } from "shared/models/ClassName";
import { Click } from "shared/models/Click";

interface RemoveButtonProps extends Click, ClassName {}

export const RemoveButton = ({ className, onClick }: RemoveButtonProps) => {
  return (
    <Tooltip content="Delete">
      <IconButton icon={MaterialIcon.Delete} activeColor="#BF616A" className={className} onClick={onClick} />
    </Tooltip>
  );
};

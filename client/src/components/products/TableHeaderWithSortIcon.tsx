import { ArrowUpDown } from "lucide-react";
import React from "react";

interface TableHeaderWithSortIconProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
const TableHeaderWithSortIcon = ({
  text,
  onClick,
}: TableHeaderWithSortIconProps) => {
  return (
    <div
      onClick={onClick}
      className="inline-flex w-max cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap leading-none ml-4"
    >
      <span>{text}</span>
      <ArrowUpDown className="size-4 shrink-0" />
    </div>
  );
};

export default TableHeaderWithSortIcon;

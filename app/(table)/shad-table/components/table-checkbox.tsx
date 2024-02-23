import React, { HTMLProps, useEffect, useRef } from "react";

// 체크박스 선택
export const TableCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      onClick={handleClick}
      {...rest}
    />
  );
};

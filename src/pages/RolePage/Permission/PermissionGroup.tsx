import React from 'react';

interface PermissionGroupProps {
  selected: boolean;
  handleClick: () => void;
  label: string;
}
export const PermissionGroup = ({
  selected,
  handleClick,
  label,
}: PermissionGroupProps) => {
  return (
    <div
      className={`p-2 ps-3 permissionGroup ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

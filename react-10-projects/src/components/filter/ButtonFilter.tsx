import classNames from "classnames";

interface ButtonFilterProps {
  handleFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  backGroundColorButton: string;
  value: string;
  children: React.ReactNode;
}

export default function ButtonFilter({
  handleFilter,
  backGroundColorButton,
  value,
  children,
}: ButtonFilterProps) {
  return (
    <button
      onClick={handleFilter}
      type="button"
      value={value}
      className={classNames(
        "px-3 py-1 text-white rounded-md",
        `bg-${backGroundColorButton}-700`,
        `hover:bg-${backGroundColorButton}-500`
      )}
    >
      {children}
    </button>
  );
}

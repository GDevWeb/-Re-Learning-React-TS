interface ButtonProps {
  type: "submit" | "reset" | "button";
  textButton: string;
}

export default function Button({ type, textButton }: ButtonProps) {
  return (
    <button
      type={type}
      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      {textButton}
    </button>
  );
}

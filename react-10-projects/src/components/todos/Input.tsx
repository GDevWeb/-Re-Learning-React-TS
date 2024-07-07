interface InputProps {
  type: string;
  inputState: string;
  handleInputChange: () => void;
}
export default function Input({
  type,
  inputState,
  handleInputChange,
}: InputProps) {
  return (
    <input
      type={type}
      name="inputName"
      id="inputName"
      placeholder="Saisir le nom de la tâche"
      value={inputState}
      onChange={handleInputChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  );
}

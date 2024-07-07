interface LabelProps {
  name: string;
  title: string;
}
export default function Label({ name, title }: LabelProps) {
  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {title}
    </label>
  );
}

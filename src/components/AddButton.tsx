import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
  text: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full p-3 mt-4 text-white bg-blue-500 rounded"
  >
    <Plus size={20} className="mr-2" />
    {text}
  </button>
);

export default AddButton;

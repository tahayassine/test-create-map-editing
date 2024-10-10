import { Save } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
  text: string;
}

const AddButton: React.FC<SaveButtonProps> = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full p-3 mt-4 text-white bg-blue-500 rounded"
  >
    <Save size={20} className="mr-2 text-green-400" />
    {text}
  </button>
);

export default AddButton;

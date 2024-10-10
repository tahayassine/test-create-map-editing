import { ChevronLeft } from 'lucide-react';

export interface HeaderProps {
  title: string;
  handleback: () => void;
  backable: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  handleback,
  backable = false,
}) => (
  <header className="flex items-center p-4 text-white bg-gray-800">
    {backable && (
      <button>
        {' '}
        <ChevronLeft className="mr-2" onClick={() => handleback()} />{' '}
      </button>
    )}
    <h1 className="text-lg font-semibold">{title}</h1>
  </header>
);

export default Header;

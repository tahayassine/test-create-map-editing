import { Save, Trash } from 'lucide-react';
import { useState } from 'react';

export interface RouteStepProps {
  id: number;
  lat: number;
  long: number;
  onDelete: () => void;
  onSave: (lat: number, lgn: number) => void;
  isNew: boolean;
}

const RouteStep: React.FC<RouteStepProps> = ({
  id,
  lat,
  long,
  onDelete,
  onSave,
  isNew,
}) => {
  const [latValue, setLatValue] = useState(lat);
  const [longValue, setLongValue] = useState(long);
  const [isNewValue, setIsNewValue] = useState(isNew);

  const handleLatOnchange = (newLat: number) => {
    if (newLat !== lat) {
      setIsNewValue(true);
      setLatValue(newLat);
    }
  };

  const handleLongOnchange = (newLong: number) => {
    if (newLong !== long) {
      setIsNewValue(true);
      setLongValue(newLong);
    }
  };

  return (
    <div className="flex items-center justify-around m-2">
      <span className="w-12">WP{id}</span>
      <input
        className="w-16 p-2 text-white bg-gray-700 rounded-lg"
        value={latValue}
        type="number"
        onChange={(e) => handleLatOnchange(+e.target.value)}
      />
      <input
        className="w-16 p-2 text-white bg-gray-700 rounded-lg "
        value={longValue}
        type="number"
        onChange={(e) => handleLongOnchange(+e.target.value)}
      />

      {isNewValue ? (
        <button
          onClick={() => onSave(latValue, longValue)}
          className="p-2 text-green-400 hover:text-white"
        >
          <Save size={20} />
        </button>
      ) : (
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-white"
        >
          <Trash size={20} />
        </button>
      )}
      {/* // save on modification */}
    </div>
  );
};

export default RouteStep;

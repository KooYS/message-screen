import React from 'react';

interface Props {
  message: string;
}
const Card: React.FC<Props> = ({ message }) => {
  return (
    <>
      <div className="max-w-sm mx-auto mb-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-gray-600 mt-2">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

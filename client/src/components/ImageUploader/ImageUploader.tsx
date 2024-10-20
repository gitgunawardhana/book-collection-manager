import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ImageUploaderProps {
  textShow?: boolean
}

const ImageUploader: React.FC<ImageUploaderProps> = ({textShow=true}:ImageUploaderProps) => {
  return (
    <div className="border-2 border-dashed border-lime-green-100 rounded-lg p-8 w-full mx-auto bg-transparent text-center hover:border-lime-green-50 transition-colors">
      <img
        src="https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png"
        alt="Cover image for book"
        className={twMerge([
          "w-20 mx-auto",
          textShow && "mb-4",
        ])}
      />
      {textShow && (<>
        <p className="mb-2">
          Drop your image here, or{' '}
          <span className="text-blue-500 cursor-pointer">
            browse
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Supports: JPG, JPEG2000, PNG
        </p>
      </>)}
    </div>
  );
};

export default ImageUploader;

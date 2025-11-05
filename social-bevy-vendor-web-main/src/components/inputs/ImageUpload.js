import React from "react";
import Image from "next/legacy/image";
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ index, image, handleDrop, defaultImage }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, index),
    accept: {
      'image/*': ['.jpeg', '.png']
    },
    multiple: false,
  });

  const getImageSrc = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (typeof image === 'string') {
      return image;
    } else if (image?.url) {
      return image.url;
    } else if (defaultImage !== undefined) {
      return defaultImage;
    }
    return '/images/no-image.jpeg';
  };

  return (
    <div
      {...getRootProps()}
      className={`w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer relative overflow-hidden ${!image ? "border-2 border-gray-700 border-dashed" : ""}`}
    >
      <input {...getInputProps()} />
      {image ? (
        <Image
          src={getImageSrc(image)}
          alt={`Image ${index + 1}`}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <div className="text-gray-700 text-4xl">+</div>
      )}
    </div>
  );
};

export default React.memo(ImageUpload);

import React from "react";
import FileMetaData from "../../../data/FileMetaData";

interface RecentFileButtonProps {
    file: FileMetaData;
}

const RecentFileButton = ({ file }: RecentFileButtonProps) => {
  return (
    <div className='p-6 bg-white hover:bg-black/20 cursor-pointer w-64 h-96 rounded-xl drop-shadow'>
      <h1 className='text-blue-900 text-xl'>{file.name}</h1>
      <p className='my-5'>{file.path}</p>
    </div>
  );
};

export default RecentFileButton;

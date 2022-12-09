import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { closeFile, selectOpenFile } from "../../../store/OpenFileSlice";

const Header = () => {
  const openFileSelector = useSelector(selectOpenFile);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-blue-900 text-white font-semibold p-4'>
      <div>NLP Marker Assistant - {openFileSelector?.fileMetaData.name}</div>
      <XMarkIcon
        className='h-8 p-1 hover:bg-white/20 rounded-full'
        onClick={() => dispatch(closeFile())}
      />
    </div>
  );
};

export default Header;

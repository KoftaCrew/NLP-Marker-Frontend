import { useSelector } from "react-redux";

import { selectOpenFile } from "../../../store/OpenFileSlice";

const PaperPage = () => {
  const openFileSelector = useSelector(selectOpenFile);

  return (
    <div
      className='bg-white shadow-md m-5'
      style={{
        width: `${openFileSelector?.data.width}pt`,
        aspectRatio: openFileSelector?.data.aspectRatio
      }}>

    </div>
  );
};

export default PaperPage;

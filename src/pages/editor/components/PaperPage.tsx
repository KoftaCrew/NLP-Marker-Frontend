import { useSelector } from "react-redux";

import { selectOpenFile } from "../../../store/OpenFileSlice";

interface PaperPageProps {
  children: React.ReactNode[];
}

const PaperPage = ( {children}: PaperPageProps ) => {
  const openFileSelector = useSelector(selectOpenFile);

  return (
    <div
      className='bg-white shadow-md m-5'
      style={{
        width: `${openFileSelector?.data.width}pt`,
        aspectRatio: openFileSelector?.data.aspectRatio
      }}>
      {children}
    </div>
  );
};

export default PaperPage;

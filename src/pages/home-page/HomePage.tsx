import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DocumentPlusIcon, DocumentArrowDownIcon, FolderOpenIcon } from '@heroicons/react/24/solid';

import SidePanelButton from "./components/SidePanelButton";
import { selectRecentFiles } from "../../store/HistorySlice";
import RecentFileButton from "./components/RecentFileButton";
import HomePageNav from "./components/HomePageNav";
import { openFile } from "../../store/OpenFileSlice";

const HomePage = () => {
  const recentFiles = useSelector(selectRecentFiles);
  const dispatch = useDispatch();

  const newFile = useCallback(() => {
    dispatch(openFile({
      name: 'Untitled'
    }));
  }, [dispatch]);

  return (
    <div className='flex h-screen'>
      <HomePageNav
        title='NLP Marker'>
        <SidePanelButton
          text='New Exam'
          icon={<DocumentPlusIcon />}
          onClick={newFile}
        />
        <SidePanelButton
          text='Import Exam'
          icon={<DocumentArrowDownIcon />}
        />
        <SidePanelButton
          text='Open Exam'
          icon={<FolderOpenIcon />}
        />
      </HomePageNav>

      <div className='flex-1 bg-gray-100 overflow-y-auto'>
        <h1 className='text-4xl m-6 mt-10'>Recent exams</h1>
        <div className='flex flex-wrap gap-4 m-6 mt-10'>
          {recentFiles.map((file) => (
            <RecentFileButton
              key={file.path}
              file={file}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

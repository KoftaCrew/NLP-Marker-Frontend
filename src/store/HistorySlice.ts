import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import FileMetaData from '../data/FileMetaData';
import { RootState } from './Store';

export interface HistoryState {
    recentFiles: FileMetaData[];
}

const initialState: HistoryState = {
  recentFiles: [
    {
      name: 'test',
      path: 'test1'
    },
    {
      name: 'test2',
      path: 'test2'
    },
    {
      name: 'test',
      path: 'test3'
    },
    {
      name: 'test2',
      path: 'test4'
    },
    {
      name: 'test',
      path: 'test5'
    },
    {
      name: 'test2',
      path: 'test6'
    },
    {
      name: 'test',
      path: 'test7'
    },
    {
      name: 'test2',
      path: 'test8'
    },
    {
      name: 'test',
      path: 'test9'
    },
    {
      name: 'test2',
      path: 'test10'
    }
  ]
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addRecentFile: (state, action: PayloadAction<FileMetaData>) => {
      state.recentFiles.push(action.payload);
    }
  }
});

export const { addRecentFile } = historySlice.actions;

export const selectRecentFiles = (state: RootState) => state.history.recentFiles;

export default historySlice.reducer;

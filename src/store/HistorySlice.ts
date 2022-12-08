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
      path: 'test'
    },
    {
      name: 'test2',
      path: 'test2'
    },
    {
      name: 'test',
      path: 'test'
    },
    {
      name: 'test2',
      path: 'test2'
    },
    {
      name: 'test',
      path: 'test'
    },
    {
      name: 'test2',
      path: 'test2'
    },
    {
      name: 'test',
      path: 'test'
    },
    {
      name: 'test2',
      path: 'test2'
    },
    {
      name: 'test',
      path: 'test'
    },
    {
      name: 'test2',
      path: 'test2'
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

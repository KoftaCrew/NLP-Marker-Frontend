import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import StudentsAnswers from './views/StudentsAnswers';
import InsightsViewer from './components/InsightsViewer/InsightsViewer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>

          <Route index element={<App />} />
          <Route path='/home' element={<Home />} />
          <Route path='/student-answer' element={<StudentsAnswers studentAnswers={
            [{
              Name: 'David Emad Philip Ata-Allah', Answer: <InsightsViewer studTokens={["first lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum", "tany modal"]}
                modelTokens={["second lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum", "awel modal"]} //static data fix by impelementing service
                adj={[[0], [0]]}></InsightsViewer>
            }, {
              Name: 'Student 2', Answer: <InsightsViewer studTokens={["first lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum", "tany modal"]}
                modelTokens={[" tany student second lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum", "awel modal"]} adj={[[0], [0]]}></InsightsViewer>
            }]
          } />}
          />
          {/* TODO insert your routes here */}
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

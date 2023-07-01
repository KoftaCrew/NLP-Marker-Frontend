import { AppBar, Container, CssBaseline, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import Home from './views/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.png';
import { useState } from 'react';
import { AppBarContext } from './store/AppBarContext';
import StudentsExamEntry from './views/StudentExamEntry';
import StudentsAnswers from './views/StudentsAnswers';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

function App() {
  const [appBarTitle, setAppBarTitle] = useState('Home');
  const [appBarButtons, setAppBarButtons] = useState<JSX.Element[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className='w-screen h-screen flex flex-col'>
          <AppBar
            position='static'
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Container maxWidth='xl'>
              <Toolbar>
                <img className='h-16 w-32 mr-10' src={logo} alt='Logo' />
                <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ flexGrow: 1 }}
                >
                  {appBarTitle}
                </Typography>
                {appBarButtons}
              </Toolbar>
            </Container>
          </AppBar>
          <div className='flex-grow overflow-auto'>
            <AppBarContext.Provider value={{ appBarTitle, setAppBarTitle, appBarButtons, setAppBarButtons }}>
              <Routes>
                <Route index element={<Home />} />
                <Route path='/student-exam/:examId' element={<StudentsExamEntry/>} />
                <Route path='*' element={<Navigate to='/' replace/>} />
              </Routes>
            </AppBarContext.Provider>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;

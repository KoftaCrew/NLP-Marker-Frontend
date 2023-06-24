import { AppBar, Container, CssBaseline, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import Home from './views/Home';
import StudentExam from './views/StudentExam';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A'
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className='w-screen h-screen flex flex-col'>
          <AppBar position='static'>
            <Container maxWidth='xl'>
              <Toolbar>
                <img className='h-16 w-32 mr-10' src={logo} alt='Logo' />
                <Typography
                  variant='h6'
                  noWrap
                >
                  <Routes>
                    <Route index element='Home' />
                    <Route path='/student-exam' element='Student Exam' />
                  </Routes>
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
          <div className='flex-grow'>
            <Routes>
              <Route index element={<Home />} />
              <Route path='/student-exam' element={<StudentExam />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;

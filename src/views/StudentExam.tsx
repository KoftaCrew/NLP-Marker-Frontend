import { AppBar, Box, Button, Card, CardActions, CardContent, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import React from "react";
import logo from '../assets/logo.png';

const navbarTheme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A'
    },
  }
});

const questions = [
  {
    "title": "ighaigah igshagia sgiahsgioa ghasiogh wghwioghw iog whgiopwh ofkghreioghe vlkefhg owieeghweog hweroig"
  },
  {
    "title": "ighaigah igshagia sgiahsgioa ghasiogh wghwioghw iog whgiopwh ofkghreioghe vlkefhg owieeghweog hweroig"
  },
  {
    "title": "ighaigah igshagia sgiahsgioa ghasiogh wghwioghw iog whgiopwh ofkghreioghe vlkefhg owieeghweog hweroig"
  },
];

const StudentExam = () => {
  const title = <Typography variant='h4' position='absolute' textAlign='center' sx={{ width: '100%' }}>
    English Exam
  </Typography>;

  const questionCards = questions.map((question, index) => (
    <Card sx={{ width: '80%', height: '500px', margin: '60px auto', backgroundColor: '#D9D9D9' }}>
      <CardContent>
          <Typography>{index + 1}. {question.title}</Typography>
      </CardContent>
    </Card>
  ));

  return (
    <React.Fragment>
      <ThemeProvider theme={navbarTheme}>
        <AppBar position='sticky'>
          <Toolbar>
            <img className='h-16 w-32' src={logo} alt='Logo' />
            {title}
          </Toolbar>
        </AppBar>
        {questionCards}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default StudentExam;

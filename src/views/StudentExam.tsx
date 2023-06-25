import {Card, CardContent, ThemeProvider, Typography, createTheme, TextField, Button, Container } from "@mui/material";
import React from "react";
import logo from '../assets/logo.png';

const textFieldTheme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'
        }
    }
});

const questions = [
    {
        "title": "ighaigah igshagia sgiahsgioa ghasiogh wghwioghw iog whgiopwh ofkghreioghe vlkefhg owieeghweog hweroig ighaigah igshagia sgiahsgioa ghasiogh wghwioghw iog whgiopwh ofkghreioghe vlkefhg owieeghweog hweroig"
    },
    {
        "title": "ighaigah igshagia sgiahsgioa ghasiogh wghwioghw iog whgiopwh ofkghreioghe vlkefhg owieeghweog hweroig"
    },
    {
        "title": "ighaigah igshagia sgiahsgioa ghasiogh wghwioghw iog whgiopwh ofkghreioghe vlkefhg owieeghweog hweroig"
    }
];


const StudentExam = () => {
    const title = <Typography variant='h4' position='absolute' textAlign='center' sx={{ width: '100%' }}>
        English Exam
    </Typography>;

    return (
        <Container>
            {questions.map((question, index) => (
                <Card className='min-h-fit my-8' sx={{backgroundColor: '#D9D9D9' }}>
                    <CardContent>
                        <Typography>{index + 1}. {question.title}</Typography>
                        <ThemeProvider theme={textFieldTheme}>
                            <TextField
                                id='standard-basic'
                                className='my-6'
                                variant='standard'
                                multiline
                                rows='10'
                                margin='normal'
                                sx={{ backgroundColor: '#FFFFFF', width: '100%', borderRadius: 2, padding: '25px' }}
                            />
                        </ThemeProvider>
                    </CardContent>
                </Card>
            ))}
            <div className="flex justify-center px-28 pb-12">
                <Button className='w-32' color='primary' variant='contained'>Submit</Button>
            </div>
        </Container>
    );
};

export default StudentExam;

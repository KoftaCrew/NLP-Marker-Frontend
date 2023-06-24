import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { Box, Button, TextField, Typography } from "@mui/material";


const Login = () => {
  const { setUser } = useContext(UserContext);

  return (<div className='w-full h-full flex justify-center content-center flex-wrap'>
    <Box
      component='form'
      className='flex flex-col justify-center content-center gap-5 w-1/4 h-1/2 bg-gray-300/10 p-12 rounded-lg'
    >
      <Typography variant='h4'>Educator Login</Typography>
      <TextField
        required
        id='username'
        label='Username'
        variant='outlined'
      />
      <TextField
        required
        id='password'
        label='Password'
        variant='outlined'
      />
      <Button
        variant='contained'
        type='submit'
      >
        Login
      </Button>
    </Box>
  </div>);
};

export default Login;

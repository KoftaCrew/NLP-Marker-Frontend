import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AppBarContext } from "../store/AppBarContext";


const Login = () => {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setAppBarTitle, setAppBarButtons } = useContext(AppBarContext);

  useEffect(() => {
    setAppBarTitle('Login');
    setAppBarButtons([]);
  }, []);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.target as HTMLFormElement).username.value;

    // TODO: Add authentication
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      username,
      name: 'John Doe',
      email: 'john.deo@example.com'
    });
    // setError('Invalid username or password');
    setLoading(false);
  };

  return (<div className='w-full h-full flex justify-center content-center flex-wrap'>
    <Box
      component='form'
      className='flex flex-col justify-center content-center gap-5 w-1/4 h-1/2 bg-gray-300/10 p-12 rounded-lg'
      onSubmit={handleOnSubmit}
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
        type='password'
      />
      <Typography variant='body1' color='error'>{error}</Typography>
      <LoadingButton
        variant='contained'
        type='submit'
        loading={loading}
      >
        Login
      </LoadingButton>
    </Box>
  </div>);
};

export default Login;

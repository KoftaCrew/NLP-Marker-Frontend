import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../store/UserContext";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AppBarContext } from "../store/AppBarContext";


const Login = () => {
  const { setUser } = useContext(UserContext);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setAppBarTitle, setAppBarButtons } = useContext(AppBarContext);

  const action = useMemo(() => mode === 'login' ? 'Login' : 'Register', [mode]);

  useEffect(() => {
    setAppBarTitle(action);
    setAppBarButtons([]);
  }, [mode, setAppBarTitle, setAppBarButtons]);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.target as HTMLFormElement).username.value;

    // TODO: Add authentication
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      username,
      name: mode === "login" ? 'John Doe' : (event.target as HTMLFormElement).fullname.value,
      email: mode === "login" ? 'john.deo@example.com' : (event.target as HTMLFormElement).email.value
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
      <Typography variant='h4'>Educator {action}</Typography>
      <TextField
        required
        id='username'
        label='Username'
        variant='outlined'
      />
      {mode === 'register' && <>
        <TextField
          required
          id='fullname'
          label='Name'
          variant='outlined'
        />
        <TextField
          required
          id='email'
          label='Email'
          type='email'
          variant='outlined'
        />
      </>}
      <TextField
        required
        id='password'
        label='Password'
        variant='outlined'
        type='password'
      />
      <Typography variant='body1' color='error'>{error}</Typography>
      {mode === 'login' && <>
        <LoadingButton
          variant='contained'
          type='submit'
          loading={loading}
        >
          Login
        </LoadingButton>
        <Typography
          variant='body1'
        >
          Don't have an account? {' '}
          <Typography
            color='primary'
            component='span'
            className='cursor-pointer'
            onClick={() => setMode('register')}>
            Register
          </Typography>
        </Typography>
      </>}
      {mode === 'register' && <>
        <LoadingButton
          variant='contained'
          type='submit'
          loading={loading}
        >
          Register
        </LoadingButton>
        <Typography
          variant='body1'
        >
          Already have an account? {' '}
          <Typography
            color='primary'
            component='span'
            className='cursor-pointer'
            onClick={() => setMode('login')}>
            Login
          </Typography>
        </Typography>
      </>}
    </Box>
  </div>);
};

export default Login;

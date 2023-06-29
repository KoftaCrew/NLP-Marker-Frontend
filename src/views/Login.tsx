import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../store/UserContext";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AppBarContext } from "../store/AppBarContext";
import axiosInstance, { setAuthorizationHeader } from "../services/AxiosService";
import { AxiosError } from "axios";


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

    setLoading(true);

    const username = (event.target as HTMLFormElement).username.value;
    const password = (event.target as HTMLFormElement).password.value;

    if (mode === 'register') {
      const firstName = (event.target as HTMLFormElement).firstName.value;
      const lastName = (event.target as HTMLFormElement).lastName.value;
      const email = (event.target as HTMLFormElement).email.value;

      /* eslint-disable camelcase */
      try {
        await axiosInstance.post('/auth/sign-up/', {
          username,
          password,
          confirm_password: password,
          first_name: firstName,
          last_name: lastName,
          email
        });

        setError('');
        setMode('login');

        setLoading(false);
        return;
      /* eslint-enable camelcase */
      } catch (error) {
        if (error instanceof AxiosError) {
          if (!error.response) {
            error.message && setError(error.message);
          } else {
            setError(error.response.data.detail ?? error.message);
          }
          setLoading(false);
        }
        return;
      }
    }

    try {
      const response = await axiosInstance.post('/auth/login/', {
        username,
        password
      });

      const { access, refresh } = response.data;

      const userResponse = await axiosInstance.get('/auth/profile/', {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });

      /* eslint-disable camelcase */
      const { first_name, last_name, email } = userResponse.data[0];

      setAuthorizationHeader(access);
      setUser({
        username,
        firstName: first_name,
        lastName: last_name,
        email,
        refreshToken: refresh
      });
      /* eslint-enable camelcase */

    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          error.message && setError(error.message);
        } else {
          setError(error.response.data.detail ?? error.message);
        }
      }
    }

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
          id='firstName'
          label='First Name'
          variant='outlined'
        />
        <TextField
          required
          id='lastName'
          label='Last Name'
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

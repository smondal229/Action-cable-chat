import { useState } from 'react';
import Login from './Login';
import useStyles from './styles';
import Signup from './Signup';
import { Box, LinearProgress } from '@material-ui/core';

const Auth = () => {
  const [newUser, setNewUser] = useState(false);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <LinearProgress />}
      <Box maxWidth={480} m="auto" p={2}>

      {newUser ?
        <Signup classes={classes} loading={loading} setLoading={setLoading} setLogin={() => setNewUser(false)} /> :
        <Login classes={classes} loading={loading} setLoading={setLoading} setSignup={() => setNewUser(true)} />
      }
      </Box>
    </>
  );
}

export default Auth;
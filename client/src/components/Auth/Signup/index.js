import { Box, Button, TextField, Typography, useMediaQuery } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PasswordField from "../../Common/PasswordField";
import CustomButton from '../../Common/CustomButton';
import { emailValidator, validatePassword } from "../../../helpers/customValidators";
import { signup } from "../../../actions/auth";

const Signup = ({ classes, loading, setLoading, setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const profileError = useSelector(state => state.profile.errors);
  const matchesQuery = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    let reqErrors = {};
    console.log('profile error', profileError);
    profileError.forEach(error => {
      reqErrors = error ? { ...reqErrors, [error?.source]: `${error?.source} ${error?.detail}` } : reqErrors;
    });
    setErrors(reqErrors);
  }, [profileError, setErrors]);

  const onSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if(!emailValidator(email)) {
      formErrors = { ...formErrors, email: 'Email is not valid'};
    }
    if (validatePassword(password) !== true) {
      console.log('validation', validatePassword(password));
      formErrors = { ...formErrors, password: validatePassword(password) };
    }

    ['firstname', 'lastname'].forEach(attr => {
      if (eval(attr)?.length === 0) {

        formErrors = { ...formErrors, [attr]: `${attr} is blank` };
      }
    });

    if (password !== passwordConfirmation) {
      formErrors = { ...formErrors, passwordConfirmation: 'Password confirmation doesn\'t match'}
    }

    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    dispatch(signup({ firstname, lastname, email, password, passwordConfirmation }))
  }
  console.log('errors', profileError);
  return (
    <>
      <Typography color="primary" variant="h4" align="center" gutterBottom>Sign Up</Typography>

      <form onSubmit={onSubmit}>
        <Box display="flex" justifyContent="space-between" flexDirection={matchesQuery ? 'row' : 'column'}>
          <TextField
            name="firstname"
            variant="outlined"
            value={firstname}
            onChange={({ target: { value }}) => {
              if(errors.firstname) setErrors({ ...errors, firstname: null }); setFirstname(value);
            }}
            label="First Name"
            className={classes.inputFields}
            error={errors.firstname}
            helperText={errors.firstname}
          />

          <TextField
            name="lastname"
            variant="outlined"
            value={lastname}
            onChange={({ target: { value }}) => {
              if(errors.lastname) setErrors({ ...errors, lastname: null }); setLastname(value);
            }}
            label="Last Name"
            className={classes.inputFields}
            error={errors.lastname}
            helperText={errors.lastname}
          />
        </Box>

        <TextField
          name="email"
          value={email}
          variant="outlined"
          type="email"
          onChange={({ target: { value }}) => {
            if(errors.email) setErrors({ ...errors, email: null }); setEmail(value)
          }}
          label="Email"
          fullWidth
          className={classes.inputFields}
          error={errors.email}
          helperText={errors.email}
        />

        <PasswordField
          name="password"
          label="Password"
          password={password}
          setPassword={({ target: { value }}) => {
            if(errors.password) setErrors({ ...errors, password: null }); setPassword(value);
          }}
          errors={errors}
          setErrors={setErrors}
          hintVisible
        />

        <PasswordField
          name="passwordConfirmation"
          label="Password Confirmation"
          password={passwordConfirmation}
          setPassword={({ target: { value }}) => {
            if(errors.passwordConfirmation) setErrors({ ...errors, passwordConfirmation: null });
            setPasswordConfirmation(value);
          }}
          errors={errors}
          setErrors={setErrors}
        />
        <CustomButton type="submit" loading={loading} wrapperStyle={{ margin: 'auto' }}>Sign Up</CustomButton>
      </form>

      <Box display="flex" justifyContent="center" mt={2} color="#666">
        Already an user ?
        <Box ml={1} style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={setLogin}>Login</Box>
      </Box>
    </>
  )
}

export default Signup;
import { Box, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import PasswordField from "../../Common/PasswordField";
import CustomButton from "../../Common/CustomButton";
import { emailValidator, validatePassword } from "../../../helpers/customValidators";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/auth";

export default function Login({ classes, loading, setLoading, setSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    let error = false;

    if(!emailValidator(email)) {
      error = true;
      setErrors({ ...errors, email: 'Email is not valid'})
    }

    if (validatePassword(password) !== true) {
      error = true;
      setErrors({ ...errors, password: validatePassword(password) })
    }

    if (error) return;

    setLoading(true);
    dispatch(login({ email, password })).then(() => setLoading(false));
  }
  console.log('values', errors);
  return (
    <>
      <Typography color="primary" variant="h4" align="center" gutterBottom>Login</Typography>

      <form onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          label="Email"
          value={email}
          type="email"
          onChange={({ target: { value }}) => {
            if(errors.email) setErrors({ ...errors, email: null });
            setEmail(value);
          }}
          error={errors.email}
          helperText={errors.email}
          className={classes.inputFields}
        />

        <PasswordField
          name="password"
          password={password}
          setPassword={({ target: { value }}) => {
            if(errors.password) setErrors({ ...errors, password: null });
            setPassword(value);
          }}
          setErrors={setErrors}
          error={errors.password}
        />

        <CustomButton loading={loading} type="submit" wrapperStyle={{ margin: 'auto' }}>Login</CustomButton>
      </form>

      <Box display="flex" mt={2} justifyContent="center" color="#666">
        New User ?
        <Box ml={1} style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={setSignup}>Sign up</Box>
      </Box>
    </>
  )
}
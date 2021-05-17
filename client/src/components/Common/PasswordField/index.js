import React, { useState } from 'react';
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  FormHelperText,
  Typography,
  InputLabel
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordField = ({
  errors,
  setErrors,
  setPassword,
  password,
  label = 'Password',
  hintVisible = false,
  ...props
}) => {
  const [passwordVisible, setVisible] = useState(false);
  const { name } = props;
  const isError = Boolean(errors && errors[name]);

  return (
    <FormControl style={{ marginTop: 10, marginBottom: 12, width: '100%' }}>
      <InputLabel htmlFor="standard-adornment-password" style={{ marginLeft: 15, marginTop: -3 }} error={isError}>
        {label}
      </InputLabel>
      <OutlinedInput
        id="standard-adornment-password"
        fullWidth
        error={isError}
        variant="outlined"
        type={passwordVisible ? 'text' : 'password'}
        value={password}
        onChange={setPassword}
        label={label}
        inputProps={{
          minLength: 6
        }}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={() => setVisible(!passwordVisible)}>
              {passwordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )}
        {...props}
      />
      <FormHelperText error={isError}>{errors && errors[name]}</FormHelperText>
      {hintVisible && (
        <Box color="#aaa">
          <Typography style={{ fontSize: 14 }}>Password should contain atleast 1 capital letter, 1 number, 1 symbol and min 6 characters</Typography>
        </Box>
      )}
    </FormControl>
  );
};

export default PasswordField;

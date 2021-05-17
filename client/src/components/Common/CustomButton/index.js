import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import classnames from 'classnames';

const CommonButton = ({ children, width, height, classProp, rounded = false, style, loading, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper} style={props.wrapperStyle || {}}>
      <Button
        color="primary"
        className={classnames(classes.button, classProp)}
        style={{ width, height, borderRadius: rounded ? 20 : 3, ...style }}
        disabled={loading}
        variant="contained"
        {...props}
      >
        {children}
      </Button>
      {loading && <CircularProgress size={26} color="primary" className={classes.buttonProgress} />}
    </div>
  )
}

export default CommonButton;

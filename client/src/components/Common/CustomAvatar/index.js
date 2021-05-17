import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

const CustomizedAvatar = ({ avatar, className, initials }) => {
  if (avatar) {
    return (
      <Avatar
        className={className}
        data-testid="header-avatar-test-id"
        src={avatar}
      />
    );
  }

  return (
    <Avatar
      className={className}
      data-testid="header-avatar-test-id"
    >
      {initials}
    </Avatar>
  );
};

CustomizedAvatar.defaultProps = { initials: 'B' };

CustomizedAvatar.propTypes = {
  className: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  initials: PropTypes.string
};

export default CustomizedAvatar;

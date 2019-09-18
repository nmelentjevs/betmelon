import React from 'react';

import Button from 'react-bootstrap/Button';

const PrettyButton = ({
  variant,
  style,
  onclick,
  iconClassName,
  text,
  className
}) => (
  <Button
    className={className}
    variant={variant}
    style={style}
    onClick={() => onclick()}
  >
    {iconClassName ? (
      <i
        style={{ fontSize: '14px', color: 'silver', cursonr: 'pointer' }}
        className={iconClassName}
      ></i>
    ) : (
      text
    )}
  </Button>
);

export default PrettyButton;

import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

const GlobalLoading = ({ fullscreen }) => (
  <div
    style={{
      width: '100%',
      height: fullscreen ? '80vh' : '',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    }}
  >
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" />
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" />
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" />
    <Spinner animation="grow" size="sm" />
  </div>
);

export default GlobalLoading;

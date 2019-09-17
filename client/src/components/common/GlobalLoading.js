import React from 'react';

// Bootstrap
import Spinner from 'react-bootstrap/Spinner';

const GlobalLoading = ({ fullscreen }) => (
  <div
    style={{
      width: '100%',
      height: fullscreen ? '90vh' : '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent'
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

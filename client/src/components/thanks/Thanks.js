import React, { useEffect } from 'react';

import axios from 'axios';

const Thanks = ({
  match: {
    params: { id }
  }
}) => {
  useEffect(() => {
    axios
      .get(`/api/email/confirm/${id}`)
      .then(res => console.log('email confirmed'))
      .catch(err => console.log(err));
  }, [id]);

  return <div>{id} Thanks</div>;
};

export default Thanks;

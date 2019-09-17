import React, { useEffect } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';

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

Thanks.propTypes = {
  id: PropTypes.string
};

export default Thanks;

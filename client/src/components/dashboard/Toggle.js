import React, { useState, useEffect } from 'react';

const Toggle = ({ id, handleChange, name, currentSetting }) => {
  const [checked, setChecked] = useState();

  useState(() => {
    setChecked(currentSetting);
  }, [currentSetting]);

  return (
    <>
      <input
        type="checkbox"
        id={`switch-${id}`}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          handleChange(name, !checked);
        }}
      />
      <label htmlFor={`switch-${id}`}>Toggle </label>
    </>
  );
};

export default Toggle;

import React from 'react';

const SliderPage = () => {
  return (
    <div className="my-5" style={{ color: 'white', width: '100%' }}>
      <label htmlFor="customRange1">Choose range</label>
      <input
        type="range"
        className="custom-range"
        id="customRange1"
        onInput={e => console.log(e.target.value)}
        onChange={e => console.log(e.target.value)}
      />
    </div>
  );
};

export default SliderPage;

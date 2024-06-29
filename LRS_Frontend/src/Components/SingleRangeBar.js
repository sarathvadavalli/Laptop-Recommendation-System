import React, { useState } from 'react';

function SingleRangeBar({ min, max, onRangeChange }) {
  const [value, setValue] = useState({ min: min, max: max });

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onRangeChange(newValue);
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <p>Selected Price Range: {value}</p>
    </div>
  );
}

export default SingleRangeBar;

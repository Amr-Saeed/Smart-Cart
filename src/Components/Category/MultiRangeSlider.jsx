import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
function MultiSlider({ minValue, maxValue, setMinValue, setMaxValue }) {
  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  return (
    <div className="App">
      <MultiRangeSlider
        min={0}
        max={1000}
        step={50}
        minValue={minValue}
        maxValue={maxValue}
        ruler={false}
        label={false}
        thumbLeftColor="white"
        barInnerColor="var(--main-color)"
        className="!bg-none !border-0 !shadow-none"
        onInput={handleInput}
      />
    </div>
  );
}

export default MultiSlider;

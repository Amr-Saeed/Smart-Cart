import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
function MultiSlider() {
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(1000);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
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
        onInput={(e) => {
          handleInput(e);
        }}
      />
    </div>
  );
}

export default MultiSlider;

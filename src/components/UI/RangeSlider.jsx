import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const RangeSlider = ({ max, currentValue, handleChange }) => {
  const rangeRef = useRef();

  useEffect(() => {
    if (rangeRef.current) {
      let perc = Math.floor((100 * currentValue) / max);
      rangeRef.current.style.background = `linear-gradient(to right, #fff ${perc}%, gray 0%)`;
    }
  }, [currentValue]);

  return (
    <input
      className="slider w-[100%]"
      ref={rangeRef}
      type="range"
      min={0}
      max={max || 0}
      value={currentValue || 0}
      width="100"
      onChange={handleChange}
    />
  );
};

RangeSlider.propTypes = {
  max: PropTypes.number,
  currentValue: PropTypes.number,
  handleChange: PropTypes.func,
};

export default RangeSlider;

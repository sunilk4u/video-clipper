import PropTypes from "prop-types";

const RangeSlider = ({ max, currentValue, handleChange }) => {
  return (
    <input
      className="slider w-[100%]"
      type="range"
      min="0"
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

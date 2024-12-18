import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Select = ({
  label,
  options = [],
  showSelected = true,
  defaultValue,
  handleSelected,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);

  const handleClick = () => setIsShow((prev) => !prev);

  const handleOptionCLick = (index) => {
    setSelected(options[index]);
    handleSelected(options[index]);
    setIsShow(false);
  };

  return (
    <div className="text-xs text-white">
      <div
        onClick={handleClick}
        className="select-button cursor-pointer flex items-center gap-2 border-2 border-secondary px-4 py-1 rounded-md"
      >
        {label}{" "}
        {showSelected && <span className="text-gray-400">{selected}</span>}{" "}
        <IoIosArrowDown />
      </div>
      {isShow && (
        <div className="options cursor-pointer py-1 border h-[7rem] overflow-y-scroll border-secondary mt-1 rounded-md shadow-md">
          {options.map((option, i) => (
            <p
              onClick={() => handleOptionCLick(i)}
              className="px-3 py-1 hover:bg-secondary"
              key={i}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.array,
  showSelected: PropTypes.bool,
  handleSelected: PropTypes.func,
};

export default Select;

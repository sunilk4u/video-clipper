import PropTypes from "prop-types";

const Button = ({ label = "", disabled = false, colorClasses = "" }) => {
  return (
    <button
      className={`text-white px-4 py-2 rounded-lg cursor-pointer ${colorClasses}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  colorClasses: PropTypes.string,
};

export default Button;

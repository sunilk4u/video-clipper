import PropTypes from "prop-types";

const Button = ({
  label = "",
  disabled = false,
  colorClasses = "",
  onClick,
}) => {
  return (
    <button
      className={`text-sm text-white px-4 py-2 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300 ${colorClasses}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  colorClasses: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;

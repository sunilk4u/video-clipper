import PropTypes from "prop-types";

export const Topbar = ({ isPreview, handle }) => {
  return (
    <div className="flex items-center">
      <h6 className="text-white font-semibold text-lg">Cropper</h6>
      <div className="m-auto">
        <div className="action-buttons flex bg-secondary p-1 rounded-md gap-1">
          <div
            className={`text-white cursor-pointer px-2 py-1 rounded-md ${
              isPreview && "bg-main"
            }`}
            onClick={() => handle(true)}
          >
            Preview Session
          </div>
          <div
            className={`text-white cursor-pointer px-2 py-1 rounded-md ${
              !isPreview && "bg-main"
            }`}
            onClick={() => handle(false)}
          >
            Generate Session
          </div>
        </div>
      </div>
    </div>
  );
};

Topbar.propTypes = {
  handle: PropTypes.func,
  isPreview: PropTypes.bool,
};

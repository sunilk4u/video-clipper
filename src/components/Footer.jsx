import PropTypes from "prop-types";
import Button from "./UI/Button";
import { useContext } from "react";
import { TimelineContext } from "../context/timelineContext";
import { downloadFile } from "../utils/download";

const Footer = ({ isCropperActive, handleCropper }) => {
  const { timelineData, setTimelineData } = useContext(TimelineContext);

  return (
    <div className="flex justify-between">
      <div className="video-actions flex gap-3">
        <Button
          colorClasses="bg-accent disabled:bg-accentDark"
          label="Start Cropper"
          disabled={isCropperActive}
          onClick={() => handleCropper(true)}
        />
        <Button
          colorClasses="bg-accent disabled:bg-accentDark"
          label="Remove Cropper"
          disabled={!isCropperActive}
          onClick={() => {
            handleCropper(false);
            setTimelineData([]);
          }}
        />
        <Button
          colorClasses="bg-accent disabled:bg-accentDark"
          label="Generate Preview"
          disabled={!isCropperActive}
          onClick={() => downloadFile(timelineData, "timeline.json")}
        />
      </div>
      <Button colorClasses="bg-secondary" label="Cancel" />
    </div>
  );
};

Footer.propTypes = {
  isCropperActive: PropTypes.bool,
  handleCropper: PropTypes.func,
  handleShowPreview: PropTypes.func,
};

export default Footer;

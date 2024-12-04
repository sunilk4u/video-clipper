import React from "react";
import { BsFillPlayBtnFill } from "react-icons/bs";

const Preview = () => {
  return (
    <div className="flex flex-col gap-y-[170px]">
      <p className="text-gray-400 text-center text-sm">Preview</p>
      <div className="text-center">
        <BsFillPlayBtnFill className="text-white text-2xl mx-auto" />
        <p className="text-white text-sm my-2">Preview not available</p>
        <p className="text-gray-400 text-xs">
          Please click on &quot;Start Cropper&quot; <br /> and then play video
        </p>
      </div>
    </div>
  );
};

export default React.memo(Preview);

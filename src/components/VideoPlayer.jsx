import CrickVideo from "../assets/crick.mp4";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";

export const VideoPlayer = () => {
  return (
    <div className="flex">
      <div className="video-section w-[50%]">
        <video
          width="95%"
          className="rounded-lg shadow-lg"
          src={CrickVideo}
        ></video>

        <div className="play-controls flex gap-2 mt-5">
          <FaPlay className="text-white text-xl" />
          <input
            className="w-[90%] "
            type="range"
            min="0"
            defaultValue="0"
            width="100"
          />
        </div>
      </div>
      <div className="preview-section w-[50%]">
        <Preview />
      </div>
    </div>
  );
};

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

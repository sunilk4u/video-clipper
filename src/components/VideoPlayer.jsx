import CrickVideo from "../assets/crick.mp4";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import Select from "./UI/Select";
import RangeSlider from "./UI/RangeSlider";

const PLAYBACK_SPEED_OPTIONS = ["0.5x", "1x", "1.5x", "2x"];
const ASPECT_RATIOS = ["9:18", "9:16", "4:3", "3:4", "1:1", "4:5"];

export const VideoPlayer = () => {
  return (
    <div className="flex">
      <div className="video-section w-[50%]">
        <video
          width="100%"
          className="rounded-lg shadow-lg"
          src={CrickVideo}
        ></video>

        <div className="play-controls flex items-center gap-2 mt-5 relative">
          <FaPlay className="text-white text-xl" />
          <RangeSlider />
        </div>
        <div className="flex justify-between my-3">
          <p className="flex items-center gap-2 text-xs">
            <span className="text-white">12:12:12</span>
            <span className="text-gray-400">&#124;</span>
            <span className="text-gray-500">12:12:12</span>
          </p>
          <div className="flex items-center gap-2 w-[20%]">
            <HiSpeakerWave className="text-white text-2xl" />
            <RangeSlider />
          </div>
        </div>
        <div className="flex gap-2">
          <Select label="Playback Speed" options={PLAYBACK_SPEED_OPTIONS} />
          <Select label="Cropper Aspect Ratio" options={ASPECT_RATIOS} />
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

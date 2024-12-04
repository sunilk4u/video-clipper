import CrickVideo from "../assets/crick.mp4";
import { FaPlay, FaPause } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import Select from "./UI/Select";
import RangeSlider from "./UI/RangeSlider";
import React, { useEffect, useRef, useState } from "react";
import { convertTime } from "../utils/convertTIme";
import Preview from "./Preview";

const PLAYBACK_SPEED_OPTIONS = ["0.5x", "1x", "1.5x", "2x"];
const ASPECT_RATIOS = ["9:18", "9:16", "4:3", "3:4", "1:1", "4:5"];

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationInSec, setDurationInSec] = useState(0);
  const [currentTimeInSec, setCurrentTimeInSec] = useState(0);
  const [durationInFormat, setDurationInFormat] = useState("00:00:00");
  const [currentTimeInFormat, setcurrentTimeInFormat] = useState("00:00:00");
  const [currentSoundValue, setCurrentSoundValue] = useState(10);

  useEffect(() => {
    const updateTime = () => {
      let currentTime = videoRef.current.currentTime;
      const { hh, mm, ss } = convertTime(currentTime);
      setCurrentTimeInSec(currentTime);
      setcurrentTimeInFormat(`${hh}:${mm}:${ss}`);
    };

    const video = videoRef.current;
    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const handleSliderChange = (event) => {
    setCurrentTimeInSec(Number(event.target.value));
  };

  const handleSliderChangeMouseUp = (event) => {
    videoRef.current.pause();
    setIsPlaying(false);
    videoRef.current.currentTime = event.target.value;
  };

  const handleVolume = (event) => {
    setCurrentSoundValue(Number(event.target.value));
  };

  const handleVolumeChangeMouseUp = (event) => {
    videoRef.current.volume = event.target.value / 10;
  };

  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLoadedVideoMetadata = () => {
    let duration = videoRef.current.duration;
    let { hh, mm, ss } = convertTime(duration);
    setDurationInSec(duration);
    setDurationInFormat(`${hh}:${mm}:${ss}`);
  };

  return (
    <div className="flex">
      <div className="video-section w-[50%]">
        <video
          width="100%"
          className="rounded-lg shadow-lg"
          ref={videoRef}
          src={CrickVideo}
          onLoadedMetadata={handleLoadedVideoMetadata}
        ></video>

        <div className="play-controls flex items-center gap-2 mt-5 relative">
          {isPlaying ? (
            <FaPause onClick={handlePlay} className="text-white text-xl" />
          ) : (
            <FaPlay onClick={handlePlay} className="text-white text-xl" />
          )}
          <RangeSlider
            max={durationInSec}
            currentValue={currentTimeInSec}
            handleChange={handleSliderChange}
            handleMouseUp={handleSliderChangeMouseUp}
          />
        </div>
        <div className="flex justify-between my-3">
          <p className="flex items-center gap-2 text-xs">
            <span className="text-white">{currentTimeInFormat}</span>
            <span className="text-gray-400">&#124;</span>
            <span className="text-gray-500">{durationInFormat}</span>
          </p>
          <div className="flex items-center gap-2 w-[20%]">
            <HiSpeakerWave className="text-white text-2xl" />
            <RangeSlider
              max={10}
              currentValue={currentSoundValue}
              handleChange={handleVolume}
              handleMouseUp={handleVolumeChangeMouseUp}
            />
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

export default React.memo(VideoPlayer);

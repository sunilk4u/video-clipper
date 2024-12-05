import CrickVideo from "../assets/crick.mp4";
import { FaPlay, FaPause } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import Select from "./UI/Select";
import RangeSlider from "./UI/RangeSlider";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { convertTime } from "../utils/convertTIme";
import Preview from "./Preview";

const PLAYBACK_SPEED_OPTIONS = ["0.5x", "1x", "1.5x", "2x"];
const ASPECT_RATIOS = ["9:18", "9:16", "4:3", "3:4", "1:1", "4:5"];

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const cropperRef = useRef(null);
  const startX = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationInSec, setDurationInSec] = useState(0);
  const [currentTimeInSec, setCurrentTimeInSec] = useState(0);
  const [currentSoundValue, setCurrentSoundValue] = useState(10);
  const [playBackSpeed, setPlayBackSpeed] = useState("1x");
  const [cropper, setCropper] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      let currentTime = videoRef.current.currentTime;
      setCurrentTimeInSec(currentTime);
    };

    const video = videoRef.current;
    video.addEventListener("timeupdate", updateTime);

    handleAspectRatio(ASPECT_RATIOS[0]);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const convertVideoTme = useCallback(
    (timeInSec) => convertTime(timeInSec),
    []
  );

  const handleDrag = (event) => {
    const { clientX } = event;
    const videoRect = videoRef.current.getBoundingClientRect();
    const cropperRect = cropperRef.current.getBoundingClientRect();
    const newPos = clientX - startX.current;
    setCropper((prev) => ({
      ...prev,
      left: Math.max(0, Math.min(newPos, videoRect.width - cropperRect.width)),
    }));
  };

  const startDrag = (e) => {
    e.preventDefault();

    const onMouseMove = (event) => handleDrag(event);
    const onMouseDown = (event) => {
      startX.current = event.clientX - cropper.left;
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousedown", onMouseDown);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousedown", onMouseDown);
  };

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

  const handlePlaybackSpeed = (option) => {
    setPlayBackSpeed(option);
    videoRef.current.playbackRate = Number(option.replace("x", ""));
  };

  const handleAspectRatio = (option) => {
    const ratio = Number(option.split(":")[0]) / Number(option.split(":")[1]);
    const videoRect = videoRef.current.getBoundingClientRect();
    const newWidth = Math.floor(ratio * videoRect.height);
    setCropper((prev) => ({
      ...prev,
      width: newWidth,
      left: Math.min(prev.left, videoRect.width - newWidth),
    }));
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
    setDurationInSec(duration);
  };

  return (
    <div className="flex">
      <div className="video-section w-[50%]">
        <div className="relative">
          {/* video layer */}
          <video
            width="100%"
            className="rounded-lg shadow-lg"
            ref={videoRef}
            src={CrickVideo}
            onLoadedMetadata={handleLoadedVideoMetadata}
          ></video>

          {/* cropper overlay */}
          <div
            className="cropper grid grid-rows-3 grid-cols-3"
            onMouseDown={startDrag}
            ref={cropperRef}
            style={{
              top: "0",
              bottom: "0",
              left: cropper.left,
              width: cropper.width,
              height: "100%",
            }}
          >
            {Array.from(new Array(9)).map((_, i) => (
              <span className="border border-white" key={i}></span>
            ))}
          </div>
        </div>

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
            <span className="text-white">
              {convertVideoTme(currentTimeInSec)}
            </span>
            <span className="text-gray-400">&#124;</span>
            <span className="text-gray-500">
              {convertVideoTme(durationInSec)}
            </span>
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
          <Select
            label="Playback Speed"
            defaultValue="1x"
            options={PLAYBACK_SPEED_OPTIONS}
            handleSelected={handlePlaybackSpeed}
          />
          <Select
            label="Cropper Aspect Ratio"
            defaultValue="9:18"
            options={ASPECT_RATIOS}
            handleSelected={handleAspectRatio}
          />
        </div>
      </div>
      <div className="preview-section w-[50%]">
        <Preview />
      </div>
    </div>
  );
};

export default React.memo(VideoPlayer);

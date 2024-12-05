import CrickVideo from "../assets/crick.mp4";
import { FaPlay, FaPause } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import Select from "./UI/Select";
import RangeSlider from "./UI/RangeSlider";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { convertTime } from "../utils/convertTIme";
import PropTypes from "prop-types";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { TimelineContext } from "../context/timelineContext";

const PLAYBACK_SPEED_OPTIONS = ["0.5x", "1x", "1.5x", "2x"];
const ASPECT_RATIOS = ["9:18", "9:16", "4:3", "3:4", "1:1", "4:5"];

const VideoPlayer = ({ isCropperActive }) => {
  const videoRef = useRef(null);
  const videoDimensions = useRef({
    width: 0,
    height: 0,
  });
  const cropperRef = useRef(null);
  const previewRef = useRef(null);
  const startX = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationInSec, setDurationInSec] = useState(0);
  const [currentTimeInSec, setCurrentTimeInSec] = useState(0);
  const [currentSoundValue, setCurrentSoundValue] = useState(10);
  const [playBackSpeed, setPlayBackSpeed] = useState("1x");
  const [cordinates, setCoordinates] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [cropper, setCropper] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const { setTimelineData } = useContext(TimelineContext);

  // add event listener to time update events of main video
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

  // set current coordinates when play is clicked (used to generate preview)
  useEffect(() => {
    if (!previewRef.current || !videoRef.current) return;

    if (isPlaying && isCropperActive) {
      let timeline = {
        timeStamp: currentTimeInSec,
        coordinates: [cropper.top, cropper.left, cropper.width, cropper.height],
        volume: currentSoundValue,
        playbackRate: Number(playBackSpeed.replace("x", "")),
      };
      setTimelineData((prev) => [...prev, timeline]);
      setCoordinates({
        top: cropper.top,
        left: cropper.left,
        width: cropper.width,
        height: cropper.height,
      });
      previewRef.current.currentTime = currentTimeInSec;
      previewRef.current.play();
    } else {
      previewRef.current.pause();
    }
  }, [isPlaying]);

  const convertVideoTme = useCallback(
    (timeInSec) => convertTime(timeInSec),
    []
  );

  // starts moving cropper when it is dragged and updates cropper dimesnions
  const handleDrag = (event) => {
    const { clientX } = event;
    const videoRect = videoRef.current.getBoundingClientRect();
    const cropperRect = cropperRef.current.getBoundingClientRect();
    const newPos = clientX - startX.current;
    pause();
    setCropper((prev) => ({
      ...prev,
      left: Math.max(0, Math.min(newPos, videoRect.width - cropperRect.width)),
      height: cropperRect.height,
      width: cropperRect.width,
    }));
  };

  // when user initiates dragging, event listenera are added to mouse movements
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

  // update slider value immediately
  const handleSliderChange = (event) => {
    setCurrentTimeInSec(Number(event.target.value));
  };

  // make changes in time of video when user removes mouse
  const handleSliderChangeMouseUp = (event) => {
    pause();
    videoRef.current.currentTime = event.target.value;
  };

  // update slider value immediately
  const handleVolume = (event) => {
    setCurrentSoundValue(Number(event.target.value));
  };

  // make changes in time of video when user removes mouse
  const handleVolumeChangeMouseUp = (event) => {
    videoRef.current.volume = event.target.value / 10;
  };

  // sets playback speed
  const handlePlaybackSpeed = (option) => {
    setPlayBackSpeed(option);
    videoRef.current.playbackRate = Number(option.replace("x", ""));
  };

  // sets aspect ratio and updates cropper dimesions
  const handleAspectRatio = (option) => {
    const ratio = Number(option.split(":")[0]) / Number(option.split(":")[1]);
    const videoRect = videoRef.current.getBoundingClientRect();
    const newWidth = Math.floor(ratio * videoRect.height);
    pause();

    setCropper((prev) => ({
      ...prev,
      width: newWidth,
      left: Math.min(prev.left, videoRect.width - newWidth),
      height: videoRect.height,
    }));
  };

  // playing main video
  const play = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  // pausing main video
  const pause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  // handle play pause button when clicked
  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  // do intial processes when video is loaded
  const handleLoadedVideoMetadata = () => {
    let duration = videoRef.current.duration;
    const videoRect = videoRef.current.getBoundingClientRect();
    videoDimensions.current.width = videoRect.width;
    videoDimensions.current.height = videoRect.height;
    setDurationInSec(duration);
  };

  return (
    <div className="flex gap-[5%]">
      <div className="video-section w-[45%]">
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
          {isCropperActive && (
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
                <span
                  className="border border-dashed border-white"
                  key={i}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* video controls */}
        <div className="play-controls flex items-center gap-2 mt-3 relative">
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

      {/* preview secion */}
      <div className="preview-section w-[50%]">
        <div className="flex flex-col gap-y-5">
          <p className="text-gray-400 text-center text-sm">Preview</p>
          {!isCropperActive && (
            <div className="text-center mt-[157px]">
              <BsFillPlayBtnFill className="text-white text-2xl mx-auto" />
              <p className="text-white text-sm my-2">Preview not available</p>
              <p className="text-gray-400 text-xs">
                Please click on &quot;Start Cropper&quot; <br /> and then play
                video
              </p>
            </div>
          )}
          {isCropperActive && (
            <div className="preview-main flex justify-center w-full">
              <div
                className="relative overflow-hidden mx-auto"
                style={{
                  height: cropper.height,
                  width: cropper.width,
                }}
              >
                <video
                  className="absolute"
                  ref={previewRef}
                  src={CrickVideo}
                  style={{
                    top: 0,
                    height: videoDimensions.current.height,
                    width: videoDimensions.current.width,
                    objectFit: "cover",
                    objectPosition: `${
                      (cordinates.left / 100) * videoDimensions.current.width
                    }% -0%`,
                  }}
                ></video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  isCropperActive: PropTypes.bool,
  showPreview: PropTypes.bool,
};

export default VideoPlayer;

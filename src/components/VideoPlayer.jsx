import CrickVideo from "../assets/crick.mp4";

export const VideoPlayer = () => {
  return (
    <div>
      <div className="video-section w-[50%]">
        <video
          width="95%"
          className="rounded-lg shadow-lg"
          src={CrickVideo}
        ></video>
      </div>
      <div className="preview-section"></div>
    </div>
  );
};

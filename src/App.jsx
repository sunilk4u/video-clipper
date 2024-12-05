import { useState } from "react";
import "./App.css";
import { Topbar } from "./components/Topbar";
import Footer from "./components/Footer";
import VideoPlayer from "./components/VideoPlayer";
import { TimelineContext } from "./context/timelineContext";

function App() {
  const [isPreview, setIsPreview] = useState(false);
  const [isCropperActive, setIsCropperActive] = useState(false);
  const [timelineData, setTimelineData] = useState([]);

  const handleCropper = (value) => {
    setIsCropperActive(value);
  };

  return (
    <TimelineContext.Provider value={{ timelineData, setTimelineData }}>
      <div className="flex items-center h-full">
        <div className="main flex flex-col justify-between bg-main rounded-lg">
          <div className="px-5 py-3">
            <div className="top-section">
              <Topbar isPreview={isPreview} handle={setIsPreview} />
            </div>
            <div className="middle-section mt-6">
              <VideoPlayer isCropperActive={isCropperActive} />
            </div>
          </div>
          <div className="bottom-section p-4 border-t-2 border-t-secondary">
            <Footer
              isCropperActive={isCropperActive}
              handleCropper={handleCropper}
            />
          </div>
        </div>
      </div>
    </TimelineContext.Provider>
  );
}

export default App;

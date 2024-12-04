import { useState } from "react";
import "./App.css";
import { Topbar } from "./components/Topbar";
import Footer from "./components/Footer";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="flex items-center h-full">
      <div className="main flex flex-col justify-between bg-main rounded-lg">
        <div className=" px-6 py-7">
          <div className="top-section">
            <Topbar isPreview={isPreview} handle={setIsPreview} />
          </div>
          <div className="middle-section my-8">
            <VideoPlayer />
          </div>
        </div>
        <div className="bottom-section p-6 border-t-2 border-t-secondary">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

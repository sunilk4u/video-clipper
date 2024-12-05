import { createContext } from "react";

export const TimelineContext = createContext({
  timelineData: [],
  setTimelineData: () => {},
});

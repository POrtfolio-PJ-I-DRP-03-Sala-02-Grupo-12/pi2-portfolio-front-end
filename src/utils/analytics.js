import ReactGA from "react-ga4";

export const trackEvent = (eventName, params = {}) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.event(eventName, params);
  }
};

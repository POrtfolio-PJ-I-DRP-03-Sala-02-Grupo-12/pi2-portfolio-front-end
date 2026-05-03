import ReactGA from "react-ga4";

const GA_ID = "G-2MGMKTVJY0";

export const initGA = () => {
  ReactGA.initialize(GA_ID);
};

// pageview
export const trackPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};

// wvent ga4 pettern
export const trackEvent = (eventName, params = {}) => {
  ReactGA.event(eventName, params);
};

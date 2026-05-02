import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["Vanhaus.html", "tweaks-panel.jsx"],
  },
  ...nextVitals,
];

export default config;

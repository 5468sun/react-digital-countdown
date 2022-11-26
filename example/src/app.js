import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import DigitalCoundown from "react-digital-countdown";
import DigitalCoundown from "../../src/index";

function startCallback() {
  console.log('countdown start');
}

function progressCallback(timeLeft) {
  console.log('countdown progress, time left:', timeLeft);
}

function finishCallback() {
  console.log('countdown finish');
}

const App = ()=> <DigitalCoundown serverNowTime="2022-11-22 00:40:00" dueTime="2022-11-22 00:40:30" interval={1000} startCallback={startCallback} progressCallBack={progressCallback} finishCallBack={finishCallback} />;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
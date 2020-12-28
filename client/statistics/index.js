import debounce from "debounce";

const DELAY = 3000;
const id = window.snClientId;

let numActions = 0;

function doNotTrack() {
  const { navigator, doNotTrack } = window;
  return navigator.doNotTrack || navigator.msDoNotTrack || doNotTrack;
}

function getData() {
  return {
    id,
    numActions,
  };
}

function send() {
  if (doNotTrack()) {
    return;
  }

  const http = new XMLHttpRequest();
  const url = "/stats";
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(getData()));
}

function beaconSend() {
  if (doNotTrack() || typeof navigator.sendBeacon !== "function") {
    return;
  }

  navigator.sendBeacon("/stats", JSON.stringify(getData()));
}

const postStats = debounce(send, DELAY);

export const addAction = () => {
  numActions++;
  postStats();
};

export const beaconStats = beaconSend;

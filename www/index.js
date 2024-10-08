import { Renderer } from "./renderer";

const settingsConfig = {
  initial: "shuffled",
  size: 512,
  sortTime: 10,
  algorithm: "bubble",
};

const canvas = byId("canvas");
const settingsWrapper = byId("settings");

const controls = [
  byId("play-pause"),
  byId("next-tick"),
  byId("reset"),
  byId("share"),
];

const stats = [
  byId("reads"),
  byId("writes"),
  byId("compares"),
  byId("swaps"),
  byId("operation"),
  byId("fps"),
];

const settings = Array.from([
  byId("initial"),
  byId("size"),
  byId("sort-time"),
  byId("algorithm"),
]);

const renderer = new Renderer({
  settingsConfig,
  settingsWrapper,
  settings,
  controls,
  stats,
  canvas,
});
window.renderer = renderer;

function byId(id) {
  return document.getElementById(id);
}

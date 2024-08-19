import { Sorting } from "wasm-array-sort";

export class Renderer {
  constructor({
    settingsConfig,
    settingsWrapper,
    settings,
    controls,
    stats,
    canvas,
  }) {
    this.readConfigFromHash(settingsConfig);
    this.frame = null;
    this.framesCount = 0;
    this.animationStartAt = null;

    this.initCanvas(canvas);
    this.initControls(controls);
    this.initArray();

    this.initSettingsProps(settingsWrapper, settings);
    this.initStats(stats);

    this.drawSettings();
    this.draw();
  }

  animate() {
    if (!this.sortArray.frame(Number(this.settingsConfig.sortTime))) {
      this.draw();
      this.stopAnimate();

      this.playPause.disabled = true;

      return;
    }

    this.draw();

    this.frame = window.requestAnimationFrame(() => {
      this.animate();
    });
  }

  stopAnimate() {
    window.cancelAnimationFrame(this.frame);
    this.frame = null;

    this.settingsWrapper.classList.remove("disabled");
    this.playPause.innerText = "play_arrow";
    this.reset.disabled = false;
  }

  draw() {
    this.drawArray();
    this.framesCount++;
    this.drawStats();
  }

  drawArray() {
    const lastOperation = this.sortArray.operation();
    const cursorIndex = lastOperation ? lastOperation.Read : null;

    this.ctx.clearRect(0, 0, this.canvasWidth + 10, this.canvasHeight + 10);

    this.sortArray.values().forEach((v, i) => {
      i === cursorIndex
        ? this.drawArrayElement(i, v, "white")
        : this.drawArrayElement(i, v);
    });
  }

  drawArrayElement(index, value, fill = null) {
    const height = this.hPerElement * value;
    const x = this.wPerElement * index;
    const y = this.canvasHeight - height;

    const hue = (value / this.sortArray.size()) * 270;
    this.ctx.fillStyle = fill ? fill : `hsl(${hue}, 80%, 50%)`;

    this.ctx.fillRect(x, y, this.wPerElement, height);
  }

  drawStats() {
    this.reads.innerText = this.sortArray.reads();
    this.writes.innerText = this.sortArray.writes();
    this.compares.innerText = this.sortArray.compares();
    this.swaps.innerText = this.sortArray.swaps();

    const fpsCount = this.animationStartAt
      ? (this.framesCount / (Date.now() - this.animationStartAt)) * 1000
      : 0;

    this.fps.innerText = fpsCount.toFixed(1);
  }

  drawSettings() {
    for (const [settingKey, settingValue] of Object.entries(
      this.settingsConfig,
    )) {
      const props = this.settingsProps[settingKey];
      for (const propValueKey in props) {
        const valueEl = props[propValueKey];

        propValueKey == settingValue
          ? valueEl.classList.remove("enabled")
          : valueEl.classList.add("enabled");
      }
    }
  }

  handleInitialClick(el) {
    if (this.handleSettingsClick(el, "initial")) {
      this.initArrayInitial();
      this.draw();

      this.playPause.disabled = false;
    }
  }

  handleSizeClick(el) {
    if (this.handleSettingsClick(el, "size")) {
      this.initArray();
      this.draw();

      this.playPause.disabled = false;
    }
  }

  handleSortTimeClick(el) {
    this.handleSettingsClick(el, "sortTime");
  }

  handleAlgorithmClick(el) {
    this.handleSettingsClick(el, "algorithm");
  }

  handleSettingsClick(el, key) {
    if (!el.classList.contains("enabled") || this.frame) {
      return false;
    }

    const value = el.dataset.value;
    this.settingsConfig = { ...this.settingsConfig, [key]: value };

    this.drawSettings();
    this.setConfigToHash();

    return true;
  }

  handlePlayPauseClick() {
    if (this.frame) {
      this.stopAnimate();
      return;
    }

    this.settingsWrapper.classList.add("disabled");
    this.playPause.innerText = "pause";
    this.reset.disabled = true;
    this.animationStartAt = Date.now();
    this.framesCount = 0;

    this.initAlgorithm();
    this.animate();
  }

  handleResetClick() {
    if (this.frame) {
      this.stopAnimate();
    }

    this.initArray();
    this.draw();

    this.playPause.disabled = false;
  }

  handleShareClick() {
    this.share.disabled = true;

    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        this.share.innerText = "download_done";
      })
      .catch((err) => {
        console.error("Failed to copy link to clipboard: ", err);
      })
      .finally(() => {
        setTimeout(() => {
          this.share.innerText = "ios_share";
          this.share.disabled = false;
        }, 1000);
      });
  }

  readConfigFromHash(settingsConfig) {
    const hash = window.location.hash.substring(1);
    if (hash) {
      try {
        const parsedConfig = JSON.parse(decodeURIComponent(hash));
        this.settingsConfig = { ...settingsConfig, ...parsedConfig };
      } catch (error) {
        console.error(
          "Invalid hash format, using default settingsConfig.",
          error,
        );
        this.settingsConfig = { ...settingsConfig };
        this.setConfigToHash();
      }
    } else {
      this.settingsConfig = { ...settingsConfig };
      this.setConfigToHash();
    }
  }

  setConfigToHash() {
    const serializedConfig = encodeURIComponent(
      JSON.stringify(this.settingsConfig),
    );
    window.location.hash = serializedConfig;
  }

  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // const rect = canvas.getBoundingClientRect();
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  initControls(controls) {
    const [playPause, reset, share] = controls;

    this.playPause = playPause;
    this.reset = reset;
    this.share = share;
  }

  initSettingsProps(settingsWrapper, settings) {
    this.settingsWrapper = settingsWrapper;

    const settingsProps = {};
    for (const settingsEl of settings) {
      const elProps = {};
      const props = Array.from(settingsEl.querySelectorAll("p"));

      for (const p of props) {
        elProps[p.dataset.value] = p;
      }

      const key = settingsEl.dataset.key ?? settingsEl.id;
      settingsProps[key] = elProps;
    }

    this.settingsProps = settingsProps;
  }

  initStats(stats) {
    const [reads, writes, compares, swaps, fps] = stats;

    this.reads = reads;
    this.writes = writes;
    this.compares = compares;
    this.swaps = swaps;
    this.fps = fps;
  }

  initArray() {
    this.sortArray = Sorting.new(Number(this.settingsConfig.size));
    this.initArrayInitial();

    this.wPerElement = this.canvasWidth / this.sortArray.size();
    this.hPerElement = this.canvasHeight / this.sortArray.size();
  }

  initArrayInitial() {
    switch (this.settingsConfig.initial) {
      case "shuffled":
        this.sortArray.shuffle();
        break;
      case "reversed":
        this.sortArray.reverse();
        break;
    }

    this.sortArray.flush();
    this.sortArray.resetStats();
  }

  initAlgorithm() {
    switch (this.settingsConfig.algorithm) {
      case "bubble":
        this.sortArray.bubble();
        break;
      case "selection":
        this.sortArray.selection();
        break;
      case "cocktail":
        this.sortArray.cocktail();
        break;
      case "insertion":
        this.sortArray.insertion();
        break;
      case "gnome":
        this.sortArray.gnome();
        break;
      case "cycle":
        this.sortArray.cycle();
        break;
      case "heap":
        this.sortArray.heap();
        break;
      case "shell":
        this.sortArray.shell();
        break;
      case "oddEven":
        this.sortArray.oddEven();
        break;
      case "quickSort":
        this.sortArray.quickSort();
        break;
    }
  }
}

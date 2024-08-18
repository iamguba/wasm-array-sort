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
    this.settingsConfig = { ...settingsConfig };
    this.frame = null;

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

  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;
  }

  initControls(controls) {
    const [playPause, reset] = controls;

    this.playPause = playPause;
    this.reset = reset;
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
    const [reads, writes, compares, swaps] = stats;

    this.reads = reads;
    this.writes = writes;
    this.compares = compares;
    this.swaps = swaps;
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
      case "oddEven":
        this.sortArray.oddEven();
        break;
      case "quickSort":
        this.sortArray.quickSort();
        break;
    }
  }
}

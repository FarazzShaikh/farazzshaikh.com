export const fps = {
  sampleSize: 120,
  value: 0,
  _sample_: [],
  _index_: 0,
  _lastTick_: false,
  tick: function () {
    // if is first tick, just set tick timestamp and return
    if (!this._lastTick_) {
      this._lastTick_ = performance.now();
      return 0;
    }
    // calculate necessary values to obtain current tick FPS
    let now = performance.now();
    let delta = (now - this._lastTick_) / 1000;
    let fps = 1 / delta;
    // add to fps samples, current tick fps value
    this._sample_[this._index_] = Math.round(fps);

    // iterate samples to obtain the average
    let average = 0;
    for (let i = 0; i < this._sample_.length; i++) average += this._sample_[i];

    average = Math.round(average / this._sample_.length);

    // set new FPS
    this.value = average;
    // store current timestamp
    this._lastTick_ = now;
    // increase sample index counter, and reset it
    // to 0 if exceded maximum sampleSize limit
    this._index_++;
    if (this._index_ === this.sampleSize) this._index_ = 0;
    return this.value;
  },
};

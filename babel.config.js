module.exports = function (api) {
  api.cache.forever();
  return {
    presets: ["next/babel"],
  };
};

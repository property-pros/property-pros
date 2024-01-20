module.exports = function (api) {
  // api.cache(false);
  if (api.env("test")) {
    return {
      presets: [
        "babel-preset-expo",
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
      ],
      // plugins: ["@babel/plugin-proposal-export-namespace-from"],
    };
  } else {
    return {
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            targets: {
              esmodules: true,
            },
          },
        ],
        "babel-preset-expo",
        "@babel/preset-typescript",
      ],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true,
          },
        ],
      ],
    };
  }
};

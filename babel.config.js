module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@app": "./src/app",
            "@core": "./src/core",
            "@features": "./src/features",
            "@components": "./src/components",
            "@shared": "./src/shared"
          }
        }
      ]
    ]
  };
};

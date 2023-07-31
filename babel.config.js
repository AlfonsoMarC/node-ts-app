module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
          "@routes": "./src"
        }
      }
    ]
  ],
  ignore: ["**/*.spec.ts"]
};

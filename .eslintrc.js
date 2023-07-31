module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.json"]
  },
  ignorePatterns: [".eslintrc.js", "babel.config.js", "build"],
  env: {
    node: true,
    es6: true
  },
  plugins: ["prettier", "@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  rules: {
    "prettier/prettier": "error",
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }]
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".js", ".jsx", ".tsx", ".json"]
      }
    }
  }
};

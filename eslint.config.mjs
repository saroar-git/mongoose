import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: { process: true, console: true } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-expressions": "error",
      "no-unused-vars": "error",
      "prefer-const": "error",
      "no-console": 1,
      "no-undef": 2,
    },
  },
  {
    ignores: ["dist/", "node_modules/", "config"],
  },
];

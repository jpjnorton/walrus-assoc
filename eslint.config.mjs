import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/build/**", "**/coverage/**", "**/docs/**", "src/scripts/create_price.js"]
  },
  {
    files: ["**/*.ts"],
    rules: {
      "no-unused-vars": "error",
      "semi": ["error", "always"]
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off"
    }
  },
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    files: ["next.config.js", "postcss.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      }
    }
  }


]);


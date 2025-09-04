import nextPlugin from "@next/eslint-plugin-next";
import storybookPlugin from "eslint-plugin-storybook";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.stories.{js,jsx,ts,tsx}", ".storybook/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },
];

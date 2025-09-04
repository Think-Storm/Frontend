import nextPlugin from "@next/eslint-plugin-next";
import storybookPlugin from "eslint-plugin-storybook";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    files: ["**/*.stories.{js,jsx,ts,tsx}", ".storybook/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {},
  },
];

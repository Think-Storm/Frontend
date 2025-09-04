import nextPlugin from "@next/eslint-plugin-next";
import storybookPlugin from "eslint-plugin-storybook";

export default [
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },
  {
    rules: {},
  },
];

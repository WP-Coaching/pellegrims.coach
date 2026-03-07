import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/next-env.d.ts",
      "**/test-results/**",
      "**/playwright-report/**",
      "**/.vercel/**",
      // "**/.agent/**",
      "**/.agents/**",
      // "**/.gemini/**",
      "**/public/**",
      "**/*.log",
      "**/.DS_Store",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;

import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { plugin as shadcn } from "@shadcn/lint";

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
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { shadcn },
    settings: {
      shadcn: {
        ui: "@/components/ui",
      },
    },
    rules: {
      "shadcn/no-restyle": [
        "warn",
        {
          allow: ["layout"],
          contracts: [
            { pattern: "^(Heading|Text)$", allow: ["layout"] },
            { pattern: "^Stack$", allow: ["layout", "spacing"] },
            { pattern: "^Container$", allow: ["layout", "text-center"] },
            { pattern: "^Button$", allow: ["layout"] },
            { pattern: "^Card$", allow: ["layout"] },
            {
              pattern: "^Grid$",
              allow: ["layout", "spacing", "text-center", "md:text-left"],
            },
          ],
        },
      ],
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-inline-styles": "error",
      "shadcn/no-unknown-classes": [
        "error",
        { allow: ["g-recaptcha", "payload-image-object-position"] },
      ],
      "shadcn/require-static-classes": "error",
    },
  },
  {
    files: ["src/components/ui/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/require-static-classes": "off",
    },
  },
  {
    files: ["src/migrations/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
